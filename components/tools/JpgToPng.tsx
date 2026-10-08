"use client";

import { useEffect, useRef, useState } from "react";
import { baseName, canvasToBlob, downloadBlob, formatBytes, loadImage, uid } from "@/lib/utils";
import { FileDropzone } from "./shared";

type Item = { id: string; name: string; inSize: number; outName?: string; blob?: Blob; preview?: string; error?: string };

export default function JpgToPng() {
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const urls = useRef<string[]>([]);

  useEffect(() => () => urls.current.forEach(URL.revokeObjectURL), []);

  async function handle(files: File[]) {
    setBusy(true);
    for (const file of files) {
      const id = uid();
      if (!file.type.startsWith("image/")) {
        setItems((p) => [...p, { id, name: file.name, inSize: file.size, error: "Not an image file." }]);
        continue;
      }
      try {
        const img = await loadImage(file);
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Your browser could not create a canvas.");
        ctx.drawImage(img, 0, 0);
        const blob = await canvasToBlob(canvas, "image/png");
        const preview = URL.createObjectURL(blob);
        urls.current.push(preview);
        setItems((p) => [...p, { id, name: file.name, inSize: file.size, outName: `${baseName(file.name)}.png`, blob, preview }]);
      } catch (e) {
        setItems((p) => [...p, { id, name: file.name, inSize: file.size, error: e instanceof Error ? e.message : "Conversion failed." }]);
      }
    }
    setBusy(false);
  }

  async function downloadAll() {
    for (const it of items) {
      if (it.blob && it.outName) {
        downloadBlob(it.blob, it.outName);
        await new Promise((r) => setTimeout(r, 350));
      }
    }
  }

  const done = items.filter((i) => i.blob);

  return (
    <div>
      <FileDropzone accept="image/jpeg,image/*,.jpg,.jpeg,.jfif" onFiles={handle} title="Drop JPG images here or tap to choose" hint="Many files at once are fine" />
      {busy && <p role="status" className="mt-4 text-sm text-muted">Converting…</p>}

      {items.length > 0 && (
        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-semibold">{done.length} converted</p>
            <div className="flex gap-2">
              {done.length > 1 && <button type="button" className="btn-primary" onClick={downloadAll}>Download all</button>}
              <button type="button" className="btn-secondary" onClick={() => { urls.current.forEach(URL.revokeObjectURL); urls.current = []; setItems([]); }}>Clear</button>
            </div>
          </div>
          <ul className="mt-4 divide-y divide-line rounded-xl border border-line">
            {items.map((it) => (
              <li key={it.id} className="flex flex-wrap items-center gap-3 p-3 sm:flex-nowrap">
                {it.preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.preview} alt="" className="h-14 w-14 shrink-0 rounded-lg border border-line object-cover" />
                ) : (
                  <div className="h-14 w-14 shrink-0 rounded-lg bg-surface" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{it.outName ?? it.name}</p>
                  <p className={`text-xs ${it.error ? "text-red-600" : "text-muted"}`}>
                    {it.error ?? `${formatBytes(it.inSize)} JPG → ${formatBytes(it.blob?.size ?? 0)} PNG`}
                  </p>
                </div>
                {it.blob && it.outName && (
                  <button type="button" className="btn-secondary w-full sm:w-auto" onClick={() => downloadBlob(it.blob!, it.outName!)}>Download PNG</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
