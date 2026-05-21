-- Run in Supabase SQL Editor

-- 1. View counter column on content_items
alter table public.content_items
  add column if not exists view_count integer not null default 0;

-- 2. Likes
create table if not exists public.content_likes (
  id          uuid primary key default gen_random_uuid(),
  content_id  uuid not null references public.content_items(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (content_id, user_id)
);

alter table public.content_likes enable row level security;

drop policy if exists "likes_read_all"       on public.content_likes;
drop policy if exists "likes_insert_own"     on public.content_likes;
drop policy if exists "likes_delete_own"     on public.content_likes;

create policy "likes_read_all"   on public.content_likes for select using (true);
create policy "likes_insert_own" on public.content_likes for insert with check (auth.uid() = user_id);
create policy "likes_delete_own" on public.content_likes for delete using (auth.uid() = user_id);

-- 3. Comments
create table if not exists public.content_comments (
  id                uuid primary key default gen_random_uuid(),
  content_id        uuid not null references public.content_items(id) on delete cascade,
  user_id           uuid not null references auth.users(id) on delete cascade,
  user_display_name text,
  body              text not null check (char_length(body) between 1 and 1000),
  created_at        timestamptz not null default now()
);

alter table public.content_comments enable row level security;

drop policy if exists "comments_read_all"    on public.content_comments;
drop policy if exists "comments_insert_own"  on public.content_comments;
drop policy if exists "comments_delete_own"  on public.content_comments;

create policy "comments_read_all"   on public.content_comments for select using (true);
create policy "comments_insert_own" on public.content_comments for insert with check (auth.uid() = user_id);
create policy "comments_delete_own" on public.content_comments for delete using (auth.uid() = user_id);

-- 4. Atomic view increment function (avoids race conditions)
create or replace function public.increment_view_count(content_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update content_items set view_count = view_count + 1 where id = content_id;
$$;
