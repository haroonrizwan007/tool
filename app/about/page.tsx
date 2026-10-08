import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `About ${siteConfig.name}`,
  description: `${siteConfig.name} builds fast, free online tools that run in your browser, so your files and text stay private.`,
  path: "/about",
});

export default function About() {
  return (
    <PageShell crumb="About" title={`About ${siteConfig.name}`} lead="Small, fast tools that do one job well and keep your data on your device.">
      <p>{siteConfig.name} is a collection of everyday utilities: a JPG to PNG converter, an image compressor, a word counter, age and BMI calculators, a YouTube thumbnail downloader and a QR code generator. We built it because most online tools ask you to upload files, create an account or wait through slow pages for something that takes a second.</p>
      <h2>How we work</h2>
      <ul>
        <li><strong>Local first.</strong> Image tools process files in your browser. We have no upload server and no database.</li>
        <li><strong>Plain and fast.</strong> Each page loads only the code it needs, and layouts are designed for phones first.</li>
        <li><strong>Honest about ads.</strong> The site is free because it shows advertising. Ads are labeled and kept away from the tools themselves.</li>
      </ul>
      <h2>Get in touch</h2>
      <p>Found a bug or want a tool added? Visit the <Link href="/contact">contact page</Link> or email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p>
    </PageShell>
  );
}
