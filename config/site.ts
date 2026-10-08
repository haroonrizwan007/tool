/**
 * CENTRAL SITE CONFIG
 * Change branding, domain, contact details, social links, SEO defaults and the
 * master ads switch here. Everything else in the project reads from this file.
 */
export const siteConfig = {
  // ---- Branding -----------------------------------------------------------
  name: "Toolfy",
  tagline: "Free online tools that run in your browser",
  // Production domain, no trailing slash. Used for canonical URLs, sitemap and OG tags.
  domain: "https://www.example.com",
  // Logo file lives in /public. Set src to "" to show only the site name.
  logo: { src: "/logo.svg", alt: "Toolfy logo", width: 36, height: 36 },

  // ---- Contact & social ---------------------------------------------------
  contactEmail: "hello@example.com",
  // Leave a value empty ("") to hide that icon/link.
  social: {
    twitter: "",
    facebook: "",
    instagram: "",
    youtube: "",
    github: "",
  },
  twitterHandle: "", // e.g. "@toolfy"

  // ---- SEO defaults -------------------------------------------------------
  seo: {
    defaultTitle: "Toolfy: Free Online Image, Text & Calculator Tools",
    defaultDescription:
      "Convert images, compress photos, count words, calculate age and BMI, download YouTube thumbnails and create QR codes. Free, fast and private: everything runs in your browser.",
    keywords: [
      "free online tools",
      "jpg to png",
      "image compressor",
      "word counter",
      "age calculator",
      "bmi calculator",
      "qr code generator",
    ],
    locale: "en_US",
    themeColor: "#1f4fe0",
  },

  // ---- Ads (master switch; slot codes live in config/ads.ts) --------------
  ads: { enabled: true },

  // ---- Legal pages --------------------------------------------------------
  legalUpdated: "October 8, 2026",
} as const;

export type SiteConfig = typeof siteConfig;
