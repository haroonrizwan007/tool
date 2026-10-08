import Script from "next/script";
import { ADSTERRA_GLOBAL_SCRIPT } from "@/config/adsterra";
import { siteConfig } from "@/config/site";
import { parseGlobalScript } from "@/lib/ads";

/** Loads the one-time Adsterra script from config/adsterra.ts on every page (after interaction-ready). */
export default function GlobalAdScript() {
  if (!siteConfig.ads.enabled) return null;
  const parsed = parseGlobalScript(ADSTERRA_GLOBAL_SCRIPT);
  if (!parsed) return null;
  if (parsed.src) return <Script id="adsterra-global" src={parsed.src} strategy="lazyOnload" />;
  return (
    <Script id="adsterra-global" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: parsed.inline ?? "" }} />
  );
}
