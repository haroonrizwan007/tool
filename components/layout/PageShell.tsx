import type { ReactNode } from "react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export default function PageShell({ title, lead, crumb, children }: { title: string; lead?: string; crumb: string; children: ReactNode }) {
  return (
    <div className="container-x py-8 sm:py-12">
      <Breadcrumbs items={[{ name: crumb }]} />
      <h1 className="text-3xl sm:text-4xl">{title}</h1>
      {lead && <p className="mt-3 max-w-2xl text-lg leading-8 text-muted">{lead}</p>}
      <div className="prose-content mt-8">{children}</div>
    </div>
  );
}
