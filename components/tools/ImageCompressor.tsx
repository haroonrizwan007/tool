"use client";

import { useEffect, useRef, useState } from "react";
import { baseName, canvasToBlob, downloadBlob, formatBytes, loadImage, uid } from "@/lib/utils";
import { FileDropzone } from "./shared";

type Entry = { id: string; file: File; preview: string };
type Result = { blob: Blob; ext: string; width: number; height: number; kept: boolean; error?: string };
type Format = "auto" | "jpeg" | "webp";

const EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

async function compress(file: File, quality: number, format: Format, maxWidth: number | null): Promise<Result> {
  const img = await loadImage(file);
  let w = img.naturalWidth;
  let h = img.naturalHeight;
  const resized = Boolean(maxWidth && w > maxWidth);
  if (maxWidth && w > maxWidth) {
    h = Math.round((h * maxWidth) / w);
    w = maxWidth;
  }
  const type = format === "auto" ? (file.type === "image/png" || file.type === "image/webp" ? file.type : "image/jpeg") : `image/${format}`;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Your browser could not create a canvas.");
  if (type === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
  }
  ctx.drawImage(img, 0, 0, w, h);
  let blob = await canvasToBlob(canvas, type, quality / 100);
  // Some browsers can't encode WebP and silently fall back to PNG.
  const actual = blob.type || type;
  if (blob.size >= file.size && actual === file.type && !resized) {
    return { blob: file, ext: EXT[file.type] ?? "img", width: w, height: h, kept: true };
  }
  return { blob, ext: EXT[actual] ?? "img", width: w, height: h, kept: false };
}

export default function ImageCompressor() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [results, setResults] = useState<Record<string, Result>>({});
  const [quality, setQuality] = useState(75);
  const [format, setFormat] = useState<Format>("auto");
  const [maxWidth, setMaxWidth] = useState("");
  const previews = useRef<string[]>([]);

  useEffect(() => () => previews.current.forEach(URL.revokeObjectURL), []);

  useEffect(() => {
    let cancelled = false;
    const mw = Number(maxWidth) > 0 ? Number(maxWidth) : null;
    (async () => {
      await new Promise((r) => setTimeout(r, 250)); // debounce slider drags
      for (const e of entries) {
        if (cancelled) return;
        try {
          const r = await compress(e.file, quality, format, mw);
          if (!cancelled) setResults((p) => ({ ...p, [e.id]: r }));
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Compression failed.";
          if (!cancelled) setResults((p) => ({ ...p, [e.id]: { blob: e.file, ext: "", width: 0, height: 0, kept: true, error: msg } }));
        }
      }
    })();
    return () => { cancelled = true; };
  }, [entries, quality, format, maxWidth]);

  function add(files: File[]) {
    const next = files
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => {
        const preview = URL.createObjectURL(file);
        previews.current.push(preview);
        return { id: uid(), file, preview };
      });
    setEntries((p) => [...p, ...next]);
  }

  const done = entries.map((e) => results[e.id]).filter((r): r is Result => Boolean(r) && !r.error);
  const before = entries.filter((e) => results[e.id] && !results[e.id].error).reduce((s, e) => s + e.file.size, 0);
  const after = done.reduce((s, r) => s + r.blob.size, 0);
  const saved = before > 0 ? Math.max(0, Math.round((1 - after / before) * 100)) : 0;
  const hasPng = entries.some((e) => e.file.type === "image/png");

  async function downloadAll() {
    for (const e of entries) {
      const r = results[e.id];
      if (r && !r.error) {
        downloadBlob(r.blob, `${baseName(e.file.name)}-compressed.${r.ext}`);
        await new Promise((res) => setTimeout(res, 350));
      }
    }
  }

  return (
    <div>
      <FileDropzone accept="image/jpeg,image/png,image/webp" onFiles={add} title="Drop images here or tap to choose" hint="JPG, PNG or WebP" />

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label htmlFor="q" className="label">Quality: {quality}</label>
          <input id="q" type="range" min={10} max={100} step={5} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="h-11 w-full accent-brand-600" />
        </div>
        <div>
          <label htmlFor="fmt" className="label">Output format</label>
          <select id="fmt" className="input" value={format} onChange={(e) => setFormat(e.target.value as Format)}>
            <option value="auto">Same as original</option>
            <option value="webp">WebP (smallest)</option>
            <option value="jpeg">JPG</option>
          </select>
        </div>
        <div>
          <label htmlFor="mw" className="label">Max width (px, optional)</label>
          <input id="mw" className="input" inputMode="numeric" placeholder="e.g. 1600" value={maxWidth} onChange={(e) => setMaxWidth(e.target.value.replace(/\D/g, ""))} />
        </div>
      </div>
      {hasPng && format === "auto" && (
        <p className="mt-3 text-sm text-muted">PNG is lossless, so the quality slider does not change PNG files. Choose WebP or JPG, or set a max width, for bigger savings.</p>
      )}

      {entries.length > 0 && (
        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-semibold">
              {done.length > 0 ? `${formatBytes(before)} → ${formatBytes(after)} (${saved}% smaller)` : "Compressing…"}
            </p>
            <div className="flex gap-2">
              {done.length > 1 && <button type="button" className="btn-primary" onClick={downloadAll}>Download all</button>}
              <button type="button" className="btn-secondary" onClick={() => { previews.current.forEach(URL.revokeObjectURL); previews.current = []; setEntries([]); setResults({}); }}>Clear</button>
            </div>
          </div>
          <ul className="mt-4 divide-y divide-line rounded-xl border border-line">
            {entries.map((e) => {
              const r = results[e.id];
              const pct = r && !r.error ? Math.round((1 - r.blob.size / e.file.size) * 100) : 0;
              return (
                <li key={e.id} className="flex flex-wrap items-center gap-3 p-3 sm:flex-nowrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={e.preview} alt="" className="h-14 w-14 shrink-0 rounded-lg border border-line object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{e.file.name}</p>
                    <p className={`text-xs ${r?.error ? "text-red-600" : "text-muted"}`}>
                      {!r ? "Working…" : r.error ? r.error : r.kept ? `${formatBytes(e.file.size)}. Already well optimized at these settings.` : `${formatBytes(e.file.size)} → ${formatBytes(r.blob.size)} (${pct >= 0 ? `${pct}% smaller` : `${Math.abs(pct)}% larger`}) · ${r.width}×${r.height}`}
                    </p>
                  </div>
                  {r && !r.error && (
                    <button type="button" className="btn-secondary w-full sm:w-auto" onClick={() => downloadBlob(r.blob, `${baseName(e.file.name)}-compressed.${r.ext}`)}>Download</button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
