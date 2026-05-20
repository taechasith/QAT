# Known Issues

## Active

- `middleware.ts` deprecated in Next.js 16 (should be `proxy.ts`). Build still works; rename deferred to avoid breaking session refresh during active development.
- Supabase SQL must be pasted into the Supabase SQL Editor before auth or CMS features work on a new project.
- `SUPABASE_SERVICE_ROLE_KEY` is empty in `.env.local`; service role is not used in current implementation (all queries use publishable key + RLS).
- `EMAIL_FROM` is empty; email notifications will return an unconfigured error until set.
- 3D GLB file (146 MB) loads from `/public/models/` — first load may be slow on slow connections. GLB is not CDN-optimized yet.
- WebGL may fail on older browsers or power-saving mode; `ReducedMotionFallback` shows a static placeholder in those cases.
- Body markdown is rendered as plain preformatted text, not processed HTML. A markdown renderer (e.g., `marked` or `remark`) is needed for rich content detail pages.
- Admin content list uses Supabase untyped `any[]` — Supabase TypeScript codegen would improve this in a future phase.
- `@hookform/resolvers` v5.2.2 type-checks Zod v4.0.x only; 4.4.x requires an `as any` cast on `zodResolver(schema)`. Runtime behavior is correct.
- Atlas destination is external and not managed by this CMS.

## Fixed / Closed

- Zod v4 `.errors` → `.issues` on `ZodError` — fixed in API routes.
- Next.js 16 `params` must be `await`-ed in dynamic page components — implemented correctly.
