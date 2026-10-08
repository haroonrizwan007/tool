import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.domain}${clean === "/" ? "" : clean}`;
}

type MetaInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  keywords?: string[];
};

export function buildMetadata({ title, description, path, type = "website", publishedTime, keywords }: MetaInput): Metadata {
  const url = absoluteUrl(path);
  const image = absoluteUrl("/opengraph-image");
  const fullTitle = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    keywords: keywords ?? [...siteConfig.seo.keywords],
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.seo.locale,
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      ...(siteConfig.twitterHandle ? { site: siteConfig.twitterHandle } : {}),
    },
  };
}
