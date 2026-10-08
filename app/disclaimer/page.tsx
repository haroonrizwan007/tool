import PageShell from "@/components/layout/PageShell";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Disclaimer",
  description: `Important notes about the accuracy and intended use of ${siteConfig.name} tools, including the BMI calculator.`,
  path: "/disclaimer",
});

export default function Disclaimer() {
  return (
    <PageShell crumb="Disclaimer" title="Disclaimer" lead={`Last updated ${siteConfig.legalUpdated}`}>
      <h2>General information only</h2>
      <p>The tools and articles on {siteConfig.name} are provided for general information and convenience. We work to keep results accurate, but we make no guarantee that they are complete, current or suitable for your particular purpose.</p>
      <h2>Health tools</h2>
      <p>The BMI calculator is a screening estimate based on height and weight. It does not measure body fat, muscle or overall health and is not designed for children, pregnant women or competitive athletes. It is not medical advice. Talk to a qualified healthcare professional about your health or weight.</p>
      <h2>Date and age calculations</h2>
      <p>Age results are calculated from the dates you enter using the Gregorian calendar. Do not rely on them for legal, immigration or official purposes without checking against official records.</p>
      <h2>Images and copyright</h2>
      <p>You are responsible for making sure you have the right to convert, compress or download any image. YouTube thumbnails belong to the video creators, and {siteConfig.name} is not affiliated with or endorsed by YouTube or Google.</p>
      <h2>Advertising</h2>
      <p>Ads shown on this site are served by third parties. Their appearance is not an endorsement of any product or service.</p>
      <h2>Contact</h2>
      <p>Questions about this disclaimer? Email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p>
    </PageShell>
  );
}
