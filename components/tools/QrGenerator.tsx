"use client";

import { useEffect, useRef, useState } from "react";
import { canvasToBlob, downloadBlob } from "@/lib/utils";

type Ecc = "L" | "M" | "Q" | "H";
type QR = { addData(s: string): void; make(): void; getModuleCount(): number; isDark(r: number, c: number): boolean };
type Factory = ((type: number, ecc: Ecc) => QR) & { stringToBytes?: (s: string) => number[]; stringToBytesFuncs?: Record<string, (s: string) => number[]> };

const QUIET = 4;

export default function QrGenerator() {
  const [text, setText] = useState("https://www.example.com");
  const [size, setSize] = useState(512);
  const [fg, setFg] = useState("#0b1b3a");
  const [bg, setBg] = useState("#ffffff");
  const [ecc, setEcc] = useState<Ecc>("M");
  const [error, setError] = useState("");
  const [matrix, setMatrix] = useState<boolean[][] | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Build the module matrix (library is loaded on demand to keep the first load light)
  useEffect(() => {
    let cancelled = false;
    if (!text.trim()) {
      setMatrix(null);
      setError("");
      return;
    }
    import("qrcode-generator")
      .then((mod) => {
        if (cancelled) return;
        const factory = ((mod as unknown as { default?: Factory }).default ?? (mod as unknown as Factory)) as Factory;
        if (factory.stringToBytesFuncs?.["UTF-8"]) factory.stringToBytes = factory.stringToBytesFuncs["UTF-8"];
        try {
          const qr = factory(0, ecc);
          qr.addData(text);
          qr.make();
          const n = qr.getModuleCount();
          setMatrix(Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => qr.isDark(r, c))));
          setError("");
        } catch {
          setMatrix(null);
          setError("That text is too long for a QR code at this error-correction level. Shorten it or choose a lower level.");
        }
      })
      .catch(() => setError("The QR engine failed to load. Check your connection and reload the page."));
    return () => { cancelled = true; };
  }, [text, ecc]);

  // Paint canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !matrix) return;
    const n = matrix.length;
    const total = n + QUIET * 2;
    const scale = Math.max(1, Math.floor(size / total));
    canvas.width = canvas.height = scale * total;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = fg;
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (matrix[r][c]) ctx.fillRect((c + QUIET) * scale, (r + QUIET) * scale, scale, scale);
  }, [matrix, size, fg, bg]);

  async function downloadPng() {
    if (canvasRef.current) downloadBlob(await canvasToBlob(canvasRef.current, "image/png"), "qr-code.png");
  }

  function downloadSvg() {
    if (!matrix) return;
    const n = matrix.length;
    const total = n + QUIET * 2;
    let d = "";
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (matrix[r][c]) d += `M${c + QUIET} ${r + QUIET}h1v1h-1z`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="${size}" height="${size}" shape-rendering="crispEdges"><rect width="${total}" height="${total}" fill="${bg}"/><path d="${d}" fill="${fg}"/></svg>`;
    downloadBlob(new Blob([svg], { type: "image/svg+xml" }), "qr-code.svg");
  }

  const lum = (hex: string) => {
    const v = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  };
  const contrast = (lum(fg) > lum(bg) ? lum(fg) + 0.05 : lum(bg) + 0.05) / (lum(fg) > lum(bg) ? lum(bg) + 0.05 : lum(fg) + 0.05);
  const inverted = lum(fg) > lum(bg);

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_minmax(0,18rem)]">
      <div className="space-y-5">
        <div>
          <label htmlFor="qr-text" className="label">Link or text</label>
          <textarea id="qr-text" className="input min-h-28 py-3" value={text} onChange={(e) => setText(e.target.value)} placeholder="https://" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="qr-size" className="label">Size: {size}px</label>
            <input id="qr-size" type="range" min={200} max={1200} step={50} value={size} onChange={(e) => setSize(Number(e.target.value))} className="h-11 w-full accent-brand-600" />
          </div>
          <div>
            <label htmlFor="qr-ecc" className="label">Error correction</label>
            <select id="qr-ecc" className="input" value={ecc} onChange={(e) => setEcc(e.target.value as Ecc)}>
              <option value="L">Low (7%)</option>
              <option value="M">Medium (15%)</option>
              <option value="Q">Quartile (25%)</option>
              <option value="H">High (30%)</option>
            </select>
          </div>
          <div>
            <label htmlFor="qr-fg" className="label">Foreground color</label>
            <input id="qr-fg" type="color" className="input p-1.5" value={fg} onChange={(e) => setFg(e.target.value)} />
          </div>
          <div>
            <label htmlFor="qr-bg" className="label">Background color</label>
            <input id="qr-bg" type="color" className="input p-1.5" value={bg} onChange={(e) => setBg(e.target.value)} />
          </div>
        </div>
        {(contrast < 4 || inverted) && (
          <p role="status" className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {inverted ? "A light code on a dark background fails to scan on many phones. Use a darker foreground." : "Low contrast. This code may not scan reliably."}
          </p>
        )}
        {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      </div>

      <div className="flex flex-col items-center">
        <div className="flex aspect-square w-full max-w-72 items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface p-3">
          {matrix ? <canvas ref={canvasRef} className="h-auto w-full" role="img" aria-label="Generated QR code" style={{ imageRendering: "pixelated" }} /> : <p className="px-4 text-center text-sm text-muted">Your QR code appears here.</p>}
        </div>
        <div className="mt-4 grid w-full max-w-72 grid-cols-2 gap-2">
          <button type="button" className="btn-primary" onClick={downloadPng} disabled={!matrix}>PNG</button>
          <button type="button" className="btn-secondary" onClick={downloadSvg} disabled={!matrix}>SVG</button>
        </div>
      </div>
    </div>
  );
}
