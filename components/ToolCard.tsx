import Link from "next/link";
import ToolIcon from "@/components/ToolIcon";
import type { Tool } from "@/data/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="card group flex h-full flex-col p-5 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <ToolIcon slug={tool.slug} />
      </span>
      <h3 className="mt-4 text-lg">{tool.name}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-6 text-muted">{tool.short}</p>
      <span className="mt-4 text-sm font-semibold text-brand-600">Open tool</span>
    </Link>
  );
}
