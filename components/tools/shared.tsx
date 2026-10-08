"use client";

import { useRef, useState, type ReactNode } from "react";

export function FileDropzone({
  accept,
  onFiles,
  title,
  hint,
}: {
  accept: string;
  onFiles: (files: File[]) => void;
  title: string;
  hint: string;
}) {
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length) onFiles(files);
      }}
      className={`relative rounded-2xl border-2 border-dashed px-4 py-10 text-center transition-colors sm:py-14 ${over ? "border-brand-500 bg-brand-50" : "border-brand-200 bg-surface hover:border-brand-500"}`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        aria-label={title}
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length) onFiles(files);
          e.target.value = "";
        }}
      />
      <svg viewBox="0 0 24 24" className="mx-auto h-10 w-10 text-brand-600" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 16V4m0 0 4 4m-4-4L8 8M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      </svg>
      <p className="mt-3 text-base font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted">{hint}</p>
    </div>
  );
}

export function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-xl bg-surface px-4 py-3">
      <div className="text-2xl font-bold tabular-nums">{value}</div>
      <div className="text-sm text-muted">{label}</div>
    </div>
  );
}
