/**
 * ADSTERRA AD SLOTS: paste each ad code ONCE here.
 *
 * - Paste the full snippet Adsterra gives you (the <script> tags) between the backticks.
 * - Every placement on the site that uses a slot updates automatically.
 * - An empty string means that slot renders NOTHING (no space, no placeholder).
 *
 * Where each slot appears:
 *   homepageTop     Home: below the hero
 *   homepageMiddle  Home: between the tools and the features section
 *   homepageBottom  Home: before the blog section
 *   toolTop         Tool pages: below the introduction
 *   toolMiddle      Tool pages: below the tool interface
 *   toolBottom      Tool pages: before the FAQ and before related tools (also blog posts)
 *   sidebar         Desktop sticky sidebar (tool pages and blog posts)
 *   footerBanner    Every page: just before the footer
 */
export const ADS = {
  homepageTop: ``,
  homepageMiddle: ``,
  homepageBottom: ``,
  toolTop: ``,
  toolMiddle: ``,
  toolBottom: ``,
  sidebar: ``,
  footerBanner: ``,
};

export type AdSlotName = keyof typeof ADS;
