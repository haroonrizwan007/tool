import Link from "next/link";
import AdSlot from "@/components/ads/AdSlot";
import { siteConfig } from "@/config/site";
import { tools } from "@/data/tools";

const legal = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
];
const company = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const social = Object.entries(siteConfig.social).filter(([, url]) => url);
  return (
    <>
      <div className="container-x">
        <AdSlot slot="footerBanner" />
      </div>
      <footer className="mt-16 border-t border-line bg-surface">
        <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold">{siteConfig.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted">{siteConfig.tagline}. No sign-up, no uploads, no watermarks.</p>
            {social.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-3 text-sm">
                {social.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} rel="noopener noreferrer me" target="_blank" className="capitalize text-muted hover:text-brand-600">{name}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="sm:col-span-1 lg:col-span-2">
            <p className="text-sm font-semibold">Tools</p>
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {tools.map((t) => (
                <li key={t.slug}><Link href={`/${t.slug}`} className="text-muted hover:text-brand-600">{t.name}</Link></li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:block sm:space-y-6">
            <div>
              <p className="text-sm font-semibold">Company</p>
              <ul className="mt-3 space-y-2 text-sm">
                {company.map((l) => <li key={l.href}><Link href={l.href} className="text-muted hover:text-brand-600">{l.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Legal</p>
              <ul className="mt-3 space-y-2 text-sm">
                {legal.map((l) => <li key={l.href}><Link href={l.href} className="text-muted hover:text-brand-600">{l.label}</Link></li>)}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-line">
          <p className="container-x py-5 text-xs text-muted">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
