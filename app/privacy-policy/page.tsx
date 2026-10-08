import PageShell from "@/components/layout/PageShell";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles your data: files stay in your browser, and we explain cookies and third-party advertising.`,
  path: "/privacy-policy",
});

export default function Privacy() {
  return (
    <PageShell crumb="Privacy Policy" title="Privacy Policy" lead={`Last updated ${siteConfig.legalUpdated}`}>
      <p>This policy explains what information {siteConfig.name} (&quot;we&quot;, &quot;us&quot;) handles when you use {siteConfig.domain}.</p>
      <h2>Your files and text</h2>
      <p>Our tools run in your browser. Images you add, text you type and values you enter are processed on your device. They are not uploaded to our servers, and we do not store or have access to them.</p>
      <h2>Information we do not collect</h2>
      <p>We do not require accounts and we do not ask for your name, email address or payment details to use any tool. If you contact us by email, we receive the information you choose to send and use it only to reply.</p>
      <h2>YouTube thumbnails</h2>
      <p>When you use the YouTube Thumbnail Downloader, your browser loads thumbnail images directly from YouTube&apos;s image servers. Those requests are subject to Google&apos;s privacy policy.</p>
      <h2>Cookies and advertising</h2>
      <p>We display advertising provided by third-party networks such as Adsterra. These partners may use cookies, device identifiers and similar technologies to show ads, limit how often you see them and measure performance. They may collect technical data such as your IP address, browser type and the pages you visit. We do not control these technologies; please review the privacy policies of our advertising partners for details.</p>
      <p>You can control cookies in your browser settings, and you can use browser or device settings to limit ad personalization. Where required by law, we ask for your consent before ad cookies are set.</p>
      <h2>Log data</h2>
      <p>Our hosting provider may keep standard server logs (such as IP address, request time and user agent) for security and reliability.</p>
      <h2>Children</h2>
      <p>Our site is not directed to children under 13, and we do not knowingly collect personal information from them.</p>
      <h2>Changes</h2>
      <p>We may update this policy and will change the date above when we do.</p>
      <h2>Contact</h2>
      <p>Questions about this policy? Email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p>
    </PageShell>
  );
}
