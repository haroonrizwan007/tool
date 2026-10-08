"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { parseAdSize } from "@/lib/ads";

/**
 * Renders one ad inside an isolated, lazy-loaded iframe. Isolation lets several
 * Adsterra banners (which all use the global `atOptions`) live on one page, and
 * keeps ad scripts off the main thread's critical path. Space is reserved from
 * the banner size to avoid layout shift.
 */
export default function AdFrame({ code, className = "" }: { code: string; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const size = useMemo(() => parseAdSize(code), [code]);
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState(size.height ?? 100);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Unknown size (native banners etc.): measure the content for a few seconds after load.
  useEffect(() => {
    if (!visible || size.height) return;
    let n = 0;
    const t = setInterval(() => {
      n += 1;
      const h = frameRef.current?.contentDocument?.body?.scrollHeight;
      if (h && h > 20) setHeight((prev) => (Math.abs(prev - h) > 2 ? h : prev));
      if (n > 12) clearInterval(t);
    }, 500);
    return () => clearInterval(t);
  }, [visible, size.height]);

  const srcDoc = `<!doctype html><html><head><meta charset="utf-8"><base target="_blank"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}body{display:flex;justify-content:center}</style></head><body>${code}</body></html>`;

  return (
    <div
      ref={wrapRef}
      className={`ad-slot mx-auto my-6 flex w-full max-w-full flex-col items-center overflow-hidden ${className}`}
      style={{ minHeight: height + 18 }}
      aria-label="Advertisement"
    >
      <span className="mb-1 text-[11px] leading-none text-muted/70">Advertisement</span>
      {visible && (
        <iframe
          ref={frameRef}
          title="Advertisement"
          srcDoc={srcDoc}
          sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin"
          scrolling="no"
          loading="lazy"
          style={{ width: size.width ?? "100%", maxWidth: "100%", height, border: 0 }}
        />
      )}
    </div>
  );
}
