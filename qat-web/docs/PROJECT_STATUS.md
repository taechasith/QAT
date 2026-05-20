# Project Status

## Current Phase

Phase 14 complete. Pending: Phases 15 (Vercel deployment) and 16 (admin handoff docs).

## Completed

- Phase 0: Asset verification, social media links confirmed.
- Phase 1: Next.js 16 bootstrap, TypeScript, Tailwind, shadcn/ui, all dependencies installed.
- Phase 2: QAT dark brand theme, IBM Plex Sans Thai / Manrope / JetBrains Mono fonts, SiteHeader, SiteFooter, SocialPanel, LogoMark.
- Phase 3: Supabase schema SQL, RLS policies, storage bucket, server/client/middleware helpers, admin email guard.
- Phase 4: Public data layer (content.ts, site-settings.ts), ContentCard, ContentGrid, EmptyContentState, PublicPageShell, all six public destination pages.
- Phase 5: Landing page narrative — QuantumLanding, MissionSection, FinalPortal, PortalCard, UpcomingHighlights.
- Phase 6: 3D quantum computer scroll scene — QuantumHeroScene, ScrollCameraRig, QuantumComputerModel, QuantumRealmParticles, ReducedMotionFallback, useScrollProgress, useReducedMotion.
- Phase 7: Auth — magic link login, auth callback, profile upsert, NotificationPreferences, AuthButton in header, /account page.
- Phase 8: Admin gate — requireAdmin server guard, AdminShell, AdminNav, /admin dashboard, /admin-unauthorized.
- Phase 9: CMS content editor — ContentEditorForm, ContentTable, ContentPreview, CategoryGuide, admin content list/new/edit pages, API routes for CRUD.
- Phase 10: Media uploader — MediaUploader component, /api/admin/media route, lib/data/media.ts.
- Phase 11: Email notifications — SendNotificationDialog, /api/admin/notify route, send-update-email.ts, notifications.ts, /admin/notifications page.
- Phase 13: Docs updated.
- Phase 14: Build passes. 22 routes generated. TypeScript clean.

## Next Steps

- Phase 15: Vercel deployment — configure env vars on Vercel, deploy to production.
- Phase 16: Admin handoff guide — document CMS usage for non-engineer admins.
- Supabase SQL must be pasted into the Supabase SQL Editor (one-time setup).
- Update Supabase Auth redirect URLs for production domain after deploy.
