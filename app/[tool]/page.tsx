import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/ads/AdSlot";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import LocalNotice from "@/components/tools/LocalNotice";
import { toolComponents } from "@/components/tools/registry";
import { siteConfig } from "@/config/site";
import { getRelated, getTool, tools } from "@/data/tools";
import { hasAd } from "@/lib/ads";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";

export const dynamicParams = false;
export const generateStaticParams = () => tools.map((t) => ({ tool: t.slug }));

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return buildMetadata({ title: tool.title, description: tool.metaDescription, path: `/${tool.slug}`, keywords: tool.keywords });
}

export default async function ToolPage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool: slug } = await params;
  const tool = getTool(slug);
  const Tool = tool ? toolComponents[tool.slug] : undefined;
  if (!tool || !Tool) notFound();

  const related = getRelated(tool);
  const posts = getAllPosts().filter((p) => p.tools.includes(tool.slug)).slice(0, 2);
  const sidebar = hasAd("sidebar");

  const ld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.metaDescription,
    url: absoluteUrl(`/${tool.slug}`),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.domain },
  };

  return (
    <div className="container-x py-6 sm:py-10">
      <JsonLd data={ld} />
      <Breadcrumbs items={[{ name: "Tools", href: "/tools" }, { name: tool.name }]} />
      <div className={sidebar ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]" : ""}>
        <div className="min-w-0">
          <h1 className="text-3xl sm:text-4xl">{tool.h1}</h1>
          <p className="mt-3 max-w-2xl text-lg leading-8 text-muted">{tool.intro}</p>

          <AdSlot slot="toolTop" />

          <section aria-label={tool.name} className="card mt-6 p-4 sm:p-6">
            <Tool />
            {tool.local && <LocalNotice />}
          </section>

          <AdSlot slot="toolMiddle" />

          <section className="mt-10 grid gap-8 md:grid-cols-2" aria-label={`About ${tool.name}`}>
            <div>
              <h2 className="text-2xl">How to use it</h2>
              <ol className="mt-4 space-y-3">
                {tool.steps.map((s, i) => (
                  <li key={s} className="flex gap-3 leading-7">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="text-2xl">What you get</h2>
              <ul className="mt-4 space-y-3">
                {tool.features.map((f) => (
                  <li key={f} className="flex gap-3 leading-7">
                    <svg viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-brand-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 5 5L20 7" /></svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <AdSlot slot="toolBottom" />

          <Faq faqs={tool.faqs} />

          <AdSlot slot="toolBottom" />

          <section aria-labelledby="related" className="mt-10">
            <h2 id="related" className="text-2xl">Related tools</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((t) => <ToolCard key={t.slug} tool={t} />)}
            </div>
            {posts.length > 0 && (
              <p className="mt-6 text-sm text-muted">
                Further reading:{" "}
                {posts.map((p, i) => (
                  <span key={p.slug}>{i > 0 && ", "}<Link href={`/blog/${p.slug}`} className="font-medium text-brand-600 hover:underline">{p.title}</Link></span>
                ))}
              </p>
            )}
          </section>
        </div>

        {sidebar && (
          <aside className="hidden lg:block" aria-label="Sponsored">
            <div className="sticky top-24"><AdSlot slot="sidebar" /></div>
          </aside>
        )}
      </div>
    </div>
  );
}
