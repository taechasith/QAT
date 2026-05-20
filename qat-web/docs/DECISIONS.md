# Decisions

## Phase 1

- Use `qat-web` as the app directory inside the existing `C:\Users\HP OMEN\QAT` project root.
- Use the latest generated Next.js stack from `create-next-app`, which currently produced Next.js 16, React 19, Tailwind CSS 4, and ESLint 9.
- Use shadcn/ui with the Radix component base.
- Keep real service values in `.env.local`; keep `.env.example` as placeholder-only documentation.
- Defer Vercel project naming because the project has not been created yet.

## Phase 2

- Copy local assets into `public/` and `content/` so production code does not reference Windows-only source paths.
- Use a dark quantum visual system as the default theme foundation.
- Use `next/font/google` for IBM Plex Sans Thai, Manrope, and JetBrains Mono as required by the SRD.
- Keep the first visible surface as a branded shell, leaving the full scrollytelling and 3D experience for later phases.

## Phase 3

- Map SRD `lib/...` paths to `src/lib/...` because the app was bootstrapped with Next's `--src-dir`.
- Use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for public Supabase clients.
- Keep `SUPABASE_SERVICE_ROLE_KEY` as an environment placeholder only; no app code imports or uses it yet.
- Seed `tae.creativelab@gmail.com` as the first admin email in SQL.
- Keep `src/middleware.ts` for SRD alignment, despite Next 16 warning that the convention is moving toward `proxy`.

## Phase 4

- Public content queries always include `status = published`; draft content is never selected for public pages.
- Supabase query errors return empty states instead of crashing public pages while the schema is not applied.
- Route-group pages live under `src/app/(public)/...` so URLs remain clean.
- Atlas remains an external-only destination in navigation and homepage CTAs.
