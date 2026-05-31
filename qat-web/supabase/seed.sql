insert into public.admin_emails (email)
values ('tae.creativelab@gmail.com')
on conflict (email) do nothing;

insert into public.admin_emails (email)
values ('nathakarn88ka@gmail.com')
on conflict (email) do nothing;

insert into public.site_settings (key, value)
values
  (
    'homepage',
    '{
      "upcomingTitle": "Upcoming events and projects",
      "emptyState": "New QAT programs will appear here after the CMS is connected."
    }'::jsonb
  )
on conflict (key) do update
set value = excluded.value,
    updated_at = now();
