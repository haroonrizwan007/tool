import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/data/tools";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "All Free Online Tools",
  description: "Browse every free tool: JPG to PNG converter, image compressor, word counter, age calculator, BMI calculator, YouTube thumbnail downloader and QR code generator.",
  path: "/tools",
});

const order = ["Image", "Text", "Calculator", "Web"] as const;

export default function ToolsPage() {
  return (
    <div className="container-x py-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Tools" }]} />
      <h1 className="text-3xl sm:text-4xl">All tools</h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-muted">Seven free tools, no account needed. Image tools run entirely in your browser.</p>
      {order.map((cat) => {
        const list = tools.filter((t) => t.category === cat);
        if (!list.length) return null;
        return (
          <section key={cat} className="mt-10" aria-labelledby={`cat-${cat}`}>
            <h2 id={`cat-${cat}`} className="text-xl">{cat === "Web" ? "Web & links" : cat === "Calculator" ? "Calculators" : `${cat} tools`}</h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
          </section>
        );
      })}
    </div>
  );
}
