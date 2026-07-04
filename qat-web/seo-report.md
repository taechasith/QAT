# QAT SEO & Performance Optimization Report

Generated on: 2026-07-04T19:36:10.888Z
Mode: Apply (Safe Fixes Applied)

## 📊 Summary

- **SEO Health Score:** `80/100`
- **Total Issues Detected:** 14
- **Critical Issues:** 0
- **Warnings:** 3
- **Info Suggestions:** 11
- **Auto-Fixed Issues:** 1

---

## 🛠️ Actions Taken / Status

### ✅ Files Modified:
- `src/app/robots.ts`

### Details:
- **Fixed:** [SEO] forgot-password page is not disallowed in robots.ts -> Fixed


---

## 🔍 Detailed Audit Findings

### 🛑 Critical Issues (0)
No critical issues found. Great job!

### ⚠️ Warnings (3)

#### 1. [SEO] forgot-password page is not disallowed in robots.ts
- **Route / Scope:** `Global`
- **File Affected:** `src/app/robots.ts`
- **Suggested Fix:** Add '/forgot-password' to the disallow array in src/app/robots.ts.
- **Auto-apply capability:** ✅ Safe to Auto-apply


#### 2. [SEO] Very little static text content detected (~195 characters)
- **Route / Scope:** `/news`
- **File Affected:** `src\app\(public)\news\page.tsx`
- **Suggested Fix:** Add more human-written content describing the section to improve crawl visibility.
- **Auto-apply capability:** ❌ Manual Fix Needed


#### 3. [Performance] Image missing width/height attributes (layout shift risk): src="block.url"
- **Route / Scope:** `/content/[slug]`
- **File Affected:** `src\components\content\BlockRenderer.tsx`
- **Suggested Fix:** Define explicit width and height on Next.js Image tag in src\components\content\BlockRenderer.tsx or use fill layout.
- **Auto-apply capability:** ❌ Manual Fix Needed


### 💡 Suggestions & Info (11)

#### 1. [Performance] Non-priority image could use lazy loading: src="item.cover_image_url"
- **Route / Scope:** `/`
- **File Affected:** `src\components\content\ContentCard.tsx`
- **Suggested Fix:** Add loading="lazy" or rely on Next.js default lazy loading (ensure priority is not set unnecessarily).


#### 2. [Performance] Non-priority image could use lazy loading: src="item.cover_image_url"
- **Route / Scope:** `/course`
- **File Affected:** `src\components\content\ContentCard.tsx`
- **Suggested Fix:** Add loading="lazy" or rely on Next.js default lazy loading (ensure priority is not set unnecessarily).


#### 3. [Performance] Non-priority image could use lazy loading: src="item.cover_image_url"
- **Route / Scope:** `/exhibition`
- **File Affected:** `src\components\content\ContentCard.tsx`
- **Suggested Fix:** Add loading="lazy" or rely on Next.js default lazy loading (ensure priority is not set unnecessarily).


#### 4. [Performance] Non-priority image could use lazy loading: src="item.cover_image_url"
- **Route / Scope:** `/experiment`
- **File Affected:** `src\components\content\ContentCard.tsx`
- **Suggested Fix:** Add loading="lazy" or rely on Next.js default lazy loading (ensure priority is not set unnecessarily).


#### 5. [Performance] Non-priority image could use lazy loading: src="item.cover_image_url"
- **Route / Scope:** `/game`
- **File Affected:** `src\components\content\ContentCard.tsx`
- **Suggested Fix:** Add loading="lazy" or rely on Next.js default lazy loading (ensure priority is not set unnecessarily).


#### 6. [Performance] Non-priority image could use lazy loading: src="item.cover_image_url"
- **Route / Scope:** `/news`
- **File Affected:** `src\components\content\ContentCard.tsx`
- **Suggested Fix:** Add loading="lazy" or rely on Next.js default lazy loading (ensure priority is not set unnecessarily).


#### 7. [Performance] Non-priority image could use lazy loading: src="item.cover_image_url"
- **Route / Scope:** `/research`
- **File Affected:** `src\components\content\ContentCard.tsx`
- **Suggested Fix:** Add loading="lazy" or rely on Next.js default lazy loading (ensure priority is not set unnecessarily).


#### 8. [Performance] Non-priority image could use lazy loading: src="item.cover_image_url"
- **Route / Scope:** `/talk`
- **File Affected:** `src\components\content\ContentCard.tsx`
- **Suggested Fix:** Add loading="lazy" or rely on Next.js default lazy loading (ensure priority is not set unnecessarily).


#### 9. [Performance] Non-priority image could use lazy loading: src="item.cover_image_url"
- **Route / Scope:** `/video`
- **File Affected:** `src\components\content\ContentCard.tsx`
- **Suggested Fix:** Add loading="lazy" or rely on Next.js default lazy loading (ensure priority is not set unnecessarily).


#### 10. [Performance] Fill image missing sizes attribute (oversized loading risk): src="item.cover_image_url"
- **Route / Scope:** `/content/[slug]`
- **File Affected:** `src\app\(public)\content\[slug]\page.tsx`
- **Suggested Fix:** Add sizes attribute to Next.js Image tag in src\app\(public)\content\[slug]\page.tsx to enable responsive image generation.


#### 11. [Performance] Non-priority image could use lazy loading: src="avatarUrl"
- **Route / Scope:** `/content/[slug]`
- **File Affected:** `src\app\(public)\content\[slug]\page.tsx`
- **Suggested Fix:** Add loading="lazy" or rely on Next.js default lazy loading (ensure priority is not set unnecessarily).


---

## 📋 Pages Analysis Detailed Matrix

| Route | Metadata | Title | Description | Canonical | JSON-LD | H1 Count | Client component? | Visited Components |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `/` | ✅ | ✅ | ✅ | ✅ | ✅ | `1` | ✅ No | `21` files |
| `/course` | ✅ | ✅ | ✅ | ✅ | ✅ | `1` | ✅ No | `15` files |
| `/exhibition` | ✅ | ✅ | ✅ | ✅ | ✅ | `1` | ✅ No | `15` files |
| `/experiment` | ✅ | ✅ | ✅ | ✅ | ✅ | `1` | ✅ No | `15` files |
| `/game` | ✅ | ✅ | ✅ | ✅ | ✅ | `1` | ✅ No | `15` files |
| `/news` | ✅ | ✅ | ✅ | ✅ | ✅ | `1` | ✅ No | `15` files |
| `/research` | ✅ | ✅ | ✅ | ✅ | ✅ | `1` | ✅ No | `15` files |
| `/talk` | ✅ | ✅ | ✅ | ✅ | ✅ | `1` | ✅ No | `15` files |
| `/video` | ✅ | ✅ | ✅ | ✅ | ✅ | `1` | ✅ No | `15` files |
| `/content/[slug]` | ✅ | ✅ | ✅ | ✅ | ✅ | `1` | ✅ No | `16` files |

---

## 🧠 AI Search Engine Visibility & llms.txt Status
- **robots.txt Status:** ✅ Active
- **sitemap.xml Status:** ✅ Dynamic configuration active (`src/app/sitemap.ts`)
- **llms.txt Status:** ✅ Active (`/llms.txt`)
- **Semantic HTML Check:** ✅ Fully validated. Headers are correctly structured.

---

## 📝 Manual Action Recommendations & Pages Needing Human Copy
1. **Move Root Pages to Server Components**: Route pages like `/course`, `/game`, etc. are currently server-rendered. However, if any page imports interactive elements, make sure to mark only those leaf elements with `"use client"` and not the root.
2. **Review Missing Alt Text on dynamic content**: Authors uploading content via the admin CMS must be reminded to provide descriptive alt text for cover images and body-block images.
3. **Verify Google Fonts loading performance**: Font declarations in `layout.tsx` are using Next.js Fonts (`IBM_Plex_Sans_Thai`, `Manrope`, `JetBrains_Mono`), which automatically preloads them, optimizing performance and avoiding layout shifts.
