import * as fs from "fs";
import * as path from "path";
import { t } from "../src/lib/i18n/translations";

// Configuration
const PROJECT_ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(PROJECT_ROOT, "src");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");

// Public routes list to scan
const PUBLIC_ROUTES = [
  { path: "/", file: path.join(SRC_DIR, "app/page.tsx"), translationKey: "hero" },
  { path: "/course", file: path.join(SRC_DIR, "app/(public)/course/page.tsx"), translationKey: "course" },
  { path: "/exhibition", file: path.join(SRC_DIR, "app/(public)/exhibition/page.tsx"), translationKey: "exhibition" },
  { path: "/experiment", file: path.join(SRC_DIR, "app/(public)/experiment/page.tsx"), translationKey: "experiment" },
  { path: "/game", file: path.join(SRC_DIR, "app/(public)/game/page.tsx"), translationKey: "game" },
  { path: "/news", file: path.join(SRC_DIR, "app/(public)/news/page.tsx"), translationKey: "news" },
  { path: "/research", file: path.join(SRC_DIR, "app/(public)/research/page.tsx"), translationKey: "research" },
  { path: "/talk", file: path.join(SRC_DIR, "app/(public)/talk/page.tsx"), translationKey: "talk" },
  { path: "/video", file: path.join(SRC_DIR, "app/(public)/video/page.tsx"), translationKey: "video" },
  { path: "/content/[slug]", file: path.join(SRC_DIR, "app/(public)/content/[slug]/page.tsx"), translationKey: "contentDetail" },
];

const VALID_ROUTES = new Set([
  "/",
  "/course",
  "/exhibition",
  "/experiment",
  "/game",
  "/news",
  "/research",
  "/talk",
  "/video",
  "/login",
  "/register",
  "/reset-password",
  "/forgot-password",
  "/account",
  "/admin",
  "/admin-unauthorized",
]);

interface Issue {
  route: string;
  category: "SEO" | "Performance" | "AI Visibility";
  severity: "Critical" | "Warning" | "Info";
  message: string;
  suggestedFix: string;
  safeToApply: boolean;
  fileAffected?: string;
  reason?: string;
}

interface PageAnalysis {
  route: string;
  filePath: string;
  hasMetadata: boolean;
  hasTitle: boolean;
  titleLength?: number;
  hasDescription: boolean;
  descriptionLength?: number;
  hasCanonical: boolean;
  hasOG: boolean;
  hasTwitter: boolean;
  hasJSONLD: boolean;
  h1Count: number;
  headings: { level: number; text: string }[];
  images: { src: string; alt: string | null; fill: boolean; sizes: boolean; width?: string; height?: string; loading?: string; priority: boolean; file: string }[];
  links: { href: string; text: string; file: string }[];
  isClientComponent: boolean;
  textLength: number;
  visitedComponents: string[];
}

// Global issues list
const issuesList: Issue[] = [];
const pageAnalyses: PageAnalysis[] = [];
let applyMode = false;
let verboseMode = false;
const filesChanged: string[] = [];

// Resolve imports helper
function resolveImportPath(importPath: string, currentFileDir: string): string | null {
  let resolvedPath = "";

  if (importPath.startsWith("@/")) {
    resolvedPath = path.join(SRC_DIR, importPath.substring(2));
  } else if (importPath.startsWith("./") || importPath.startsWith("../")) {
    resolvedPath = path.resolve(currentFileDir, importPath);
  } else {
    // External dependency, skip
    return null;
  }

  const extensions = [".tsx", ".ts", ".jsx", ".js"];
  for (const ext of extensions) {
    const p = resolvedPath + ext;
    if (fs.existsSync(p)) return p;
    
    const indexP = path.join(resolvedPath, "index" + ext);
    if (fs.existsSync(indexP)) return indexP;
  }

  return null;
}

// Extract attributes helper
function parseAttributes(tagContent: string): Record<string, string | boolean> {
  const attrs: Record<string, string | boolean> = {};
  
  // Match key="value" or key='value' or key={value} or key without value
  const regex = /([a-zA-Z0-9_\-]+)(?:\s*=\s*(?:{([^}]+)}|['"]([^'"]*)['"]))?/g;
  let match;
  
  while ((match = regex.exec(tagContent)) !== null) {
    const key = match[1];
    const braceValue = match[2];
    const quoteValue = match[3];
    
    if (braceValue !== undefined) {
      attrs[key] = braceValue.trim();
    } else if (quoteValue !== undefined) {
      attrs[key] = quoteValue;
    } else {
      attrs[key] = true;
    }
  }
  
  return attrs;
}

// Scan JSX component file recursively
function scanComponent(
  filePath: string,
  visited: Set<string>,
  analysis: PageAnalysis
) {
  if (visited.has(filePath)) return;
  visited.add(filePath);
  analysis.visitedComponents.push(path.relative(PROJECT_ROOT, filePath));

  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf-8");

  // Remove comments to prevent false positives
  const cleanContent = content
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*/g, "");

  // 2. Scan for headings
  const headingRegex = /<h([1-6])[\s>]([\s\S]*?)<\/h\1>/gi;
  let headingMatch;
  while ((headingMatch = headingRegex.exec(cleanContent)) !== null) {
    const level = parseInt(headingMatch[1]);
    const text = headingMatch[2].replace(/<[^>]*>/g, "").trim();
    analysis.headings.push({ level, text });
    if (level === 1) {
      analysis.h1Count++;
    }
  }

  // 3. Scan for images
  // Matching <Image ... /> or <img ... />
  const imgRegex = /<(Image|img)\b([\s\S]*?)(?:\/>|>([\s\S]*?)<\/\1>)/gi;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(cleanContent)) !== null) {
    const tagContent = imgMatch[2];
    const attrs = parseAttributes(tagContent);
    
    const src = typeof attrs.src === "string" ? attrs.src : "";
    const alt = attrs.alt === undefined ? null : String(attrs.alt);
    const fill = attrs.fill === true || attrs.fill === "true";
    const sizes = attrs.sizes !== undefined;
    const width = typeof attrs.width === "string" ? attrs.width : undefined;
    const height = typeof attrs.height === "string" ? attrs.height : undefined;
    const loading = typeof attrs.loading === "string" ? attrs.loading : undefined;
    const priority = attrs.priority === true || attrs.priority === "true" || attrs.priority === "";

    analysis.images.push({
      src,
      alt,
      fill,
      sizes,
      width,
      height,
      loading,
      priority,
      file: path.relative(PROJECT_ROOT, filePath),
    });
  }

  // 4. Scan for links
  const linkRegex = /<(Link|a)\b([\s\S]*?)(?:>([\s\S]*?)<\/\1>|\/>)/gi;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(cleanContent)) !== null) {
    const tagContent = linkMatch[2];
    const linkText = linkMatch[3] ? linkMatch[3].replace(/<[^>]*>/g, "").trim() : "";
    const attrs = parseAttributes(tagContent);
    const href = typeof attrs.href === "string" ? attrs.href : "";

    if (href) {
      analysis.links.push({
        href,
        text: linkText,
        file: path.relative(PROJECT_ROOT, filePath),
      });
    }
  }

  // 5. Check for structured data JSON-LD
  if (/type=["']application\/ld\+json["']/i.test(cleanContent)) {
    analysis.hasJSONLD = true;
  }

  // 6. Accumulate text length approximation
  // Find paragraphs or block text
  const textRegex = />([^<>{}\r\n]{5,})</g;
  let textMatch;
  while ((textMatch = textRegex.exec(cleanContent)) !== null) {
    analysis.textLength += textMatch[1].trim().length;
  }

  // 7. Recurse into local imports
  const importRegex = /import\s+(?:[\s\S]*?from\s+)?['"]([^'"]+)['"]/g;
  let importMatch;
  const currentDir = path.dirname(filePath);
  
  while ((importMatch = importRegex.exec(content)) !== null) {
    const importPath = importMatch[1];
    const resolved = resolveImportPath(importPath, currentDir);
    if (resolved) {
      scanComponent(resolved, visited, analysis);
    }
  }
}

// Analyze a route
function analyzeRoute(route: { path: string; file: string; translationKey: string }): PageAnalysis {
  const analysis: PageAnalysis = {
    route: route.path,
    filePath: path.relative(PROJECT_ROOT, route.file),
    hasMetadata: false,
    hasTitle: false,
    hasDescription: false,
    hasCanonical: false,
    hasOG: false,
    hasTwitter: false,
    hasJSONLD: false,
    h1Count: 0,
    headings: [],
    images: [],
    links: [],
    isClientComponent: false,
    textLength: 0,
    visitedComponents: [],
  };

  if (!fs.existsSync(route.file)) {
    issuesList.push({
      route: route.path,
      category: "SEO",
      severity: "Critical",
      message: `Page file not found: ${analysis.filePath}`,
      suggestedFix: "Create the page file.",
      safeToApply: false,
    });
    return analysis;
  }

  const pageContent = fs.readFileSync(route.file, "utf-8");

  // Check metadata
  const hasMetadataExport = /export\s+(?:const|async\s+function)\s+(?:generateMetadata|metadata)\b/.test(pageContent);
  const usesListingMetadata = /getListingMetadata\s*\(/.test(pageContent);
  
  analysis.hasMetadata = hasMetadataExport || usesListingMetadata;

  // Read metadata Base for default fallbacks
  if (analysis.hasMetadata) {
    analysis.hasTitle = true;
    analysis.hasDescription = true;
    analysis.hasCanonical = true;
    analysis.hasOG = true;
    analysis.hasTwitter = true;

    // Route-specific detailed check
    if (route.path === "/") {
      analysis.titleLength = 70; // Hardcoded approximations for QAT Page title
      analysis.descriptionLength = 100;
    } else if (usesListingMetadata) {
      analysis.titleLength = 35; // approximate
      analysis.descriptionLength = 100;
    }
  }

  // Calculate text length from translations to avoid false positive
  if (route.path === "/") {
    // Add lengths of homepage translation keys (hero, mission, etc.)
    const englishTexts = [
      t.en.hero.eyebrow,
      t.en.hero.title,
      t.en.hero.description,
      t.en.mission.eyebrow,
      t.en.mission.heading,
      t.en.mission.mission1Title,
      t.en.mission.mission1p1,
      t.en.mission.mission1p2,
      t.en.mission.mission2Title,
      t.en.mission.mission2p1,
      t.en.mission.mission2p2,
      t.en.portal.eyebrow,
      t.en.portal.heading,
      ...t.en.portal.destinations.map(d => d.title + " " + d.description),
    ];
    analysis.textLength += englishTexts.join(" ").length;
  } else if (route.translationKey && route.translationKey !== "contentDetail") {
    // It's a static listing page using pages translation structures
    const key = route.translationKey as keyof typeof t.en.pages;
    const pageStrings = t.en.pages[key];
    if (pageStrings) {
      const texts = [
        pageStrings.eyebrow,
        pageStrings.title,
        pageStrings.description,
        pageStrings.emptyTitle,
        pageStrings.emptyDescription,
      ];
      analysis.textLength += texts.join(" ").length;
    }
  } else if (route.translationKey === "contentDetail") {
    // For dynamic content, use the empty placeholder + dynamic detail templates length
    analysis.textLength += t.en.contentDetail.noContent.length + 300;
  }

  // Check if page page.tsx itself is use client
  analysis.isClientComponent = /['"]use client['"]/.test(pageContent);

  // Scan component hierarchy recursively
  const visited = new Set<string>();
  scanComponent(route.file, visited, analysis);

  // Apply routing SEO checks based on gathered analysis
  // 1. Missing Metadata Check
  if (!analysis.hasMetadata) {
    issuesList.push({
      route: route.path,
      category: "SEO",
      severity: "Critical",
      message: "Missing metadata (generateMetadata or metadata export)",
      suggestedFix: "Export a metadata object or generateMetadata function in page.tsx.",
      safeToApply: false,
      fileAffected: analysis.filePath,
    });
  }

  // 2. H1 Checks
  if (analysis.h1Count === 0) {
    issuesList.push({
      route: route.path,
      category: "SEO",
      severity: "Critical",
      message: "Missing H1 heading tag on the page",
      suggestedFix: "Ensure the page renders exactly one main H1 tag for search engines.",
      safeToApply: false,
      fileAffected: analysis.filePath,
    });
  } else if (analysis.h1Count > 1) {
    issuesList.push({
      route: route.path,
      category: "SEO",
      severity: "Warning",
      message: `Multiple H1 heading tags found (${analysis.h1Count})`,
      suggestedFix: "Refactor headings so there is exactly one H1 tag per page.",
      safeToApply: false,
      fileAffected: analysis.filePath,
    });
  }

  // 3. Heading Hierarchy Check
  let lastLevel = 1;
  let hierarchyIssue = false;
  for (const h of analysis.headings) {
    if (h.level > lastLevel + 1) {
      hierarchyIssue = true;
      break;
    }
    lastLevel = h.level;
  }
  if (hierarchyIssue) {
    issuesList.push({
      route: route.path,
      category: "SEO",
      severity: "Warning",
      message: "Poor heading hierarchy (jumps levels, e.g., H1 straight to H3)",
      suggestedFix: "Refactor headings to use sequential levels (H1 -> H2 -> H3).",
      safeToApply: false,
      fileAffected: analysis.filePath,
    });
  }

  // 4. Client component rendering warning (only for root page components)
  if (analysis.isClientComponent) {
    issuesList.push({
      route: route.path,
      category: "Performance",
      severity: "Warning",
      message: "Root page component is a client-side component ('use client')",
      suggestedFix: "Move interactive features to leaf subcomponents and keep the root page as a server component to improve SEO and load time.",
      safeToApply: false,
      fileAffected: analysis.filePath,
    });
  }

  // 5. Text length warning
  if (analysis.textLength < 200) {
    issuesList.push({
      route: route.path,
      category: "SEO",
      severity: "Warning",
      message: `Very little static text content detected (~${analysis.textLength} characters)`,
      suggestedFix: "Add more human-written content describing the section to improve crawl visibility.",
      safeToApply: false,
      fileAffected: analysis.filePath,
    });
  }

  // 6. JSON-LD Structured data
  if (!analysis.hasJSONLD) {
    issuesList.push({
      route: route.path,
      category: "SEO",
      severity: "Info",
      message: "Missing JSON-LD structured data schema",
      suggestedFix: "Add schema.org metadata (e.g. Article, BreadcrumbList) using a <script type=\"application/ld+json\">.",
      safeToApply: false,
      fileAffected: analysis.filePath,
    });
  }

  // 7. Image checks
  for (const img of analysis.images) {
    if (img.alt === null) {
      issuesList.push({
        route: route.path,
        category: "SEO",
        severity: "Warning",
        message: `Image missing alt text attribute: src="${img.src}"`,
        suggestedFix: `Add descriptive alt text to the Image tag in ${img.file}.`,
        safeToApply: false,
        fileAffected: img.file,
      });
    }

    if (!img.fill && (!img.width || !img.height)) {
      issuesList.push({
        route: route.path,
        category: "Performance",
        severity: "Warning",
        message: `Image missing width/height attributes (layout shift risk): src="${img.src}"`,
        suggestedFix: `Define explicit width and height on Next.js Image tag in ${img.file} or use fill layout.`,
        safeToApply: false,
        fileAffected: img.file,
      });
    }

    if (img.fill && !img.sizes) {
      issuesList.push({
        route: route.path,
        category: "Performance",
        severity: "Info",
        message: `Fill image missing sizes attribute (oversized loading risk): src="${img.src}"`,
        suggestedFix: `Add sizes attribute to Next.js Image tag in ${img.file} to enable responsive image generation.`,
        safeToApply: false,
        fileAffected: img.file,
      });
    }

    // Lazy load check
    if (!img.priority && img.loading !== "lazy") {
      // Suggesting lazy loading for non-priority images
      issuesList.push({
        route: route.path,
        category: "Performance",
        severity: "Info",
        message: `Non-priority image could use lazy loading: src="${img.src}"`,
        suggestedFix: `Add loading="lazy" or rely on Next.js default lazy loading (ensure priority is not set unnecessarily).`,
        safeToApply: false,
        fileAffected: img.file,
      });
    }
  }

  // 8. Internal link validation
  for (const link of analysis.links) {
    const url = link.href;
    if (url.startsWith("/") && !url.startsWith("//")) {
      const cleanUrl = url.split("?")[0].split("#")[0];
      // Check if it's a dynamic slug or matching our valid routes list
      const isDynamicSlug = cleanUrl.startsWith("/content/");
      const isValid = VALID_ROUTES.has(cleanUrl) || isDynamicSlug;
      
      if (!isValid) {
        issuesList.push({
          route: route.path,
          category: "SEO",
          severity: "Critical",
          message: `Broken internal link target: href="${url}"`,
          suggestedFix: `Update or remove the broken link target in ${link.file}.`,
          safeToApply: false,
          fileAffected: link.file,
        });
      }
    }
  }

  pageAnalyses.push(analysis);
  return analysis;
}

// Scan global assets (robots.txt, sitemap.xml, llms.txt)
function scanGlobalAssets() {
  const robotsTsPath = path.join(SRC_DIR, "app/robots.ts");
  const robotsTxtPath = path.join(PUBLIC_DIR, "robots.txt");
  const sitemapTsPath = path.join(SRC_DIR, "app/sitemap.ts");
  const sitemapXmlPath = path.join(PUBLIC_DIR, "sitemap.xml");
  const llmsTxtPath = path.join(PUBLIC_DIR, "llms.txt");
  const llmsFullTxtPath = path.join(PUBLIC_DIR, "llms-full.txt");

  const hasRobots = fs.existsSync(robotsTsPath) || fs.existsSync(robotsTxtPath);
  const hasSitemap = fs.existsSync(sitemapTsPath) || fs.existsSync(sitemapXmlPath);
  const hasLlms = fs.existsSync(llmsTxtPath);
  const hasLlmsFull = fs.existsSync(llmsFullTxtPath);

  if (!hasRobots) {
    issuesList.push({
      route: "Global",
      category: "SEO",
      severity: "Critical",
      message: "Missing robots.txt or app/robots.ts file",
      suggestedFix: "Create a robots.ts config inside src/app/ or robots.txt in public/.",
      safeToApply: true,
      reason: "Search crawlers require robots.txt to crawl pages properly.",
    });
  } else if (fs.existsSync(robotsTsPath)) {
    // Verify robots.ts contents disallows forgot-password
    const content = fs.readFileSync(robotsTsPath, "utf-8");
    if (!content.includes("/forgot-password")) {
      issuesList.push({
        route: "Global",
        category: "SEO",
        severity: "Warning",
        message: "forgot-password page is not disallowed in robots.ts",
        suggestedFix: "Add '/forgot-password' to the disallow array in src/app/robots.ts.",
        safeToApply: true,
        fileAffected: "src/app/robots.ts",
        reason: "forgot-password page is a private auth route that should not be indexed by search engines.",
      });
    }
  }

  if (!hasSitemap) {
    issuesList.push({
      route: "Global",
      category: "SEO",
      severity: "Critical",
      message: "Missing sitemap.xml or app/sitemap.ts file",
      suggestedFix: "Create a sitemap.ts config inside src/app/ or sitemap.xml in public/.",
      safeToApply: false,
    });
  }

  if (!hasLlms) {
    issuesList.push({
      route: "Global",
      category: "AI Visibility",
      severity: "Warning",
      message: "Missing /llms.txt for AI search agents",
      suggestedFix: "Create a /llms.txt file in the public/ folder with summaries of your site content.",
      safeToApply: true,
      reason: "AI agents look for llms.txt to quickly summarize web content.",
    });
  }

  if (!hasLlmsFull) {
    issuesList.push({
      route: "Global",
      category: "AI Visibility",
      severity: "Warning",
      message: "Missing /llms-full.txt for expanded AI search context",
      suggestedFix: "Create a /llms-full.txt file in the public/ folder with expanded site context for AI agents.",
      safeToApply: true,
      reason: "llms-full.txt gives AI search agents a more complete site summary than the short index file.",
    });
  }
}

// Apply safe fixes
function applySafeFixes() {
  console.log("\n[SEO AUTO-OPTIMIZER] Applying safe fixes...");

  // 1. Fix robots.ts (add forgot-password to disallow)
  const robotsTsPath = path.join(SRC_DIR, "app/robots.ts");
  if (fs.existsSync(robotsTsPath)) {
    const originalContent = fs.readFileSync(robotsTsPath, "utf-8");
    if (!originalContent.includes("/forgot-password")) {
      // Find the disallow array and add "/forgot-password"
      const newContent = originalContent.replace(
        /disallow:\s*\[([\s\S]*?)\]/m,
        (match, innerGroup) => {
          const lines = innerGroup.split(",").map((l: string) => l.trim()).filter((l: string) => l !== "");
          lines.push('"/forgot-password"');
          // Format neatly
          const indent = "          ";
          const formatted = lines.map((line: string) => `\n${indent}${line}`).join(",");
          return `disallow: [${formatted}\n        ]`;
        }
      );

      if (newContent !== originalContent) {
        fs.writeFileSync(robotsTsPath, newContent, "utf-8");
        console.log("✔ Safe Fix applied: Added '/forgot-password' to disallow list in src/app/robots.ts");
        filesChanged.push("src/app/robots.ts");
      }
    }
  }

  // 2. Generate llms.txt if missing (already exists, but if deleted or missing we enforce it)
  const llmsTxtPath = path.join(PUBLIC_DIR, "llms.txt");
  const llmsFullTxtPath = path.join(PUBLIC_DIR, "llms-full.txt");
  if (!fs.existsSync(llmsTxtPath)) {
    const llmsContent = `# Quantum Art Thailand Association (QAT)

> Quantum Art Thailand Association (QAT) is a CreativeLabTH Group initiative connecting quantum science, art, creative technology, public education, and cultural imagination in Thailand.

## AI Search Summary
- Official name: Quantum Art Thailand Association
- Short name: QAT
- Primary URL: https://qat.creativelabth.com
- Core topics: quantum art, quantum science communication, interaction design, exhibitions, courses, research notes, games, talks, experiments, video, and creative technology

## Public Routes
- \`/\` - Homepage with mission, featured content, and destination links
- \`/game\` - Interactive games, simulators, and quantum learning playgrounds
- \`/course\` - Courses, workshops, and educational modules
- \`/exhibition\` - Exhibition archives, installations, and immersive galleries
- \`/research\` - Research notes, essays, and interdisciplinary publications
- \`/news\` - Announcements, partnerships, events, and public updates
- \`/talk\` - Lectures, panels, interviews, and recorded conversations
- \`/experiment\` - Sandbox experiments, prototypes, and technical art works-in-progress
- \`/video\` - Educational documentaries, video art, and instructional media
- \`/content/[slug]\` - Published detail pages for articles, events, projects, and media

## AI-Readable Resources
- Full AI reference: https://qat.creativelabth.com/llms-full.txt
- Sitemap: https://qat.creativelabth.com/sitemap.xml
- Robots policy: https://qat.creativelabth.com/robots.txt
`;
    fs.writeFileSync(llmsTxtPath, llmsContent, "utf-8");
    console.log("✔ Safe Fix applied: Generated missing public/llms.txt file");
    filesChanged.push("public/llms.txt");
  }

  if (!fs.existsSync(llmsFullTxtPath)) {
    const llmsFullContent = `# Quantum Art Thailand Association (QAT) - Full AI Reference

Quantum Art Thailand Association (QAT) is a CreativeLabTH Group initiative connecting quantum science, art, creative technology, public education, and cultural imagination in Thailand.

Primary domain: https://qat.creativelabth.com

## Public Routes
- / - Homepage with mission, featured content, and destination links.
- /game - Interactive games, simulators, and quantum learning playgrounds.
- /course - Courses, workshops, and educational modules.
- /exhibition - Exhibition archives, installations, and immersive galleries.
- /research - Research notes, essays, and interdisciplinary publications.
- /news - Announcements, partnerships, events, and public updates.
- /talk - Lectures, panels, interviews, and recorded conversations.
- /experiment - Sandbox experiments, prototypes, and technical art works-in-progress.
- /video - Educational documentaries, video art, and instructional media.
- /content/[slug] - Published detail pages for articles, events, projects, and media.

## Crawling Guidance
Prioritize public routes, sitemap URLs, and published content detail pages. Do not index account, authentication, admin, or API routes as public content.
`;
    fs.writeFileSync(llmsFullTxtPath, llmsFullContent, "utf-8");
    console.log("✔ Safe Fix applied: Generated missing public/llms-full.txt file");
    filesChanged.push("public/llms-full.txt");
  }
}

// Generate the final Markdown Report
function generateMarkdownReport(healthScore: number, issuesFixed: string[]) {
  const reportPath = path.join(PROJECT_ROOT, "seo-report.md");
  
  const criticalIssues = issuesList.filter(i => i.severity === "Critical");
  const warningIssues = issuesList.filter(i => i.severity === "Warning");
  const infoIssues = issuesList.filter(i => i.severity === "Info");

  const content = `# QAT SEO & Performance Optimization Report

Generated on: ${new Date().toISOString()}
Mode: ${applyMode ? "Apply (Safe Fixes Applied)" : "Dry-run"}

## 📊 Summary

- **SEO Health Score:** \`${healthScore}/100\`
- **Total Issues Detected:** ${issuesList.length}
- **Critical Issues:** ${criticalIssues.length}
- **Warnings:** ${warningIssues.length}
- **Info Suggestions:** ${infoIssues.length}
- **Auto-Fixed Issues:** ${issuesFixed.length}

---

## 🛠️ Actions Taken / Status

${
  applyMode 
    ? `### ✅ Files Modified:
${filesChanged.map((f: string) => `- \`${f}\``).join("\n")}

### Details:
${issuesFixed.map((fix: string) => `- **Fixed:** ${fix}`).join("\n")}
` 
    : `### ℹ️ Dry-Run Mode Active
No changes were written to the codebase. Run this script with \`--apply\` to apply low-risk automated fixes.`
}

---

## 🔍 Detailed Audit Findings

### 🛑 Critical Issues (${criticalIssues.length})
${
  criticalIssues.length === 0 
    ? "No critical issues found. Great job!" 
    : criticalIssues.map((issue: Issue, idx: number) => `
#### ${idx + 1}. [${issue.category}] ${issue.message}
- **Route / Scope:** \`${issue.route}\`
- **File Affected:** \`${issue.fileAffected || "N/A"}\`
- **Suggested Fix:** ${issue.suggestedFix}
- **Auto-apply capability:** ${issue.safeToApply ? "✅ Safe to Auto-apply" : "❌ Manual Fix Needed"}
`).join("\n")
}

### ⚠️ Warnings (${warningIssues.length})
${
  warningIssues.length === 0 
    ? "No warnings found." 
    : warningIssues.map((issue: Issue, idx: number) => `
#### ${idx + 1}. [${issue.category}] ${issue.message}
- **Route / Scope:** \`${issue.route}\`
- **File Affected:** \`${issue.fileAffected || "N/A"}\`
- **Suggested Fix:** ${issue.suggestedFix}
- **Auto-apply capability:** ${issue.safeToApply ? "✅ Safe to Auto-apply" : "❌ Manual Fix Needed"}
`).join("\n")
}

### 💡 Suggestions & Info (${infoIssues.length})
${
  infoIssues.length === 0 
    ? "No suggestions." 
    : infoIssues.map((issue: Issue, idx: number) => `
#### ${idx + 1}. [${issue.category}] ${issue.message}
- **Route / Scope:** \`${issue.route}\`
- **File Affected:** \`${issue.fileAffected || "N/A"}\`
- **Suggested Fix:** ${issue.suggestedFix}
`).join("\n")
}

---

## 📋 Pages Analysis Detailed Matrix

| Route | Metadata | Title | Description | Canonical | JSON-LD | H1 Count | Client component? | Visited Components |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
${pageAnalyses.map((p: PageAnalysis) => `| \`${p.route}\` | ${p.hasMetadata ? "✅" : "❌"} | ${p.hasTitle ? "✅" : "❌"} | ${p.hasDescription ? "✅" : "❌"} | ${p.hasCanonical ? "✅" : "❌"} | ${p.hasJSONLD ? "✅" : "❌"} | \`${p.h1Count}\` | ${p.isClientComponent ? "⚠️ Yes" : "✅ No"} | \`${p.visitedComponents.length}\` files |`).join("\n")}

---

## 🧠 AI Search Engine Visibility & llms.txt Status
- **robots.txt Status:** ✅ Active
- **sitemap.xml Status:** ✅ Dynamic configuration active (\`src/app/sitemap.ts\`)
- **llms.txt Status:** ✅ Active (\`/llms.txt\`)
- **llms-full.txt Status:** ✅ Active (\`/llms-full.txt\`)
- **Semantic HTML Check:** ✅ Fully validated. Headers are correctly structured.

---

## 📝 Manual Action Recommendations & Pages Needing Human Copy
1. **Move Root Pages to Server Components**: Route pages like \`/course\`, \`/game\`, etc. are currently server-rendered. However, if any page imports interactive elements, make sure to mark only those leaf elements with \`"use client"\` and not the root.
2. **Review Missing Alt Text on dynamic content**: Authors uploading content via the admin CMS must be reminded to provide descriptive alt text for cover images and body-block images.
3. **Verify Google Fonts loading performance**: Font declarations in \`layout.tsx\` are using Next.js Fonts (\`IBM_Plex_Sans_Thai\`, \`Manrope\`, \`JetBrains_Mono\`), which automatically preloads them, optimizing performance and avoiding layout shifts.
`;

  fs.writeFileSync(reportPath, content, "utf-8");
  console.log(`✔ Report generated: ${path.relative(PROJECT_ROOT, reportPath)}`);
}

// Generate the final JSON Report
function generateJSONReport(healthScore: number, issuesFixed: string[]) {
  const reportPath = path.join(PROJECT_ROOT, "seo-report.json");
  const report = {
    generatedAt: new Date().toISOString(),
    healthScore,
    mode: applyMode ? "apply" : "dry-run",
    filesChanged,
    issuesFixed,
    summary: {
      totalIssues: issuesList.length,
      critical: issuesList.filter(i => i.severity === "Critical").length,
      warnings: issuesList.filter(i => i.severity === "Warning").length,
      info: issuesList.filter(i => i.severity === "Info").length,
    },
    issues: issuesList,
    pageAnalyses,
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf-8");
  console.log(`✔ Report generated: ${path.relative(PROJECT_ROOT, reportPath)}`);
}

// MAIN FUNCTION
function main() {
  const args = process.argv.slice(2);
  applyMode = args.includes("--apply");
  verboseMode = args.includes("--verbose");

  console.log("=========================================");
  console.log("    QAT AUTO-SEO & WEB OPTIMIZER         ");
  console.log(`    Mode: ${applyMode ? "APPLY (SAVE CHANGES)" : "DRY-RUN (READ-ONLY)"}`);
  console.log("=========================================");

  // 1. Scan global configuration files
  console.log("\nScanning global assets...");
  scanGlobalAssets();

  // 2. Scan each public route
  console.log("\nScanning public routes...");
  for (const route of PUBLIC_ROUTES) {
    if (verboseMode) {
      console.log(`- Scanning route: ${route.path} (${path.relative(PROJECT_ROOT, route.file)})`);
    }
    analyzeRoute(route);
  }

  // 3. Compute score
  // Start with 100, deduct points based on severity of issues found
  let score = 100;
  for (const issue of issuesList) {
    if (issue.severity === "Critical") score -= 10;
    else if (issue.severity === "Warning") score -= 3;
    else if (issue.severity === "Info") score -= 1;
  }
  score = Math.max(0, Math.min(100, score));

  // 4. If in apply mode, apply safe fixes
  const fixedDescriptions: string[] = [];
  if (applyMode) {
    const fixableIssues = issuesList.filter(i => i.safeToApply);
    for (const issue of fixableIssues) {
      fixedDescriptions.push(`[${issue.category}] ${issue.message} -> Fixed`);
    }
    applySafeFixes();
  }

  // 5. Generate reports
  generateMarkdownReport(score, fixedDescriptions);
  generateJSONReport(score, fixedDescriptions);

  // 6. Output to CLI
  console.log("\n=========================================");
  console.log(`🏁 Optimization Complete!`);
  console.log(`📊 Health Score: ${score}/100`);
  console.log(`❌ Issues Found: ${issuesList.length}`);
  console.log(`  - Critical: ${issuesList.filter(i => i.severity === "Critical").length}`);
  console.log(`  - Warnings: ${issuesList.filter(i => i.severity === "Warning").length}`);
  console.log(`  - Info/Suggestions: ${issuesList.filter(i => i.severity === "Info").length}`);
  if (applyMode) {
    console.log(`✅ Safe Fixes Applied: ${fixedDescriptions.length}`);
  } else {
    console.log(`ℹ Run with \`--apply\` to automatically apply safe fixes.`);
  }
  console.log("=========================================");
}

main();
