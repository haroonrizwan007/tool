import PageShell from "@/components/layout/PageShell";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: `The terms that apply when you use ${siteConfig.name} and its free online tools.`,
  path: "/terms",
});

export default function Terms() {
  return (
    <PageShell crumb="Terms" title="Terms of Use" lead={`Last updated ${siteConfig.legalUpdated}`}>
      <p>By using {siteConfig.name} you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2>Use of the tools</h2>
      <p>You may use the tools for personal and commercial purposes. You must not use them for anything unlawful, to infringe someone else&apos;s rights, or to disrupt or overload the site.</p>
      <h2>Your content</h2>
      <p>You keep all rights to the files and text you process. Because processing happens in your browser, we do not receive or store your content. You are responsible for having the right to use any image, link or text you work with, including YouTube thumbnails, which belong to their creators.</p>
      <h2>No warranty</h2>
      <p>The tools are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind. We do not guarantee that results are error-free, that output will meet your needs or that the site will always be available.</p>
      <h2>Limitation of liability</h2>
      <p>To the fullest extent permitted by law, {siteConfig.name} is not liable for any indirect, incidental or consequential damages, or for loss of data or profits, arising from your use of the site. Keep a copy of your original files before converting or compressing them.</p>
      <h2>Advertising and third-party links</h2>
      <p>The site displays third-party advertisements and may link to other websites. We are not responsible for their content or practices.</p>
      <h2>Changes</h2>
      <p>We may change these terms or the tools at any time. Continued use after a change means you accept the updated terms.</p>
      <h2>Contact</h2>
      <p>Questions? Email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p>
    </PageShell>
  );
}
