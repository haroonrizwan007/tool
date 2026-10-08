import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed = [
    { path: "/", priority: 1, freq: "weekly" as const },
    { path: "/tools", priority: 0.9, freq: "weekly" as const },
    { path: "/blog", priority: 0.7, freq: "weekly" as const },
    { path: "/about", priority: 0.4, freq: "yearly" as const },
    { path: "/contact", priority: 0.4, freq: "yearly" as const },
    { path: "/privacy-policy", priority: 0.2, freq: "yearly" as const },
    { path: "/terms", priority: 0.2, freq: "yearly" as const },
    { path: "/disclaimer", priority: 0.2, freq: "yearly" as const },
  ];
  return [
    ...fixed.map((p) => ({ url: absoluteUrl(p.path), lastModified: now, changeFrequency: p.freq, priority: p.priority })),
    ...tools.map((t) => ({ url: absoluteUrl(`/${t.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...getAllPosts().map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
