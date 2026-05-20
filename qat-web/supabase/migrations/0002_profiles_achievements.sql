-- Add avatar_type to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS avatar_type text DEFAULT 'artist_cat'
    CHECK (avatar_type IN ('artist_cat', 'technologist_cat', 'scientist_cat', 'upload'));

-- Auto-create profile row when a new auth user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- User achievements (manual tick — links to content_items)
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  item_id    uuid NOT NULL REFERENCES public.content_items(id) ON DELETE CASCADE,
  item_type  text NOT NULL CHECK (item_type IN ('game', 'course')),
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, item_id)
);

ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users read own achievements"
  ON public.user_achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "users insert own achievements"
  ON public.user_achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users delete own achievements"
  ON public.user_achievements FOR DELETE
  USING (auth.uid() = user_id);
