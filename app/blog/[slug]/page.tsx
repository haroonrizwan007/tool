import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/ads/AdSlot";
import JsonLd from "@/components/JsonLd";
import Markdown from "@/components/Markdown";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import { siteConfig } from "@/config/site";
import { getTool } from "@/data/tools";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { hasAd } from "@/lib/ads";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => getAllPosts().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.description, path: `/blog/${post.slug}`, type: "article", publishedTime: post.date, keywords: post.tags });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const tools = post.tools.map(getTool).filter((t) => t !== undefined);
  const sidebar = hasAd("sidebar");

  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name, logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logo.src || "/logo.svg") } },
    image: absoluteUrl("/opengraph-image"),
  };

  return (
    <div className="container-x py-8 sm:py-12">
      <JsonLd data={ld} />
      <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: post.title }]} />
      <div className={sidebar ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]" : ""}>
        <article className="min-w-0">
          <h1 className="max-w-3xl text-3xl sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
          </p>
          <div className="prose-content mt-8"><Markdown source={post.content} /></div>
          <AdSlot slot="toolBottom" />
          {tools.length > 0 && (
            <section className="mt-10" aria-labelledby="try">
              <h2 id="try" className="text-2xl">Try the tools</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">{tools.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
            </section>
          )}
          <p className="mt-10 text-sm"><Link href="/blog" className="font-semibold text-brand-600">All articles</Link></p>
        </article>
        {sidebar && (
          <aside className="hidden lg:block" aria-label="Sponsored">
            <div className="sticky top-24"><AdSlot slot="sidebar" /></div>
          </aside>
        )}
      </div>
    </div>
  );
}
