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

-- Visual block content for content_items
ALTER TABLE public.content_items
  ADD COLUMN IF NOT EXISTS body_blocks jsonb DEFAULT '[]'::jsonb;

-- View counter column on content_items
ALTER TABLE public.content_items
  ADD COLUMN IF NOT EXISTS view_count integer NOT NULL DEFAULT 0;

-- Likes
CREATE TABLE IF NOT EXISTS public.content_likes (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id  uuid NOT NULL REFERENCES public.content_items(id) ON DELETE CASCADE,
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (content_id, user_id)
);

ALTER TABLE public.content_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "likes_read_all"       ON public.content_likes;
DROP POLICY IF EXISTS "likes_insert_own"     ON public.content_likes;
DROP POLICY IF EXISTS "likes_delete_own"     ON public.content_likes;

CREATE POLICY "likes_read_all"   ON public.content_likes FOR SELECT USING (true);
CREATE POLICY "likes_insert_own" ON public.content_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "likes_delete_own" ON public.content_likes FOR DELETE USING (auth.uid() = user_id);

-- Comments
CREATE TABLE IF NOT EXISTS public.content_comments (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id        uuid NOT NULL REFERENCES public.content_items(id) ON DELETE CASCADE,
  user_id           uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_display_name text,
  body              text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 1000),
  created_at        timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.content_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "comments_read_all"    ON public.content_comments;
DROP POLICY IF EXISTS "comments_insert_own"  ON public.content_comments;
DROP POLICY IF EXISTS "comments_delete_own"  ON public.content_comments;

CREATE POLICY "comments_read_all"   ON public.content_comments FOR SELECT USING (true);
CREATE POLICY "comments_insert_own" ON public.content_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "comments_delete_own" ON public.content_comments FOR DELETE USING (auth.uid() = user_id);

-- Atomic view increment function (avoids race conditions)
CREATE OR REPLACE FUNCTION public.increment_view_count(content_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE content_items SET view_count = view_count + 1 WHERE id = content_id;
$$;
