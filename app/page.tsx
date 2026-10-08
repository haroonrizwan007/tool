import Link from "next/link";
import AdSlot from "@/components/ads/AdSlot";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import ToolCard from "@/components/ToolCard";
import { siteConfig } from "@/config/site";
import { tools } from "@/data/tools";
import { formatDate, getAllPosts } from "@/lib/blog";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({ title: siteConfig.seo.defaultTitle, description: siteConfig.seo.defaultDescription, path: "/" }),
  title: { absolute: siteConfig.seo.defaultTitle },
};

const homeFaqs = [
  { q: "Are the tools really free?", a: "Yes. Every tool is free to use with no account, no trial and no watermark. The site is supported by advertising." },
  { q: "Are my files uploaded to a server?", a: "No. Image tools use your browser's own processing, so your files stay on your device." },
  { q: "Do the tools work on my phone?", a: "Yes. The whole site is built mobile-first with large touch targets and works in any modern browser." },
  { q: "Do I need to install anything?", a: "No. Open a tool, use it and close the tab. Nothing is installed." },
];

const why = [
  { t: "Private by design", d: "Image and text processing happens inside your browser tab. There is no upload step, so there is nothing to leak." },
  { t: "Fast on any device", d: "Each tool loads only its own code. Pages are pre-built and light, so they open quickly even on mobile data." },
  { t: "No friction", d: "No sign-up, no email gate, no daily limits. Open the tool and finish the job." },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const ld = [
    { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.domain, description: siteConfig.seo.defaultDescription },
    { "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: siteConfig.domain, logo: absoluteUrl(siteConfig.logo.src || "/logo.svg"), sameAs: Object.values(siteConfig.social).filter(Boolean) },
  ];

  return (
    <>
      <JsonLd data={ld} />
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-brand-50/70 to-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(#dce7ff_1px,transparent_1px),linear-gradient(90deg,#dce7ff_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="container-x relative py-14 sm:py-20">
          <h1 className="max-w-3xl text-4xl leading-[1.08] sm:text-6xl">Everyday tools that never leave your browser.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            Convert and compress images, count words, work out your age or BMI, grab a YouTube thumbnail or make a QR code. Free, private and ready in one tap.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/tools" className="btn-primary">Browse all tools</Link>
            <Link href="/jpg-to-png" className="btn-secondary">Convert JPG to PNG</Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {["No sign-up", "No uploads", "No watermark", "Works on mobile"].map((x) => <li key={x} className="chip">{x}</li>)}
          </ul>
        </div>
      </section>

      <div className="container-x">
        <AdSlot slot="homepageTop" />

        <section className="py-10" aria-labelledby="tools-h">
          <h2 id="tools-h" className="text-2xl sm:text-3xl">Pick a tool</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((t) => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </section>

        <AdSlot slot="homepageMiddle" />

        <section className="py-10" aria-labelledby="why-h">
          <h2 id="why-h" className="text-2xl sm:text-3xl">Built to get out of your way</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {why.map((w) => (
              <div key={w.t} className="rounded-2xl bg-surface p-6">
                <h3 className="text-lg">{w.t}</h3>
                <p className="mt-2 leading-7 text-muted">{w.d}</p>
              </div>
            ))}
          </div>
        </section>

        <Faq faqs={homeFaqs} title="Quick answers" />

        <AdSlot slot="homepageBottom" />

        {posts.length > 0 && (
          <section className="py-10" aria-labelledby="blog-h">
            <div className="flex items-end justify-between gap-4">
              <h2 id="blog-h" className="text-2xl sm:text-3xl">From the blog</h2>
              <Link href="/blog" className="text-sm font-semibold text-brand-600">All articles</Link>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="card group flex flex-col p-6 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift">
                  <time dateTime={p.date} className="text-sm text-muted">{formatDate(p.date)}</time>
                  <h3 className="mt-2 text-lg group-hover:text-brand-600">{p.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{p.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
