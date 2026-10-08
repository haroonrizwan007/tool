import ContactForm from "@/components/ContactForm";
import PageShell from "@/components/layout/PageShell";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `Contact ${siteConfig.name}`,
  description: `Questions, bug reports or tool requests? Contact the ${siteConfig.name} team by email.`,
  path: "/contact",
});

export default function Contact() {
  return (
    <PageShell crumb="Contact" title="Contact us" lead="Questions, bug reports and tool ideas are all welcome.">
      <p>Email us directly at <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>, or use the form below. We read every message and reply as soon as we can.</p>
      <ContactForm />
    </PageShell>
  );
}
