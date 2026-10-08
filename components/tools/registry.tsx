import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/**
 * Maps a tool slug (data/tools.ts) to its interactive component.
 * Each component is code-split, so a visitor only downloads the tool they open.
 * To add a tool: create the component, add one line here and one entry in data/tools.ts.
 */
const Loading = () => <div className="h-64 animate-pulse rounded-xl bg-surface" aria-hidden="true" />;

export const toolComponents: Record<string, ComponentType> = {
  "jpg-to-png": dynamic(() => import("./JpgToPng"), { loading: Loading }),
  "image-compressor": dynamic(() => import("./ImageCompressor"), { loading: Loading }),
  "word-counter": dynamic(() => import("./WordCounter"), { loading: Loading }),
  "age-calculator": dynamic(() => import("./AgeCalculator"), { loading: Loading }),
  "bmi-calculator": dynamic(() => import("./BmiCalculator"), { loading: Loading }),
  "youtube-thumbnail-downloader": dynamic(() => import("./YoutubeThumbnail"), { loading: Loading }),
  "qr-code-generator": dynamic(() => import("./QrGenerator"), { loading: Loading }),
};
