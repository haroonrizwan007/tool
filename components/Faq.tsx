import JsonLd from "@/components/JsonLd";
import type { Faq } from "@/data/tools";

export default function FaqSection({ faqs, title = "Frequently asked questions" }: { faqs: Faq[]; title?: string }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section aria-labelledby="faq-title" className="my-10">
      <JsonLd data={ld} />
      <h2 id="faq-title" className="text-2xl">{title}</h2>
      <div className="mt-5 divide-y divide-line rounded-2xl border border-line bg-white">
        {faqs.map((f) => (
          <details key={f.q} className="group px-5 py-4">
            <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
              {f.q}
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-brand-600 transition-transform group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
            </summary>
            <p className="mt-3 max-w-[68ch] leading-7 text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
