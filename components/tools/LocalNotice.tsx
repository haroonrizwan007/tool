export default function LocalNotice() {
  return (
    <p className="mt-5 flex items-start gap-2.5 rounded-xl bg-brand-50 px-4 py-3 text-sm leading-6 text-brand-900">
      <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
      <span>Your files are processed locally in your browser and are not uploaded to our servers.</span>
    </p>
  );
}
