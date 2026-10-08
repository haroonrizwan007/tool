# Toolfy: multi-tool website (Next.js 15, React 19, TypeScript, Tailwind, App Router)

Seven free tools that run 100% in the browser: JPG to PNG, Image Compressor, Word Counter, Age Calculator, BMI Calculator, YouTube Thumbnail Downloader, QR Code Generator. No backend, no database. Every page is pre-rendered static HTML, so it deploys to Vercel with zero configuration.

## 1. Folder structure

```
app/
  layout.tsx               Root layout: header, footer, global ad script, default SEO
  page.tsx                 Home
  [tool]/page.tsx          One template for ALL tool pages (/jpg-to-png, /qr-code-generator, ...)
  tools/page.tsx           Tools index
  blog/page.tsx            Blog index
  blog/[slug]/page.tsx     Blog article template
  about/ contact/ privacy-policy/ terms/ disclaimer/
  sitemap.ts robots.ts     Generates /sitemap.xml and /robots.txt
  opengraph-image.tsx      Generates the social share image
  icon.svg  not-found.tsx  globals.css
components/
  ads/        AdSlot.tsx (use this), AdFrame.tsx, GlobalAdScript.tsx
  layout/     Header, Footer, Breadcrumbs, PageShell
  tools/      The 7 tool components + registry.tsx + shared.tsx + LocalNotice.tsx
  Faq.tsx JsonLd.tsx Markdown.tsx ToolCard.tsx ToolIcon.tsx ContactForm.tsx
config/
  site.ts      Name, domain, logo, email, social links, SEO defaults, ads master switch
  ads.ts       The 8 Adsterra slot codes (paste once)
  adsterra.ts  The one global Adsterra script
content/blog/  One .md file per article
data/tools.ts  Tool metadata: titles, descriptions, steps, FAQs, related tools
lib/           seo.ts, blog.ts, ads.ts, utils.ts and pure logic (age, bmi, youtube, text-stats)
public/        logo.svg
```

## 2. Installation

Requires Node.js 18.18 or newer (Node 20+ recommended).

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # TypeScript check
npm run build      # production build
npm start          # serve the production build locally
```

## 3. GitHub upload

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USER/YOUR-REPO.git
git push -u origin main
```
Create the empty repository on github.com first (no README, no .gitignore). `node_modules` and `.next` are already ignored.

## 4. Vercel deployment

1. Sign in at vercel.com with GitHub and choose **Add New > Project**.
2. Import the repository. Vercel detects Next.js; keep the defaults (build: `next build`).
3. Click **Deploy**. No environment variables are needed.
4. Add your domain under **Settings > Domains**, then set the same value as `domain` in `config/site.ts` (no trailing slash) and push. Canonical URLs, the sitemap, robots.txt and Open Graph tags all use that value.
5. Submit `https://YOUR-DOMAIN/sitemap.xml` in Google Search Console.

## 5. Adsterra setup

1. Create a publisher account, add your site and wait for approval.
2. Under **Websites > Add Code**, create ad units. Banners (728x90, 468x60, 300x250, 160x600, 320x50) go in slots; Social Bar, Popunder and similar scripts go in the global script.
3. **Slots:** open `config/ads.ts` and paste each snippet between the backticks of the matching key. One paste updates every placement that uses that slot.

| Slot | Where it appears |
|---|---|
| `homepageTop` | Home, below the hero |
| `homepageMiddle` | Home, between the tools and the features section |
| `homepageBottom` | Home, before the blog section |
| `toolTop` | Tool pages, below the introduction |
| `toolMiddle` | Tool pages, below the tool interface |
| `toolBottom` | Tool pages, before the FAQ and before related tools (also after blog articles) |
| `sidebar` | Desktop sticky sidebar on tool pages and blog articles |
| `footerBanner` | Every page, just before the footer |

4. **Global script:** paste into `config/adsterra.ts`, either the full `<script src="..."></script>` tag or only the URL. It loads once on every page, after the page is interactive.
5. Redeploy (push to GitHub). Ads need a real domain to serve; they often stay blank on localhost.

How it behaves: an empty slot renders nothing at all (no markup, no JavaScript, no gap). Each ad loads in its own lazy-loaded iframe, which lets several banners share a page and keeps them off the critical rendering path. Space is reserved from the banner's `height` and `width` to prevent layout shift. If the sidebar slot is empty, the sidebar column disappears and the content uses the full width.

Tip: use one banner size per slot that fits mobile (300x250 or 320x50) for the in-content slots. A 728x90 banner in a slot is clipped on narrow phones rather than overflowing.

## 6. Adding a new tool

1. Create `components/tools/MyTool.tsx` (a `"use client"` component with a default export).
2. Add one line to `components/tools/registry.tsx`: `"my-tool": dynamic(() => import("./MyTool"), { loading: Loading }),`
3. Add an entry to the array in `data/tools.ts` with the same `slug`, plus title, description, steps, features, FAQs and related slugs. Add an icon path for the slug in `components/ToolIcon.tsx` (optional; a default circle is used).
4. Done. The route `/my-tool`, metadata, canonical, JSON-LD, breadcrumbs, FAQ, sitemap entry, homepage card, footer link and ad placements are all generated automatically.

## 7. Changing the branding

- Name, domain, email, social links, SEO defaults: `config/site.ts`.
- Logo: replace `public/logo.svg` (and `app/icon.svg` for the favicon) or change `logo.src`. Set `src` to `""` to show just the name.
- Colors: the blue scale is `brand` and the text color is `ink` in `tailwind.config.ts`. Change the values there and the whole site follows.
- Legal pages read the name, email and date from `config/site.ts`. Have a lawyer review them before launch.

## 8. Disabling ads

- Everything off: set `ads: { enabled: false }` in `config/site.ts`.
- One placement off: empty that slot's backticks in `config/ads.ts`.
- Global script off: empty `ADSTERRA_GLOBAL_SCRIPT` in `config/adsterra.ts`.

## Adding a blog article

Create `content/blog/my-article.md`:

```
---
title: My Article Title
description: One or two sentences for search results.
date: 2026-10-15
tags: images, tips
tools: jpg-to-png, qr-code-generator
---
Your Markdown here. Supports ## and ### headings, lists, > quotes, **bold**, `code` and [links](/jpg-to-png).
```
The page, sitemap entry, JSON-LD and "Try the tools" links are created automatically.
