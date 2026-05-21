# Changelog

## 2026-05-20 — Phases 5–14

### Phase 5: Landing Page Narrative
- Added `components/landing/QuantumLanding.tsx`, `MissionSection.tsx`, `FinalPortal.tsx`, `PortalCard.tsx`, `UpcomingHighlights.tsx`.
- Updated `app/page.tsx` to delegate to `QuantumLanding`.

### Phase 6: 3D Quantum Computer Scroll Experience
- Added `hooks/useReducedMotion.ts`, `hooks/useScrollProgress.ts`.
- Added `components/three/QuantumHeroScene.tsx`, `ScrollCameraRig.tsx`, `QuantumComputerModel.tsx`, `QuantumRealmParticles.tsx`, `ReducedMotionFallback.tsx`.
- `QuantumLanding.tsx` uses dynamic R3F import with `ssr: false`.

### Phase 7: Authentication
- Added `lib/data/profile.ts`, `app/(auth)/login/page.tsx`, `app/(auth)/auth/callback/route.ts`.
- Added `components/auth/AuthButton.tsx`, `LogoutButton.tsx`, `NotificationPreferences.tsx`.
- Added `app/account/page.tsx`, `app/api/account/notification-preference/route.ts`.
- Updated `SiteHeader.tsx` to show auth state.

### Phase 8: Admin Gate
- Added `components/admin/AdminGuard.tsx`, `AdminShell.tsx`, `AdminNav.tsx`.
- Added `app/admin/page.tsx`, `app/admin-unauthorized/page.tsx`.

### Phase 9: CMS Content Editor
- Added `lib/validation/content.ts`, `lib/data/admin-content.ts`.
- Added `components/admin/ContentEditorForm.tsx`, `ContentTable.tsx`, `ContentPreview.tsx`, `CategoryGuide.tsx`.
- Added `app/admin/content/page.tsx`, `new/page.tsx`, `[id]/edit/page.tsx`.
- Added `app/api/admin/content/route.ts`, `[id]/route.ts`.
- Added `ContentCard.tsx` with `unoptimized` attribute for cover images to prevent GIF quality loss by bypassing Next.js optimization.

### Phase 10: Media Uploads
- Added `lib/data/media.ts`, `components/admin/MediaUploader.tsx`, `app/api/admin/media/route.ts`.

### Phase 11: Email Notifications
- Added `lib/data/notifications.ts`, `lib/email/send-update-email.ts`.
- Added `app/api/admin/notify/route.ts`, `components/admin/SendNotificationDialog.tsx`.
- Added `app/admin/notifications/page.tsx`, `app/admin/settings/page.tsx`.

### Phase 14: QA
- `pnpm build` passes — 22 routes, TypeScript clean.
- Fixed Zod v4 `.errors` → `.issues` in API routes.
- Fixed `zodResolver` type cast for Zod 4.4.x compatibility.

## 2026-05-20 — Phases 0–4

- Project bootstrap, brand system, Supabase setup, public data layer.
