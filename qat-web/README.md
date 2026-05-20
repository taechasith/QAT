# Quantum Art Thailand Association — Web App

A public platform for quantum science communication through art, interaction, storytelling, and future culture. Built as a CreativeLabTH Group international initiative.

---

## Local setup

```powershell
cd "C:\Users\HP OMEN\QAT\qat-web"
pnpm install
Copy-Item .env.example .env.local
# Fill in .env.local (see Environment variables below)
pnpm dev
```

Open http://localhost:3000.

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes | Supabase publishable (anon) key |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Service role key (server-only, not currently used) |
| `ADMIN_EMAILS` | Yes | Comma-separated admin emails |
| `RESEND_API_KEY` | Optional | Resend API key for email notifications |
| `EMAIL_FROM` | Optional | Verified sender email (e.g. `QAT <updates@yourdomain.com>`) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Site URL (`http://localhost:3000` for local) |

---

## Supabase setup

1. Create a Supabase project at supabase.com.
2. Open the SQL Editor in Supabase.
3. Paste the contents of `supabase/schema.sql` and run it.
4. Replace the placeholder admin emails in the SQL before running.
5. Copy the project URL and publishable key into `.env.local`.
6. Set Auth → Email → Redirect URLs to include `http://localhost:3000/auth/callback` (local) and your production URL.

---

## Admin setup

Admin access is controlled by two mechanisms:
1. The `ADMIN_EMAILS` environment variable (checked at runtime).
2. The `admin_emails` table in Supabase (checked by RLS policies).

To add an admin after deploy, run in Supabase SQL Editor:
```sql
insert into public.admin_emails (email) values ('admin@example.com');
```

---

## Running dev server

```powershell
pnpm dev
```

---

## Deployment to Vercel

```powershell
vercel login
vercel link
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
vercel env add ADMIN_EMAILS
vercel env add RESEND_API_KEY
vercel env add EMAIL_FROM
vercel env add NEXT_PUBLIC_SITE_URL
vercel deploy --prod
```

After deploy:
- Update `NEXT_PUBLIC_SITE_URL` to your production URL.
- Add the production callback URL to Supabase Auth redirect URLs.
- Verify your email sender domain in Resend if using email notifications.

---

## CMS usage

See `docs/ADMIN_GUIDE.md` for a full walkthrough.

Short version: Login with your admin email → magic link → click Admin in header → create/edit/publish content.

---

## Updating docs

When Tae says **`act as SRD`**, Claude Code will:
1. Inspect the current project state.
2. Update `docs/SRD.md`, `docs/PROJECT_STATUS.md`, `docs/CHANGELOG.md`, `docs/DECISIONS.md`, `docs/KNOWN_ISSUES.md`, and `docs/ADMIN_GUIDE.md`.
3. Show the diff.
4. Stop for review.

---

## Tech stack

- Next.js 16 App Router, TypeScript, Tailwind CSS, shadcn/ui
- Supabase Auth, Postgres, Row Level Security, Storage
- React Three Fiber, Three.js, Drei (3D scene)
- Motion for React (animations)
- React Hook Form, Zod (forms and validation)
- Resend (transactional email)
- Vercel (deployment)
