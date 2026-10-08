import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { siteConfig } from "@/config/site";
import { formatDate, getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog: Guides on Images, QR Codes and Everyday Tools",
  description: `Practical guides from ${siteConfig.name} on image formats, compression, QR codes and getting more from free online tools.`,
  path: "/blog",
});

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div className="container-x py-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Blog" }]} />
      <h1 className="text-3xl sm:text-4xl">Blog</h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-muted">Short, practical guides to help you get the most out of every tool.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="card group flex flex-col p-6 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift">
            <time dateTime={p.date} className="text-sm text-muted">{formatDate(p.date)} · {p.readingMinutes} min read</time>
            <h2 className="mt-2 text-xl group-hover:text-brand-600">{p.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-muted">{p.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
