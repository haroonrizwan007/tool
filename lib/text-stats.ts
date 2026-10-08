const STOP = new Set(
  "a about after all also am an and any are as at be been but by can could did do does for from had has have he her his how i if in into is it its just may me more my no not of on or our out she so some than that the their them then there these they this to up us was we were what when which who will with would you your".split(" ")
);

export type TextStats = {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingMinutes: number;
  speakingMinutes: number;
  keywords: { word: string; count: number; percent: number }[];
};

export function analyzeText(text: string): TextStats {
  const words = text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? [];
  const sentences = text.split(/[.!?…]+(?:\s|$)/).filter((s) => /[\p{L}\p{N}]/u.test(s)).length;
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length;
  const freq = new Map<string, number>();
  for (const w of words) {
    const k = w.toLowerCase();
    if (k.length > 2 && !STOP.has(k) && !/^\d+$/.test(k)) freq.set(k, (freq.get(k) ?? 0) + 1);
  }
  const keywords = [...freq.entries()]
    .filter(([, c]) => c > 1)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([word, count]) => ({ word, count, percent: words.length ? (count / words.length) * 100 : 0 }));
  return {
    words: words.length,
    characters: [...text].length,
    charactersNoSpaces: [...text.replace(/\s/g, "")].length,
    sentences,
    paragraphs,
    readingMinutes: words.length / 238,
    speakingMinutes: words.length / 150,
    keywords,
  };
}

export function formatMinutes(min: number): string {
  if (min <= 0) return "0 sec";
  if (min < 1) return `${Math.max(1, Math.round(min * 60))} sec`;
  const m = Math.floor(min);
  const s = Math.round((min - m) * 60);
  return s ? `${m} min ${s} sec` : `${m} min`;
}
