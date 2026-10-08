"use client";

import { useMemo, useState } from "react";
import { analyzeText, formatMinutes } from "@/lib/text-stats";
import { Stat } from "./shared";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const s = useMemo(() => analyzeText(text), [text]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div>
      <label htmlFor="wc-text" className="label">Your text</label>
      <textarea
        id="wc-text"
        className="input min-h-56 resize-y py-3 leading-7 sm:min-h-72"
        placeholder="Start typing or paste your text here…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="btn-secondary" onClick={copy} disabled={!text}>{copied ? "Copied" : "Copy text"}</button>
        <button type="button" className="btn-secondary" onClick={() => setText("")} disabled={!text}>Clear</button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4" aria-live="polite">
        <Stat label="Words" value={s.words.toLocaleString()} />
        <Stat label="Characters" value={s.characters.toLocaleString()} />
        <Stat label="Without spaces" value={s.charactersNoSpaces.toLocaleString()} />
        <Stat label="Sentences" value={s.sentences.toLocaleString()} />
        <Stat label="Paragraphs" value={s.paragraphs.toLocaleString()} />
        <Stat label="Reading time" value={formatMinutes(s.readingMinutes)} />
        <Stat label="Speaking time" value={formatMinutes(s.speakingMinutes)} />
      </div>

      <div className="mt-6">
        <h3 className="text-base">Most repeated words</h3>
        {s.keywords.length === 0 ? (
          <p className="mt-2 text-sm text-muted">Words used more than once will appear here.</p>
        ) : (
          <ul className="mt-3 flex flex-wrap gap-2">
            {s.keywords.map((k) => (
              <li key={k.word} className="chip">{k.word} · {k.count} ({k.percent.toFixed(1)}%)</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
