# Quantum Art Thailand Association Web App: CLI Phase-by-Phase SRD

**Project:** Quantum Art Thailand Association, CreativeLabTH Group International Initiative  
**Mode:** CLI agent builds phase by phase. The CLI must stop after every phase for human review.  
**Approval words:** `go next phase`, `next`, `พอใจ`, or a clear user approval.  
**Primary local project path:** `C:\Users\HP OMEN\QAT`  
**Deployment target:** Vercel  
**Database/Auth/Storage:** Supabase  
**Prepared for:** Tae / CreativeLabTH Group / Quantum Art Thailand Association

---

## 0. Core Operating Rule for the CLI

The CLI must work like a senior product engineer, not like a one-shot code generator.

After each phase, the CLI must:

1. Print a short summary of what changed.
2. List every file created, changed, or deleted.
3. List commands run and whether they passed.
4. Show screenshots, preview URLs, or terminal output when useful.
5. List known issues and unfinished decisions.
6. Ask the user to review.
7. Stop until the user says `go next phase`, `next`, `พอใจ`, or gives explicit approval.

The CLI must not continue to the next phase automatically.

Use this stop message after every phase:

```text
Phase [N] is ready for review.
Please check the result.
Reply with:
- "พอใจ" or "go next phase" to continue
- "edit: ..." to request changes in this phase
- "stop" to pause the build
```

If the CLI needs missing information, it must ask clearly and guide the user to get it. Examples: Supabase project URL, Supabase publishable key, Resend API key, Vercel account setup, admin email list, or the missing `social media.md` file.

---

## 1. Purpose

Build a premium public web platform for **Quantum Art Thailand Association** as a CreativeLabTH Group international initiative focused on the quantum world.

The site must explain the project clearly to the public:

- Make hard science, especially quantum science, easier for the public to access.
- Use art, interaction, and storytelling as science communication tools.
- Create artistic experiments that help scientists think beyond the normal frame of science.
- Inspire future-facing imagination where art, science, and technology meet.

The website must include a beautiful landing page with a 3D quantum computer model and a quantum-realm visual environment. As the user scrolls, the camera explores the model from different angles. The final scroll section becomes a homepage-style portal with upcoming events, projects, and six navigation destinations.

---

## 2. Target Audience

### Primary audience

- General public interested in science, art, future culture, and quantum technology.
- Students and young creators in Thailand, ASEAN, and international communities.
- Artists, designers, creative technologists, and educators.
- Scientists, researchers, and science communicators.

### Secondary audience

- Partners, sponsors, universities, labs, cultural organizations, and public agencies.
- Event visitors who need news, exhibitions, course updates, and project information.
- Admin team members who need to add content without touching code.

---

## 3. Key UX Features

### Public site

- Cinematic 3D landing page using `quantum_computer.glb`.
- Scroll-driven camera exploration around the model.
- Background quantum realm: particles, atoms, fields, soft bloom, and subtle scientific/futuristic visual language.
- Clean explanation of QAT mission and CreativeLabTH Group context.
- Final homepage section with upcoming events and projects. Empty states must look intentional until admins add content.
- Six destination cards:
  1. **Atlas**: external link to `https://qatatlas.creativelabth.com`
  2. **Game**: online page, empty CMS-driven page for now
  3. **Course**: online page, empty CMS-driven page for now
  4. **Exhibition**: past event archive, empty CMS-driven page for now
  5. **Research / Article**: CMS-driven articles, empty for now
  6. **News Updated**: CMS-driven news, empty for now
- Login so users can subscribe to web update notifications by email.
- Footer / under panel with social media information from `social media.md`.

### Admin CMS

- Only assigned admin emails can access the CMS.
- Admin CMS appears only after login if the user is an admin.
- Admin can add, edit, publish, unpublish, and categorize content.
- Admin UI must be friendly, guided, and built with shadcn/ui components.
- CMS categories must map to the public pages: events, projects, games, courses, exhibitions, research/articles, news.
- Admin forms must include help text, validation, preview, draft/published status, slug generation, image upload, and publish scheduling when possible.

### Accessibility and comfort

- Support keyboard navigation.
- Respect `prefers-reduced-motion`.
- Provide non-3D fallback for low-powered devices.
- Text contrast must pass modern accessibility expectations.
- 3D scene must not block reading, login, or CMS actions.

---

## 4. Computational Architecture

Use a modern full-stack Next.js architecture:

```text
Browser
  |
  |-- Public pages: landing, destination pages, auth pages
  |-- Client 3D layer: React Three Fiber + Three.js + Drei
  |-- Client motion layer: Motion for React / scroll-linked UI motion
  |
Next.js App Router on Vercel
  |
  |-- Server Components for public content fetches
  |-- Server Actions / Route Handlers for admin mutations
  |-- Middleware for session refresh and protected routes
  |-- API routes for email notifications and optional AI features
  |
Supabase
  |
  |-- Auth: email login / magic link / OTP
  |-- Postgres: profiles, content, settings, notifications, admin allowlist
  |-- Row Level Security: public reads only published content; admins manage CMS
  |-- Storage: media uploads and public images
  |
Optional external APIs
  |
  |-- Resend or similar provider for update notification emails
  |-- OpenAI or another LLM API only for admin-side content drafting if approved
```

### Apple-level engineering principles for this project

- Make the first load beautiful but not heavy.
- Treat motion as communication, not decoration.
- Use progressive enhancement: the page must still work if 3D is disabled.
- Keep admin workflows simple enough for non-engineers.
- Build clear empty states instead of broken-looking blank pages.
- Keep secrets server-side only.
- Every phase must produce a reviewable result.

---

## 5. Requirements

### Functional requirements

- Public landing page with 3D model background.
- Scroll camera path that reveals multiple angles of the model.
- Quantum realm background layer with particles / atoms / field-like visual effects.
- Final landing section with upcoming events and projects loaded from Supabase.
- Six destination pages/cards with Atlas external redirect.
- User login and profile creation through Supabase Auth.
- User preference for email update notifications.
- Admin-only CMS route.
- CMS content creation, editing, publishing, and categorization.
- Supabase SQL file ready to paste into Supabase SQL Editor.
- Footer social media panel loaded from `social media.md` when available.
- Vercel-ready deployment.
- Living README/docs update process triggered by user phrase `act as SRD`.

### Non-functional requirements

- TypeScript strict mode.
- Mobile-first responsive design.
- Lighthouse performance target: 85+ on desktop, 75+ on mobile after 3D optimization.
- No service role key in client code.
- RLS enabled on all app tables.
- Friendly loading, empty, error, and unauthorized states.
- Admin forms must validate data before save.
- The site must be maintainable by future CreativeLabTH developers.

---

## 6. Tech Stack

### Core

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- Supabase Auth, Postgres, and Storage
- Vercel

### 3D and motion

- Three.js
- React Three Fiber
- Drei
- Optional postprocessing for bloom / particles
- Motion for React, previously known as Framer Motion

### Forms and validation

- React Hook Form
- Zod
- shadcn/ui Form components

### State and utilities

- Zustand for small client state when needed
- `next/font/google` for IBM Plex Sans Thai, Manrope, and JetBrains Mono
- `lucide-react` for icons
- `sonner` for toast notifications

### Optional services

- Resend for transactional email update notifications
- OpenAI API only if admin-side AI writing assistance is requested

---

## 7. Math Models

### 7.1 Scroll progress

```ts
const progress = clamp(
  window.scrollY / (document.body.scrollHeight - window.innerHeight),
  0,
  1
)
```

### 7.2 Smoothstep easing

Use this to remove harsh camera motion:

```ts
function smoothstep(t: number) {
  return t * t * (3 - 2 * t)
}
```

### 7.3 Linear interpolation

```ts
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}
```

### 7.4 Frame-rate independent damping

```ts
function damp(current: number, target: number, lambda: number, dt: number) {
  return lerp(current, target, 1 - Math.exp(-lambda * dt))
}
```

### 7.5 Camera path

Use a Catmull-Rom style path or manually interpolated keyframes:

```ts
type CameraKeyframe = {
  progress: number
  position: [number, number, number]
  target: [number, number, number]
  fov?: number
}

const cameraPath: CameraKeyframe[] = [
  { progress: 0.00, position: [0, 1.4, 8], target: [0, 0, 0], fov: 42 },
  { progress: 0.18, position: [4, 2.0, 5], target: [0, 0.4, 0], fov: 38 },
  { progress: 0.36, position: [-3.8, 1.2, 4], target: [0, 0, 0], fov: 36 },
  { progress: 0.58, position: [0, 4.5, 3.4], target: [0, 0, 0], fov: 40 },
  { progress: 0.78, position: [0, 1.4, 9], target: [0, 0, 0], fov: 46 },
  { progress: 1.00, position: [0, 0.8, 12], target: [0, 0, 0], fov: 50 }
]
```

### 7.6 Quantum realm particle distribution

For a circular / spherical visual field:

```ts
const radius = Math.sqrt(Math.random()) * maxRadius
const theta = Math.random() * Math.PI * 2
const x = Math.cos(theta) * radius
const y = Math.sin(theta) * radius
const z = (Math.random() - 0.5) * depth
```

### 7.7 Reduced motion rule

If `prefers-reduced-motion` is true:

- Disable aggressive camera movement.
- Use static model rotation or static poster image.
- Keep important content readable without scroll-triggered visual dependence.

---

## 8. Implementation Overview

### Main implementation modules

```text
Landing shell
  app/page.tsx
  components/landing/QuantumLanding.tsx
  components/landing/FinalPortal.tsx

3D system
  components/three/QuantumHeroScene.tsx
  components/three/QuantumComputerModel.tsx
  components/three/ScrollCameraRig.tsx
  components/three/QuantumRealmParticles.tsx
  components/three/ReducedMotionFallback.tsx

Public content
  app/(public)/game/page.tsx
  app/(public)/course/page.tsx
  app/(public)/exhibition/page.tsx
  app/(public)/research/page.tsx
  app/(public)/news/page.tsx
  app/(public)/content/[slug]/page.tsx

Auth
  app/(auth)/login/page.tsx
  app/(auth)/auth/callback/route.ts
  components/auth/AuthButton.tsx
  components/auth/NotificationPreferences.tsx

Admin CMS
  app/admin/page.tsx
  app/admin/content/page.tsx
  app/admin/content/new/page.tsx
  app/admin/content/[id]/edit/page.tsx
  components/admin/AdminShell.tsx
  components/admin/AdminGuard.tsx
  components/admin/ContentEditorForm.tsx
  components/admin/ContentPreview.tsx
  components/admin/CategoryGuide.tsx

Data layer
  lib/supabase/client.ts
  lib/supabase/server.ts
  lib/supabase/middleware.ts
  lib/data/content.ts
  lib/data/profile.ts
  lib/auth/admin.ts

Email / APIs
  app/api/admin/notify/route.ts
  app/api/admin/ai-draft/route.ts optional
  lib/email/send-update-email.ts
  lib/ai/prompt-guard.ts optional
```

---

## 9. System Flow

### Public visitor flow

```text
Visitor opens landing page
  -> sees cinematic QAT intro and 3D quantum computer
  -> scrolls through model camera path
  -> reads mission sections
  -> reaches final portal section
  -> chooses Atlas / Game / Course / Exhibition / Research / News
  -> optionally logs in for email update notifications
```

### Logged-in user flow

```text
User logs in with email
  -> Supabase creates auth session
  -> app creates/updates profile row
  -> user can toggle email update notifications
  -> user receives updates only if opted in
```

### Admin flow

```text
Admin logs in with assigned email
  -> app checks admin allowlist
  -> CMS link appears
  -> admin opens /admin
  -> admin chooses content category
  -> guided form appears
  -> admin saves draft or publishes
  -> published content appears on public pages
  -> admin can send update notification to opted-in users
```

### Atlas flow

```text
User clicks Atlas
  -> external navigation to https://qatatlas.creativelabth.com
```

---

## 10. Data Flow and Storage

### Data flow

```text
CMS form
  -> Server Action / Route Handler
  -> Admin authorization check
  -> Zod validation
  -> Supabase insert/update
  -> Public page fetches published content
  -> Optional email notification is sent to opted-in users
```

### Storage flow

```text
Admin uploads cover image
  -> Supabase Storage media bucket
  -> content_items.cover_image_url stores public URL or storage path
  -> public page renders optimized image
```

### Local asset flow

The CLI must copy local files into the project, not reference local Windows paths in production:

```powershell
New-Item -ItemType Directory -Force public\models, public\brand
Copy-Item "C:\Users\HP OMEN\QAT\quantum_computer.glb" "public\models\quantum_computer.glb"
Copy-Item "C:\Users\HP OMEN\QAT\QAT_Logo.png" "public\brand\QAT_Logo.png"
```

For `social media.md`, the CLI must first check:

```powershell
Test-Path "C:\Users\HP OMEN\QAT\social media.md"
```

If found, parse it into `content/social-media.json`.  
If not found, ask the user to provide the file or paste the social links.

---

## 11. AI / API Usage

AI is not required for the first production version. If AI is added, it must be admin-only.

### Allowed AI use cases

- Draft news summaries from admin-provided notes.
- Suggest event descriptions.
- Convert rough admin notes into clean public copy.
- Suggest SEO title and meta description.

### Not allowed

- AI must not publish content automatically.
- AI must not bypass admin approval.
- AI must not read private Supabase user data unless absolutely needed and explicitly approved.
- AI must not expose API keys or environment variables.

### Required API keys / environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=server_only_never_client
ADMIN_EMAILS=tae@example.com,admin2@example.com
RESEND_API_KEY=optional_for_email_notifications
EMAIL_FROM=Quantum Art Thailand <updates@your-domain.com>
OPENAI_API_KEY=optional_only_if_ai_features_are_enabled
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The CLI must ask the user for each missing key and explain where to get it.

---

## 12. Prompt Guard

Use prompt guard rules for any AI-assisted admin feature.

### Guard principles

- Only admins can call AI routes.
- Treat all CMS text as untrusted input.
- Never allow user-provided content to override system/developer rules.
- AI output must be saved as draft only.
- Admin must click publish manually.
- Sanitize markdown / HTML before rendering.
- Block script tags, event handlers, iframe embeds, and unsafe URLs unless explicitly whitelisted.
- Log AI generations in `ai_generation_logs` if AI is enabled.

### Example guard contract

```ts
export const aiGuard = {
  routeAccess: "admin-only",
  outputMode: "draft-only",
  publishMode: "human-approval-required",
  inputPolicy: "treat-cms-fields-as-untrusted",
  secretsPolicy: "never-send-env-or-service-role-keys-to-ai",
  renderingPolicy: "sanitize-before-render"
}
```

---

## 13. Prerequisites

### Required accounts

- GitHub account
- Supabase account and new Supabase project
- Vercel account
- Optional: Resend account for email notifications
- Optional: OpenAI API account for admin writing assistance

### Required local tools

- Node.js LTS
- pnpm
- Git
- Vercel CLI
- Code editor
- Browser with WebGL support

### Recommended Windows setup

```powershell
node -v
pnpm -v
git --version
npm i -g vercel
vercel --version
```

### Install the UI/UX skill repo

```powershell
cd "C:\Users\HP OMEN"
git clone https://github.com/taechasith/JuniorUI-UXDesigner.git
cd JuniorUI-UXDesigner
.\scripts\install.cmd
```

Then in Codex / CLI:

```text
Use $vibe-ui-ux-designer to review this QAT web app for layout, accessibility, motion, and developer quality.
```

---

## 14. Installation Steps

### Bootstrap project

```powershell
cd "C:\Users\HP OMEN\QAT"
pnpm create next-app@latest qat-web --ts --eslint --tailwind --app --src-dir --import-alias "@/*" --use-pnpm
cd qat-web
```

### Install UI system

```powershell
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card badge input textarea select dialog dropdown-menu sheet tabs table form label switch sonner navigation-menu separator avatar tooltip skeleton alert popover command calendar
```

### Install app dependencies

```powershell
pnpm add @supabase/supabase-js @supabase/ssr three @react-three/fiber @react-three/drei @react-three/postprocessing motion lucide-react zod react-hook-form @hookform/resolvers next-themes zustand clsx tailwind-merge resend
pnpm add -D @types/three prettier eslint-plugin-unused-imports
```

### Copy required local assets

```powershell
New-Item -ItemType Directory -Force public\models, public\brand, content
Copy-Item "C:\Users\HP OMEN\QAT\quantum_computer.glb" "public\models\quantum_computer.glb"
Copy-Item "C:\Users\HP OMEN\QAT\QAT_Logo.png" "public\brand\QAT_Logo.png"
```

### Create environment file

```powershell
Copy-Item .env.example .env.local
notepad .env.local
```

The CLI must create `.env.example` first with placeholder keys.

---

## 15. Efficient Directory Layout

```text
qat-web/
  app/
    layout.tsx
    page.tsx
    globals.css
    (auth)/
      login/page.tsx
      auth/callback/route.ts
    (public)/
      game/page.tsx
      course/page.tsx
      exhibition/page.tsx
      research/page.tsx
      news/page.tsx
      content/[slug]/page.tsx
    admin/
      page.tsx
      content/page.tsx
      content/new/page.tsx
      content/[id]/edit/page.tsx
      settings/page.tsx
    api/
      admin/notify/route.ts
      admin/ai-draft/route.ts
  components/
    admin/
    auth/
    landing/
    layout/
    three/
    ui/
  content/
    social-media.json
  docs/
    SRD.md
    PROJECT_STATUS.md
    CHANGELOG.md
    DECISIONS.md
    KNOWN_ISSUES.md
    ADMIN_GUIDE.md
    DEPLOYMENT.md
  lib/
    ai/
    auth/
    data/
    email/
    supabase/
    utils.ts
  public/
    brand/QAT_Logo.png
    models/quantum_computer.glb
    fallback/quantum-hero-poster.webp
  supabase/
    schema.sql
    seed.sql
    migrations/0001_qat_schema.sql
  README.md
  package.json
  middleware.ts
  next.config.ts
  .env.example
```

---

## 16. Supabase SQL File

Create this file:

```text
supabase/schema.sql
```

Paste this SQL into Supabase SQL Editor after replacing admin emails.

```sql
-- Quantum Art Thailand Association Web App Schema
-- Paste into Supabase SQL Editor.
-- Replace admin@example.com values before running.

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

-- Replace these with real admin emails before running.
insert into public.admin_emails (email)
values
  ('admin@example.com'),
  ('tae@example.com')
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

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;

create policy "Profiles can be read by owner or admin"
on public.profiles for select
to authenticated
using (auth.uid() = id or public.is_admin());

create policy "Profiles can be inserted by owner"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

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

create trigger content_items_set_updated_at
before update on public.content_items
for each row execute function public.set_updated_at();

alter table public.content_items enable row level security;

create policy "Published content is public"
on public.content_items for select
to anon, authenticated
using (status = 'published');

create policy "Admins can read all content"
on public.content_items for select
to authenticated
using (public.is_admin());

create policy "Admins can insert content"
on public.content_items for insert
to authenticated
with check (public.is_admin());

create policy "Admins can update content"
on public.content_items for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

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

create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;

create policy "Public can read site settings"
on public.site_settings for select
to anon, authenticated
using (true);

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

create policy "Admins can read email logs"
on public.email_delivery_logs for select
to authenticated
using (public.is_admin());

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

create policy "Admins can manage AI logs"
on public.ai_generation_logs for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- ---------- Storage bucket ----------
insert into storage.buckets (id, name, public)
values ('qat-media', 'qat-media', true)
on conflict (id) do nothing;

create policy "Public can view QAT media"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'qat-media');

create policy "Admins can upload QAT media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'qat-media' and public.is_admin());

create policy "Admins can update QAT media"
on storage.objects for update
to authenticated
using (bucket_id = 'qat-media' and public.is_admin())
with check (bucket_id = 'qat-media' and public.is_admin());

create policy "Admins can delete QAT media"
on storage.objects for delete
to authenticated
using (bucket_id = 'qat-media' and public.is_admin());
```

---

## 17. Phase-by-Phase Build Plan for CLI

## Phase 0: Intake and Safety Setup

### Goal

Confirm all local assets, accounts, and secrets before writing app code.

### CLI tasks

1. Check working folder:

```powershell
cd "C:\Users\HP OMEN\QAT"
Get-ChildItem
```

2. Verify required files:

```powershell
Test-Path "C:\Users\HP OMEN\QAT\quantum_computer.glb"
Test-Path "C:\Users\HP OMEN\QAT\QAT_Logo.png"
Test-Path "C:\Users\HP OMEN\QAT\social media.md"
```

3. Ask user for missing data:

```text
Please provide:
1. Admin email list for CMS access
2. Supabase project URL
3. Supabase publishable key
4. Vercel project/team name if already created
5. Resend API key if you want email notifications now
6. social media.md file or social links if the file is missing
```

### Acceptance checklist

- Local model exists.
- Logo exists.
- Social links are found or user knows they must provide them later.
- Admin emails are known.
- Supabase project exists or user is guided to create it.

### Stop for user review

Use the standard phase stop message.

---

## Phase 1: Project Bootstrap

### Goal

Create the base Next.js app with TypeScript, Tailwind, App Router, and shadcn/ui.

### CLI commands

```powershell
cd "C:\Users\HP OMEN\QAT"
pnpm create next-app@latest qat-web --ts --eslint --tailwind --app --src-dir --import-alias "@/*" --use-pnpm
cd qat-web
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card badge input textarea select dialog dropdown-menu sheet tabs table form label switch sonner navigation-menu separator avatar tooltip skeleton alert popover command calendar
pnpm add @supabase/supabase-js @supabase/ssr three @react-three/fiber @react-three/drei @react-three/postprocessing motion lucide-react zod react-hook-form @hookform/resolvers next-themes zustand clsx tailwind-merge resend
pnpm add -D @types/three prettier eslint-plugin-unused-imports
```

### Files to create

- `.env.example`
- `docs/SRD.md`
- `docs/PROJECT_STATUS.md`
- `docs/CHANGELOG.md`
- `docs/DECISIONS.md`
- `docs/KNOWN_ISSUES.md`
- `docs/ADMIN_GUIDE.md`
- `docs/DEPLOYMENT.md`

### Acceptance checklist

- `pnpm dev` starts successfully.
- Default Next.js page loads at `http://localhost:3000`.
- shadcn/ui config exists.
- Docs folder exists.

### Stop for user review

Use the standard phase stop message.

---

## Phase 2: Brand, Fonts, and Design System

### Goal

Create the QAT visual foundation.

### CLI tasks

1. Copy brand assets:

```powershell
New-Item -ItemType Directory -Force public\models, public\brand, public\fallback, content
Copy-Item "C:\Users\HP OMEN\QAT\quantum_computer.glb" "public\models\quantum_computer.glb"
Copy-Item "C:\Users\HP OMEN\QAT\QAT_Logo.png" "public\brand\QAT_Logo.png"
```

2. Add fonts in `app/layout.tsx`:

- IBM Plex Sans Thai
- Manrope
- JetBrains Mono

3. Create theme tokens in `app/globals.css`:

- Deep quantum black / blue background
- Electric cyan / violet accents
- Soft glass panels
- Subtle gradients
- Focus rings visible on dark surfaces

4. Build layout components:

- `components/layout/SiteHeader.tsx`
- `components/layout/SiteFooter.tsx`
- `components/layout/SocialPanel.tsx`
- `components/layout/LogoMark.tsx`

### Acceptance checklist

- Logo appears in header.
- Fonts load correctly.
- Footer social panel exists with placeholder if social file is missing.
- Dark visual theme is in place.

### Stop for user review

Use the standard phase stop message.

---

## Phase 3: Supabase Setup and SQL

### Goal

Create database schema, RLS policies, storage bucket, and server/client helpers.

### CLI tasks

1. Create:

```text
supabase/schema.sql
supabase/seed.sql
supabase/migrations/0001_qat_schema.sql
lib/supabase/client.ts
lib/supabase/server.ts
lib/supabase/middleware.ts
middleware.ts
lib/auth/admin.ts
```

2. Put the SQL from this SRD into `supabase/schema.sql`.
3. Ask the user to replace admin emails in the SQL before running it.
4. Ask the user to paste SQL into Supabase SQL Editor.
5. Create `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAILS=
RESEND_API_KEY=
EMAIL_FROM=
OPENAI_API_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Acceptance checklist

- SQL file exists.
- Supabase tables exist after user runs SQL.
- RLS is enabled.
- App can initialize Supabase client.
- No service role key appears in client files.

### Stop for user review

Use the standard phase stop message.

---

## Phase 4: Public Data Layer and Empty States

### Goal

Build reliable content fetching and empty public pages before adding visual complexity.

### CLI tasks

Create:

```text
lib/data/content.ts
lib/data/site-settings.ts
components/content/ContentCard.tsx
components/content/EmptyContentState.tsx
components/content/ContentGrid.tsx
```

Create public destination pages:

```text
app/(public)/game/page.tsx
app/(public)/course/page.tsx
app/(public)/exhibition/page.tsx
app/(public)/research/page.tsx
app/(public)/news/page.tsx
app/(public)/content/[slug]/page.tsx
```

Rules:

- Atlas is external only and points to `https://qatatlas.creativelabth.com`.
- Other pages show elegant empty states until admin content exists.
- Published content only.
- Draft content must never show publicly.

### Acceptance checklist

- All six destinations exist in UI.
- Atlas opens external site.
- Empty states look designed, not unfinished.
- Published content query is ready.

### Stop for user review

Use the standard phase stop message.

---

## Phase 5: Landing Page Narrative

### Goal

Build the non-3D version of the landing page first so content and structure are clear.

### CLI tasks

Create:

```text
components/landing/QuantumLanding.tsx
components/landing/MissionSection.tsx
components/landing/FinalPortal.tsx
components/landing/PortalCard.tsx
components/landing/UpcomingHighlights.tsx
app/page.tsx
```

Landing sections:

1. Hero: Quantum Art Thailand Association.
2. CreativeLabTH Group international initiative context.
3. Mission: public access to hard science.
4. Mission: artistic experiments for scientific imagination.
5. Portal section with upcoming events/projects and six destinations.

Copy direction:

- Clear, poetic, but not vague.
- Avoid heavy jargon.
- Explain quantum science communication in accessible language.

### Acceptance checklist

- Landing page works without 3D.
- Mission is understandable in under 30 seconds.
- Portal section is usable on desktop and mobile.
- Upcoming events/projects show empty state from Supabase.

### Stop for user review

Use the standard phase stop message.

---

## Phase 6: 3D Quantum Computer Scroll Experience

### Goal

Add cinematic 3D model background and scroll-linked camera exploration.

### CLI tasks

Create:

```text
components/three/QuantumHeroScene.tsx
components/three/QuantumComputerModel.tsx
components/three/ScrollCameraRig.tsx
components/three/QuantumRealmParticles.tsx
components/three/ReducedMotionFallback.tsx
hooks/useReducedMotion.ts
hooks/useScrollProgress.ts
```

Implementation rules:

- Use dynamic import for the 3D scene to avoid server-side rendering problems.
- Load `/models/quantum_computer.glb`.
- Use Suspense fallback.
- Add particle field and subtle quantum realm effects.
- Camera path follows the math model in this SRD.
- Disable heavy postprocessing on mobile or low-power mode.
- Respect `prefers-reduced-motion`.
- Add static fallback if WebGL fails.

Performance rules:

- Cap device pixel ratio, for example `[1, 1.5]`.
- Avoid huge particle counts on mobile.
- Lazy-load the 3D scene.
- Keep text in normal HTML above the canvas for accessibility.

### Acceptance checklist

- Model loads from `public/models/quantum_computer.glb`.
- Scroll changes camera angle smoothly.
- Text remains readable.
- Page still works if 3D fails.
- Mobile performance is acceptable.

### Stop for user review

Use the standard phase stop message.

---

## Phase 7: Authentication and Notification Preferences

### Goal

Allow users to log in and opt into email notifications.

### CLI tasks

Create:

```text
app/(auth)/login/page.tsx
app/(auth)/auth/callback/route.ts
components/auth/AuthButton.tsx
components/auth/NotificationPreferences.tsx
lib/data/profile.ts
```

Implementation rules:

- Use Supabase Auth email login / magic link / OTP.
- On login, create or update `profiles` row.
- Users can toggle `wants_update_email`.
- The profile page or dropdown must clearly say what emails they are subscribing to.

### Acceptance checklist

- User can log in.
- User profile is created.
- User can opt in/out of email updates.
- Session persists after refresh.

### Stop for user review

Use the standard phase stop message.

---

## Phase 8: Admin Gate and CMS Shell

### Goal

Create a protected admin area visible only to assigned admin emails.

### CLI tasks

Create:

```text
app/admin/page.tsx
components/admin/AdminShell.tsx
components/admin/AdminGuard.tsx
components/admin/AdminNav.tsx
lib/auth/admin.ts
```

Implementation rules:

- Check admin status server-side.
- Hide admin navigation from non-admin users.
- If logged-in user is not admin, show a polite unauthorized page.
- If not logged in, ask user to log in.
- Never rely only on client-side admin checks.

### Acceptance checklist

- Admin can see `/admin`.
- Non-admin cannot access CMS.
- CMS shell has clean navigation.
- Admin status matches Supabase allowlist.

### Stop for user review

Use the standard phase stop message.

---

## Phase 9: CMS Content Editor

### Goal

Build guided content creation and editing for all categories.

### CLI tasks

Create:

```text
app/admin/content/page.tsx
app/admin/content/new/page.tsx
app/admin/content/[id]/edit/page.tsx
components/admin/ContentTable.tsx
components/admin/ContentEditorForm.tsx
components/admin/ContentPreview.tsx
components/admin/CategoryGuide.tsx
lib/data/admin-content.ts
lib/validation/content.ts
```

### CMS categories

- Event
- Project
- Game
- Course
- Exhibition
- Research / Article
- News

### Guided fields

Common fields:

- Title
- Slug
- Excerpt
- Body markdown
- Cover image
- Status: draft / published / archived
- Published date
- External URL
- Sort order
- Metadata JSON hidden behind advanced section

Category-specific guidance:

- Event: start date, end date, location, registration link.
- Project: project status, collaborators, external link.
- Game: online launch URL, play status, release note.
- Course: course level, schedule, enrollment link.
- Exhibition: past date, venue, photo gallery link.
- Research / Article: author, reading time, references.
- News: update date, related project/event.

### Acceptance checklist

- Admin can create a draft.
- Admin can publish content.
- Published content appears publicly.
- Draft content is hidden publicly.
- Forms validate required fields.
- CMS UX is understandable for non-engineers.

### Stop for user review

Use the standard phase stop message.

---

## Phase 10: Media Uploads and Social Panel

### Goal

Enable admin media uploads and footer social media rendering.

### CLI tasks

1. Create media upload component:

```text
components/admin/MediaUploader.tsx
lib/data/media.ts
```

2. Parse `social media.md` if available:

```text
scripts/parse-social-media.ts
content/social-media.json
```

3. If `social media.md` is missing, create placeholder JSON:

```json
{
  "links": [
    { "label": "Facebook", "url": "", "handle": "" },
    { "label": "Instagram", "url": "", "handle": "" },
    { "label": "YouTube", "url": "", "handle": "" },
    { "label": "LinkedIn", "url": "", "handle": "" }
  ]
}
```

### Acceptance checklist

- Admin can upload/select cover image.
- Footer social panel uses real or placeholder social data.
- Missing social data is handled gracefully.

### Stop for user review

Use the standard phase stop message.

---

## Phase 11: Email Update Notifications

### Goal

Let admin notify opted-in users when important content is published.

### CLI tasks

Create:

```text
app/api/admin/notify/route.ts
components/admin/SendNotificationDialog.tsx
lib/email/send-update-email.ts
lib/data/notifications.ts
```

Implementation rules:

- Admin-only route.
- Send only to `profiles.wants_update_email = true`.
- Log each attempt in `email_delivery_logs`.
- If `RESEND_API_KEY` is missing, show setup instructions instead of crashing.
- Do not send emails during tests without explicit admin action.

### Acceptance checklist

- Admin can open notification dialog.
- App detects missing email provider configuration.
- Test notification can be sent after API key is configured.
- Email logs are visible to admin.

### Stop for user review

Use the standard phase stop message.

---

## Phase 12: Optional AI Writing Assistant and Prompt Guard

### Goal

Add admin-only AI drafting only if the user wants it.

### CLI tasks

Before coding, ask:

```text
Do you want AI drafting inside the CMS now? It needs an API key and will only save draft suggestions, never auto-publish.
```

If approved, create:

```text
app/api/admin/ai-draft/route.ts
components/admin/AIDraftAssistant.tsx
lib/ai/prompt-guard.ts
lib/ai/content-draft.ts
```

Implementation rules:

- Admin-only.
- Server-side API key only.
- Save generated copy as draft.
- Sanitize output.
- Log AI activity.

### Acceptance checklist

- AI feature is hidden if no API key.
- AI cannot publish.
- Admin can edit AI output before saving.
- Prompt guard file exists.

### Stop for user review

Use the standard phase stop message.

---

## Phase 13: README and Living Docs Protocol

### Goal

Make the project self-documenting and keep docs updated whenever the user says `act as SRD`.

### Required docs

```text
README.md
docs/SRD.md
docs/PROJECT_STATUS.md
docs/CHANGELOG.md
docs/DECISIONS.md
docs/KNOWN_ISSUES.md
docs/ADMIN_GUIDE.md
docs/DEPLOYMENT.md
```

### CLI behavior when user says `act as SRD`

The CLI must:

1. Inspect current project state.
2. Inspect git diff.
3. Update `docs/SRD.md` with current requirements and architecture.
4. Update `docs/PROJECT_STATUS.md` with completed, in-progress, and blocked items.
5. Update `docs/CHANGELOG.md` with dated changes.
6. Update `docs/DECISIONS.md` with architecture/product decisions.
7. Update `docs/KNOWN_ISSUES.md` with bugs and limitations.
8. Update `README.md` if setup or usage changed.
9. Show doc diff.
10. Stop for user review.

The CLI must not use `act as SRD` as permission to rewrite app code unless the user explicitly asks.

### README minimum content

- Project overview
- Local setup
- Environment variables
- Supabase setup
- Admin setup
- Running dev server
- Deployment to Vercel
- CMS usage
- How to update docs with `act as SRD`

### Acceptance checklist

- README is useful for a new developer.
- Docs match current implementation.
- `act as SRD` protocol is written clearly.

### Stop for user review

Use the standard phase stop message.

---

## Phase 14: QA, Testing, and Bug Fixes

### Goal

Stabilize the product before deployment.

### CLI tasks

Run:

```powershell
pnpm lint
pnpm build
pnpm dev
```

Test checklist:

- Landing page loads.
- 3D model loads.
- Reduced motion works.
- Mobile layout works.
- Atlas link works.
- Empty pages work.
- Login works.
- Notification preference works.
- Admin gate works.
- Admin can create/publish content.
- Published content appears publicly.
- Draft content stays hidden.
- Email notification route handles missing API key.
- No secret keys appear in client bundle.

### Accessibility checklist

- Keyboard navigation.
- Visible focus states.
- Semantic headings.
- Alt text for meaningful images.
- Color contrast.
- Reduced motion fallback.

### Acceptance checklist

- `pnpm build` passes.
- No critical console errors.
- Major user flows pass manually.
- Known issues are documented.

### Stop for user review

Use the standard phase stop message.

---

## Phase 15: Vercel Deployment

### Goal

Deploy the project to Vercel and prepare for production use.

### CLI tasks

```powershell
vercel login
vercel link
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add ADMIN_EMAILS
vercel env add RESEND_API_KEY
vercel env add EMAIL_FROM
vercel env add NEXT_PUBLIC_SITE_URL
vercel deploy
vercel deploy --prod
```

Implementation rules:

- Never commit `.env.local`.
- Set production `NEXT_PUBLIC_SITE_URL` to the final Vercel/custom domain.
- Update Supabase Auth redirect URLs for local and production domains.
- Confirm email provider domain verification if using Resend.

### Acceptance checklist

- Production URL loads.
- Login works in production.
- Admin route works in production.
- Supabase redirect URLs are configured.
- 3D asset loads from production.
- Footer and portal links work.

### Stop for user review

Use the standard phase stop message.

---

## Phase 16: Admin Handoff

### Goal

Make the website maintainable by admins after launch.

### CLI tasks

Create or update:

```text
docs/ADMIN_GUIDE.md
docs/DEPLOYMENT.md
docs/KNOWN_ISSUES.md
```

Admin guide must explain:

- How to log in.
- How to create content.
- Difference between draft and published.
- How to add cover images.
- How to send update notifications.
- How to add events, projects, courses, games, exhibitions, research/articles, and news.
- How to update social media links.
- What to do if the email notification system fails.

### Acceptance checklist

- Admin can use the CMS without a developer.
- Project handoff docs are clear.
- Known limitations are documented.

### Stop for user review

Use the standard phase stop message.

---

## 18. Bugs and Limitations to Track

The CLI must keep these in `docs/KNOWN_ISSUES.md` and update them as they change.

- 3D GLB may be heavy on low-power devices.
- WebGL may fail on some older browsers or battery-saving modes.
- Local Windows paths do not exist in production; assets must be copied to `public/`.
- `social media.md` may not exist; CLI must handle missing file gracefully.
- Email notifications require a verified email provider/domain.
- First admin emails must be seeded manually in Supabase SQL.
- Atlas is external and cannot be controlled from this CMS unless later integrated.
- AI drafting is optional and should remain draft-only.
- Public pages other than Atlas may intentionally have no details until admins add content.

---

## 19. Definition of Done

The project is done when:

- Landing page tells the QAT story clearly.
- 3D quantum computer scroll experience works with fallback.
- Six destinations exist and behave correctly.
- Atlas links to `https://qatatlas.creativelabth.com`.
- Users can log in and manage update email preference.
- Admin-only CMS works.
- Admin can create and publish content.
- Supabase SQL is documented and committed.
- Vercel deployment works.
- README and docs are complete.
- `act as SRD` documentation protocol is implemented.
- User has reviewed and approved the final phase.

---

## 20. Source References for the CLI

Use these sources when updating implementation details:

- shadcn/ui CLI docs: https://ui.shadcn.com/docs/cli
- Supabase Next.js quickstart: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- Next.js App Router docs: https://nextjs.org/docs/app
- Vercel Next.js docs: https://vercel.com/docs/frameworks/nextjs
- React Three Fiber docs: https://r3f.docs.pmnd.rs/getting-started/introduction
- Three.js GLTFLoader docs: https://threejs.org/docs/pages/GLTFLoader.html
- Motion for React docs: https://motion.dev/docs/react
- JuniorUI-UXDesigner skill repo: https://github.com/taechasith/JuniorUI-UXDesigner
```

