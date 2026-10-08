import type { AdSlotName } from "@/config/ads";
import { adCode } from "@/lib/ads";
import AdFrame from "./AdFrame";

/**
 * Usage: <AdSlot slot="toolTop" />
 * Server component: when the slot's code in config/ads.ts is empty (or ads are
 * disabled in config/site.ts) it returns null: no markup, no JS, no empty space.
 */
export default function AdSlot({ slot, className }: { slot: AdSlotName; className?: string }) {
  const code = adCode(slot);
  if (!code) return null;
  return <AdFrame code={code} className={className} />;
}
