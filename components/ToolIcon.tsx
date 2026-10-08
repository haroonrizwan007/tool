const paths: Record<string, React.ReactNode> = {
  "jpg-to-png": (<><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></>),
  "image-compressor": <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />,
  "word-counter": <path d="M4 6h16M4 12h16M4 18h10" />,
  "age-calculator": (<><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /></>),
  "bmi-calculator": <path d="M3 12h4l3-8 4 16 3-8h4" />,
  "youtube-thumbnail-downloader": (<><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3z" /></>),
  "qr-code-generator": (<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20h1" /></>),
};

export default function ToolIcon({ slug, className = "h-6 w-6" }: { slug: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[slug] ?? <circle cx="12" cy="12" r="9" />}
    </svg>
  );
}
