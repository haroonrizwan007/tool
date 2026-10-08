const ID = /^[\w-]{11}$/;

export function extractVideoId(input: string): string | null {
  const s = input.trim();
  if (!s) return null;
  if (ID.test(s)) return s;
  try {
    const u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
    const host = u.hostname.replace(/^(www|m|music)\./, "");
    let id: string | null | undefined = null;
    if (host === "youtu.be") {
      id = u.pathname.slice(1).split("/")[0];
    } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
      if (u.pathname === "/watch") id = u.searchParams.get("v");
      else id = /^\/(?:shorts|embed|live|v)\/([\w-]{11})/.exec(u.pathname)?.[1];
    }
    return id && ID.test(id) ? id : null;
  } catch {
    return null;
  }
}

export const THUMB_SIZES = [
  { key: "maxresdefault", label: "Maximum resolution", dims: "1280 × 720" },
  { key: "sddefault", label: "Standard", dims: "640 × 480" },
  { key: "hqdefault", label: "High quality", dims: "480 × 360" },
  { key: "mqdefault", label: "Medium", dims: "320 × 180" },
  { key: "default", label: "Small", dims: "120 × 90" },
] as const;

export const thumbUrl = (id: string, key: string) => `https://i.ytimg.com/vi/${id}/${key}.jpg`;
