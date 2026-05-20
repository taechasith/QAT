-- Quantum Art Thailand Association Web App Schema
-- Review this file, then paste it into the Supabase SQL Editor.
-- Admin allowlist is seeded with: tae.creativelab@gmail.com

create extension if not exists pgcrypto;

-- ---------- Helpers ----------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.admin_emails (
  email text primary key check (position('@' in email) > 1),
  created_at timestamptz not null default now()
);

insert into public.admin_emails (email)
values
  ('tae.creativelab@gmail.com')
on conflict (email) do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_emails ae
    where lower(ae.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- ---------- Profiles ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  wants_update_email boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;

drop policy if exists "Profiles can be read by owner or admin" on public.profiles;
create policy "Profiles can be read by owner or admin"
on public.profiles for select
to authenticated
using (auth.uid() = id or public.is_admin());

drop policy if exists "Profiles can be inserted by owner" on public.profiles;
create policy "Profiles can be inserted by owner"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "Profiles can be updated by owner or admin" on public.profiles;
create policy "Profiles can be updated by owner or admin"
on public.profiles for update
to authenticated
using (auth.uid() = id or public.is_admin())
with check (auth.uid() = id or public.is_admin());

-- ---------- Content ----------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'content_type') then
    create type public.content_type as enum (
      'event',
      'project',
      'game',
      'course',
      'exhibition',
      'research_article',
      'news'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'content_status') then
    create type public.content_status as enum ('draft', 'published', 'archived');
  end if;
end $$;

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  content_type public.content_type not null,
  status public.content_status not null default 'draft',
  slug text not null unique,
  title text not null,
  excerpt text,
  body_md text,
  cover_image_url text,
  external_url text,
  location text,
  start_at timestamptz,
  end_at timestamptz,
  published_at timestamptz,
  sort_order integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create index if not exists content_items_type_status_idx
on public.content_items (content_type, status, published_at desc);

create index if not exists content_items_slug_idx
on public.content_items (slug);

drop trigger if exists content_items_set_updated_at on public.content_items;
create trigger content_items_set_updated_at
before update on public.content_items
for each row execute function public.set_updated_at();

alter table public.content_items enable row level security;

drop policy if exists "Published content is public" on public.content_items;
create policy "Published content is public"
on public.content_items for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Admins can read all content" on public.content_items;
create policy "Admins can read all content"
on public.content_items for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can insert content" on public.content_items;
create policy "Admins can insert content"
on public.content_items for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update content" on public.content_items;
create policy "Admins can update content"
on public.content_items for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete content" on public.content_items;
create policy "Admins can delete content"
on public.content_items for delete
to authenticated
using (public.is_admin());

-- ---------- Site settings ----------
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings"
on public.site_settings for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- ---------- Notifications ----------
create table if not exists public.update_notifications (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid references public.content_items(id) on delete set null,
  subject text not null,
  preview text,
  sent_by uuid references auth.users(id) on delete set null,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.update_notifications enable row level security;

drop policy if exists "Admins can manage notifications" on public.update_notifications;
create policy "Admins can manage notifications"
on public.update_notifications for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create table if not exists public.email_delivery_logs (
  id uuid primary key default gen_random_uuid(),
  notification_id uuid references public.update_notifications(id) on delete cascade,
  recipient_email text not null,
  provider_message_id text,
  status text not null default 'queued',
  error_message text,
  created_at timestamptz not null default now()
);

alter table public.email_delivery_logs enable row level security;

drop policy if exists "Admins can read email logs" on public.email_delivery_logs;
create policy "Admins can read email logs"
on public.email_delivery_logs for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can insert email logs" on public.email_delivery_logs;
create policy "Admins can insert email logs"
on public.email_delivery_logs for insert
to authenticated
with check (public.is_admin());

-- ---------- Optional AI logs ----------
create table if not exists public.ai_generation_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  feature text not null,
  input_summary text,
  output_summary text,
  created_at timestamptz not null default now()
);

alter table public.ai_generation_logs enable row level security;

drop policy if exists "Admins can manage AI logs" on public.ai_generation_logs;
create policy "Admins can manage AI logs"
on public.ai_generation_logs for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- ---------- Storage bucket ----------
insert into storage.buckets (id, name, public)
values ('qat-media', 'qat-media', true)
on conflict (id) do nothing;

drop policy if exists "Public can view QAT media" on storage.objects;
create policy "Public can view QAT media"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'qat-media');

drop policy if exists "Admins can upload QAT media" on storage.objects;
create policy "Admins can upload QAT media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'qat-media' and public.is_admin());

drop policy if exists "Admins can update QAT media" on storage.objects;
create policy "Admins can update QAT media"
on storage.objects for update
to authenticated
using (bucket_id = 'qat-media' and public.is_admin())
with check (bucket_id = 'qat-media' and public.is_admin());

drop policy if exists "Admins can delete QAT media" on storage.objects;
create policy "Admins can delete QAT media"
on storage.objects for delete
to authenticated
using (bucket_id = 'qat-media' and public.is_admin());
