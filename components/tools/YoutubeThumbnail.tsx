"use client";

import { useMemo, useState } from "react";
import { downloadBlob } from "@/lib/utils";
import { THUMB_SIZES, extractVideoId, thumbUrl } from "@/lib/youtube";

export default function YoutubeThumbnail() {
  const [input, setInput] = useState("");
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const [note, setNote] = useState("");
  const id = useMemo(() => extractVideoId(input), [input]);

  async function download(key: string) {
    if (!id) return;
    const url = thumbUrl(id, key);
    try {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error("bad response");
      downloadBlob(await res.blob(), `youtube-${id}-${key}.jpg`);
      setNote("");
    } catch {
      // Some browsers/CDNs block cross-origin fetches. Open the image so it can be saved manually.
      window.open(url, "_blank", "noopener,noreferrer");
      setNote("Your browser blocked the direct download, so the image opened in a new tab. Press and hold (or right-click) it and choose Save image.");
    }
  }

  return (
    <div>
      <label htmlFor="yt" className="label">YouTube video link</label>
      <input id="yt" className="input" inputMode="url" autoComplete="off" placeholder="https://www.youtube.com/watch?v=…" value={input} onChange={(e) => { setInput(e.target.value); setFailed({}); setNote(""); }} />
      {input.trim() && !id && <p role="alert" className="mt-2 text-sm text-red-600">That does not look like a YouTube video link. Paste a watch, youtu.be, Shorts or embed URL.</p>}

      {id && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {THUMB_SIZES.map((s) => {
            if (failed[s.key]) return null;
            return (
              <figure key={s.key} className="overflow-hidden rounded-xl border border-line bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbUrl(id, s.key)}
                  alt={`${s.label} thumbnail`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="aspect-video w-full bg-surface object-cover"
                  onError={() => setFailed((p) => ({ ...p, [s.key]: true }))}
                  onLoad={(e) => {
                    if (s.key !== "default" && e.currentTarget.naturalWidth <= 120) setFailed((p) => ({ ...p, [s.key]: true }));
                  }}
                />
                <figcaption className="flex items-center justify-between gap-3 p-3">
                  <span className="text-sm"><span className="font-semibold">{s.label}</span><br /><span className="text-muted">{s.dims}</span></span>
                  <button type="button" className="btn-primary" onClick={() => download(s.key)}>Download</button>
                </figcaption>
              </figure>
            );
          })}
        </div>
      )}
      {note && <p role="status" className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm">{note}</p>}
      {!input.trim() && <p className="mt-4 text-sm text-muted">Paste a link above and every available thumbnail size appears here.</p>}
    </div>
  );
}
