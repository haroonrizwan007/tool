import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.seo.defaultTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#0f2466 0%,#1f4fe0 100%)", color: "white" }}>
        <div style={{ fontSize: 40, opacity: 0.85 }}>{siteConfig.name}</div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.08, marginTop: 24, letterSpacing: -2 }}>{siteConfig.tagline}</div>
        <div style={{ fontSize: 34, marginTop: 32, opacity: 0.85 }}>Images, text, calculators and QR codes. Private by design.</div>
      </div>
    ),
    size
  );
}
