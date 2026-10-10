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
  homepageTop: `<script>
  atOptions = {
    'key' : '08e5f74382f8dfda0ef6fde2d51bd362',
    'format' : 'iframe',
    'height' : 300,
    'width' : 160,
    'params' : {}
  };
</script>
<script src="https://bicea.org/22/08e5f74382f8dfda0ef6fde2d51bd362"></script>`,
  homepageMiddle: `<script>
  atOptions = {
    'key' : '08e5f74382f8dfda0ef6fde2d51bd362',
    'format' : 'iframe',
    'height' : 300,
    'width' : 160,
    'params' : {}
  };
</script>
<script src="https://bicea.org/22/08e5f74382f8dfda0ef6fde2d51bd362"></script>`,
  homepageBottom: `<script>
  atOptions = {
    'key' : '08e5f74382f8dfda0ef6fde2d51bd362',
    'format' : 'iframe',
    'height' : 300,
    'width' : 160,
    'params' : {}
  };
</script>
<script src="https://bicea.org/22/08e5f74382f8dfda0ef6fde2d51bd362"></script>`,
  toolTop: `<script>
  atOptions = {
    'key' : '08e5f74382f8dfda0ef6fde2d51bd362',
    'format' : 'iframe',
    'height' : 300,
    'width' : 160,
    'params' : {}
  };
</script>
<script src="https://bicea.org/22/08e5f74382f8dfda0ef6fde2d51bd362"></script>`,
  toolMiddle: `<script>
  atOptions = {
    'key' : '08e5f74382f8dfda0ef6fde2d51bd362',
    'format' : 'iframe',
    'height' : 300,
    'width' : 160,
    'params' : {}
  };
</script>
<script src="https://bicea.org/22/08e5f74382f8dfda0ef6fde2d51bd362"></script>`,
  toolBottom: `<script>
  atOptions = {
    'key' : '08e5f74382f8dfda0ef6fde2d51bd362',
    'format' : 'iframe',
    'height' : 300,
    'width' : 160,
    'params' : {}
  };
</script>
<script src="https://bicea.org/22/08e5f74382f8dfda0ef6fde2d51bd362"></script>`,
  sidebar: `<script>
  atOptions = {
    'key' : '08e5f74382f8dfda0ef6fde2d51bd362',
    'format' : 'iframe',
    'height' : 300,
    'width' : 160,
    'params' : {}
  };
</script>
<script src="https://bicea.org/22/08e5f74382f8dfda0ef6fde2d51bd362"></script>`,
  footerBanner: `<script>
  atOptions = {
    'key' : '08e5f74382f8dfda0ef6fde2d51bd362',
    'format' : 'iframe',
    'height' : 300,
    'width' : 160,
    'params' : {}
  };
</script>
<script src="https://bicea.org/22/08e5f74382f8dfda0ef6fde2d51bd362"></script>`,
};
popunder:'<script data-cfasync="false" src="https://afders.org/1/642ce88bb670bf79f7e7b7e068ef1df8"></script>'

export type AdSlotName = keyof typeof ADS;
