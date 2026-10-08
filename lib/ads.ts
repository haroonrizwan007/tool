import { ADS, type AdSlotName } from "@/config/ads";
import { siteConfig } from "@/config/site";

export function adCode(slot: AdSlotName): string {
  return siteConfig.ads.enabled ? (ADS[slot] ?? "").trim() : "";
}

export const hasAd = (slot: AdSlotName) => adCode(slot).length > 0;

/** Pulls a script URL (or inline code) out of whatever was pasted into config/adsterra.ts */
export function parseGlobalScript(raw: string): { src?: string; inline?: string } | null {
  const s = raw.trim();
  if (!s) return null;
  if (/^https?:\/\/\S+$/i.test(s) || s.startsWith("//")) return { src: s };
  const src = /<script[^>]*\ssrc=["']([^"']+)["']/i.exec(s)?.[1];
  if (src) return { src };
  const inline = s.replace(/<\/?script[^>]*>/gi, "").trim();
  return inline ? { inline } : null;
}

/** Reads width/height from Adsterra banner snippets (atOptions) so space can be reserved (prevents layout shift). */
export function parseAdSize(code: string): { width?: number; height?: number } {
  const w = /['"]width['"]\s*:\s*(\d{2,4})/.exec(code)?.[1];
  const h = /['"]height['"]\s*:\s*(\d{2,4})/.exec(code)?.[1];
  return { width: w ? Number(w) : undefined, height: h ? Number(h) : undefined };
}
