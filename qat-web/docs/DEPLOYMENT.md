# Deployment

Target: Vercel. Database: Supabase.

## Local dev

```powershell
cd "C:\Users\HP OMEN\QAT\qat-web"
pnpm dev
# http://localhost:3000
```

## Pre-deploy checklist

- [ ] `pnpm build` passes locally.
- [ ] Supabase SQL schema pasted into Supabase SQL Editor and executed.
- [ ] Admin emails inserted into `admin_emails` table.
- [ ] Supabase Auth → Email → Redirect URLs includes the production URL + `/auth/callback`.
- [ ] Resend account created and sender domain verified (for email notifications).

## Deploy to Vercel

Run these commands in the `qat-web` directory. Each `vercel env add` will prompt for the value.

```powershell
vercel login
vercel link
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY production
vercel env add ADMIN_EMAILS production
vercel env add RESEND_API_KEY production
vercel env add EMAIL_FROM production
vercel env add NEXT_PUBLIC_SITE_URL production
vercel deploy --prod
```

After deploy, set `NEXT_PUBLIC_SITE_URL` to the actual Vercel URL (e.g. `https://qat.vercel.app`).

## Environment variables reference

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes | Supabase anon/publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Not used in current implementation |
| `ADMIN_EMAILS` | Yes | Comma-separated admin emails |
| `RESEND_API_KEY` | Optional | Email notification provider |
| `EMAIL_FROM` | Optional | Verified sender (`Name <email>`) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Production URL |

## Post-deploy

1. Visit the production URL and confirm landing page loads.
2. Try login with an admin email.
3. Verify `/admin` is accessible and `/admin/content` loads.
4. Check that 3D model loads (may take a moment on first load — 146 MB GLB).
5. Verify Atlas external link goes to `https://qatatlas.creativelabth.com`.
