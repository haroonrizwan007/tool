export type Faq = { q: string; a: string };
export type Tool = {
  slug: string;
  name: string;
  /** <title> without the site-name suffix (added automatically) */
  title: string;
  metaDescription: string;
  h1: string;
  short: string;
  intro: string;
  category: "Image" | "Text" | "Calculator" | "Web";
  local: boolean; // shows the "processed locally" notice
  keywords: string[];
  steps: string[];
  features: string[];
  faqs: Faq[];
  related: string[];
};

export const tools: Tool[] = [
  {
    slug: "jpg-to-png",
    name: "JPG to PNG Converter",
    title: "JPG to PNG Converter: Free, Private, No Upload",
    metaDescription:
      "Convert JPG and JPEG images to lossless PNG online. Batch convert in your browser with no upload, no sign-up and no watermark.",
    h1: "JPG to PNG Converter",
    short: "Turn JPG photos into lossless PNG files in one click.",
    intro:
      "Drop one or many JPG images and get PNG files back instantly. The conversion happens on your device using your browser's built-in image engine, so your photos never leave your computer or phone.",
    category: "Image",
    local: true,
    keywords: ["jpg to png", "jpeg to png converter", "convert jpg to png online", "batch image converter"],
    steps: [
      "Drag your JPG files into the box, or tap it to choose files.",
      "Wait a moment while each image is converted to PNG.",
      "Download each PNG, or use Download all to save every file.",
    ],
    features: [
      "Batch conversion of many images at once",
      "Keeps the original pixel dimensions",
      "Files stay on your device",
      "No watermark, no file-size cap beyond your device memory",
    ],
    faqs: [
      { q: "Does converting JPG to PNG improve image quality?", a: "No. JPG is a lossy format, so detail removed when the photo was first saved cannot be restored. PNG simply stores the current pixels without losing any more detail, which makes it useful for editing and for graphics that need sharp edges." },
      { q: "Why is the PNG larger than my JPG?", a: "PNG uses lossless compression, which usually produces bigger files than JPG for photographs. If you need a smaller file, use the Image Compressor after converting." },
      { q: "Are my images uploaded anywhere?", a: "No. The conversion runs entirely inside your browser, and nothing is sent to a server." },
      { q: "Can I convert many JPG files at once?", a: "Yes. Add as many files as your device can handle and download them individually or all together." },
    ],
    related: ["image-compressor", "qr-code-generator", "youtube-thumbnail-downloader"],
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    title: "Image Compressor: Reduce JPG, PNG & WebP Size Online",
    metaDescription:
      "Compress JPG, PNG and WebP images online and cut file size by up to 90%. Adjust quality, resize and compare results. Private and free.",
    h1: "Image Compressor",
    short: "Shrink JPG, PNG and WebP files while keeping them sharp.",
    intro:
      "Make images lighter for websites, email and messaging. Choose a quality level, optionally limit the width, and see the exact size saved before you download. Everything is processed locally in your browser.",
    category: "Image",
    local: true,
    keywords: ["image compressor", "compress jpg", "reduce image size", "compress png online", "webp compressor"],
    steps: [
      "Add your images by dragging them in or tapping the box.",
      "Pick a quality, an output format and an optional maximum width.",
      "Check the savings shown for each image, then download.",
    ],
    features: [
      "Quality slider with live re-compression",
      "Convert to WebP or JPG for the biggest savings",
      "Optional max-width resize",
      "Shows original and new size for every file",
    ],
    faqs: [
      { q: "What quality setting should I use?", a: "For photos, 70 to 80 usually looks the same as the original at a much smaller size. Go lower for thumbnails and higher for images you plan to edit again." },
      { q: "Why does my PNG barely shrink?", a: "PNG is lossless, so quality settings do not apply to it. Choose WebP or JPG as the output format, or reduce the maximum width, to get larger savings." },
      { q: "Will compression make my image blurry?", a: "Moderate compression is hard to notice. Very low quality values can add visible artifacts, so compare the result before you use it." },
      { q: "Is there a file limit?", a: "There is no limit from us. Very large images depend on your device memory, so process huge batches in smaller groups." },
    ],
    related: ["jpg-to-png", "youtube-thumbnail-downloader", "qr-code-generator"],
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    title: "Word Counter: Count Words, Characters & Reading Time",
    metaDescription:
      "Count words, characters, sentences and paragraphs instantly. See reading time, speaking time and top keywords as you type. Free online word counter.",
    h1: "Word Counter",
    short: "Words, characters, sentences, reading time and keyword density.",
    intro:
      "Paste or type your text and the numbers update as you go. Use it for essays, social posts, meta descriptions and scripts. Your text is analyzed in your browser and is never stored or sent anywhere.",
    category: "Text",
    local: false,
    keywords: ["word counter", "character counter", "count words online", "reading time calculator"],
    steps: [
      "Type or paste your text into the box.",
      "Read the live counts for words, characters, sentences and paragraphs.",
      "Check reading time and the most repeated words to tighten your writing.",
    ],
    features: [
      "Live word, character, sentence and paragraph counts",
      "Reading and speaking time estimates",
      "Top repeated keywords with density",
      "Works with accented and non-Latin letters",
    ],
    faqs: [
      { q: "How are words counted?", a: "A word is any run of letters or digits, and apostrophes and hyphens inside a word are kept together, so \"don't\" and \"well-known\" each count once." },
      { q: "How is reading time calculated?", a: "Reading time assumes about 238 words per minute and speaking time about 150 words per minute, which are common averages for adults." },
      { q: "Is my text saved?", a: "No. The text stays in your browser tab and disappears when you close or refresh the page." },
      { q: "Does it count spaces as characters?", a: "Both totals are shown: characters with spaces and characters without spaces." },
    ],
    related: ["qr-code-generator", "age-calculator", "bmi-calculator"],
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    title: "Age Calculator: Exact Age in Years, Months & Days",
    metaDescription:
      "Calculate your exact age in years, months and days from your date of birth. See total days lived and a countdown to your next birthday.",
    h1: "Age Calculator",
    short: "Exact age in years, months and days, plus your next birthday.",
    intro:
      "Enter a date of birth and get your exact age down to the day. You can also pick a different date to find out how old someone was, or will be, on that day.",
    category: "Calculator",
    local: false,
    keywords: ["age calculator", "calculate my age", "date of birth calculator", "how old am i"],
    steps: [
      "Choose the date of birth.",
      "Leave the second date as today, or pick another date.",
      "Read the exact age, totals and the countdown to the next birthday.",
    ],
    features: [
      "Exact years, months and days",
      "Total months, weeks, days and hours lived",
      "Countdown to the next birthday",
      "Handles leap years and 29 February birthdays",
    ],
    faqs: [
      { q: "How is age calculated?", a: "We count full years, then full months, then remaining days between the two dates, borrowing the length of the previous month when needed." },
      { q: "Can I calculate age on a future date?", a: "Yes. Change the second date to any day after the birth date to see the age on that day." },
      { q: "What about 29 February birthdays?", a: "In years without a 29 February, the birthday is counted on 28 February." },
      { q: "Is my date of birth stored?", a: "No. The calculation runs in your browser and nothing is saved or sent." },
    ],
    related: ["bmi-calculator", "word-counter", "qr-code-generator"],
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    title: "BMI Calculator: Metric & Imperial, With Healthy Range",
    metaDescription:
      "Calculate your body mass index in kg/cm or lb/ft. See your BMI category and the healthy weight range for your height. Free and private.",
    h1: "BMI Calculator",
    short: "Body mass index with category and healthy weight range.",
    intro:
      "Enter your height and weight in metric or imperial units to get your BMI, the matching WHO adult category and the weight range that corresponds to a BMI of 18.5 to 24.9 at your height.",
    category: "Calculator",
    local: false,
    keywords: ["bmi calculator", "body mass index", "healthy weight range", "bmi chart adults"],
    steps: [
      "Select metric or imperial units.",
      "Enter your height and weight.",
      "Read your BMI, category and healthy weight range.",
    ],
    features: [
      "Metric (cm, kg) and imperial (ft, in, lb)",
      "WHO adult categories",
      "Healthy weight range for your height",
      "Visual scale showing where you fall",
    ],
    faqs: [
      { q: "How is BMI calculated?", a: "BMI is weight in kilograms divided by height in metres squared. In imperial units we convert pounds and inches to kilograms and centimetres first." },
      { q: "Is BMI accurate for everyone?", a: "BMI is a screening number, not a diagnosis. It does not separate muscle from fat and is not designed for children, pregnant women or competitive athletes." },
      { q: "What is a healthy BMI?", a: "The WHO defines 18.5 to 24.9 as the healthy range for adults." },
      { q: "Should I use this for medical decisions?", a: "No. For advice about your weight or health, speak with a qualified healthcare professional." },
    ],
    related: ["age-calculator", "word-counter", "qr-code-generator"],
  },
  {
    slug: "youtube-thumbnail-downloader",
    name: "YouTube Thumbnail Downloader",
    title: "YouTube Thumbnail Downloader: HD, 1280×720 & More",
    metaDescription:
      "Download YouTube video thumbnails in HD, 720p, 480p and smaller sizes. Paste a video link and save the image. Free, no sign-up.",
    h1: "YouTube Thumbnail Downloader",
    short: "Paste a video link and save its thumbnail in every size.",
    intro:
      "Paste any YouTube video, Shorts or youtu.be link to see every available thumbnail size, from small previews to full 1280 by 720 HD. Download the one you need.",
    category: "Web",
    local: false,
    keywords: ["youtube thumbnail downloader", "download youtube thumbnail", "youtube thumbnail grabber", "hd thumbnail"],
    steps: [
      "Copy the link of the YouTube video or Short.",
      "Paste it into the box.",
      "Choose a size and tap Download.",
    ],
    features: [
      "Works with watch, youtu.be, Shorts, embed and live links",
      "Up to 1280 × 720 where the video has an HD thumbnail",
      "Five sizes shown side by side",
      "No account needed",
    ],
    faqs: [
      { q: "Why is the maximum resolution missing?", a: "Not every video has a 1280 × 720 thumbnail. Older or low-resolution uploads only offer the smaller sizes, and those are shown instead." },
      { q: "Can I use downloaded thumbnails freely?", a: "Thumbnails belong to the video's creator. Use them only where you have permission, for example for commentary, education or your own videos." },
      { q: "Which links are supported?", a: "Standard watch links, youtu.be short links, Shorts, embed and live URLs, or just the 11-character video ID." },
      { q: "Does the tool send my link anywhere?", a: "No. The link is read in your browser and the images load straight from YouTube's image servers." },
    ],
    related: ["image-compressor", "jpg-to-png", "qr-code-generator"],
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    title: "QR Code Generator: Free, No Sign-Up, PNG & SVG",
    metaDescription:
      "Create QR codes for links, text and more. Customize colors and size, then download as PNG or SVG. Free, with no expiry and no sign-up.",
    h1: "QR Code Generator",
    short: "Make QR codes for links and text, download as PNG or SVG.",
    intro:
      "Type a link or any text and your QR code appears immediately. Adjust colors, size and error correction, then download a crisp PNG or a scalable SVG. Codes never expire and are generated in your browser.",
    category: "Web",
    local: false,
    keywords: ["qr code generator", "create qr code", "free qr code", "qr code svg"],
    steps: [
      "Enter the link or text you want to encode.",
      "Pick size, colors and error correction.",
      "Download the QR code as PNG or SVG.",
    ],
    features: [
      "Instant preview as you type",
      "PNG for screens, SVG for print",
      "Custom foreground and background colors",
      "Four error-correction levels",
    ],
    faqs: [
      { q: "Do these QR codes expire?", a: "No. The code stores your text directly, so it works for as long as the link or text itself is valid." },
      { q: "Which error correction level should I choose?", a: "Medium suits most uses. Choose High if the code will be printed on surfaces that may get scratched or if you plan to place a logo over it." },
      { q: "What colors scan best?", a: "Keep strong contrast with a dark foreground on a light background. Inverted or low-contrast codes may fail to scan on some phones." },
      { q: "PNG or SVG?", a: "Use PNG for websites and social posts. Use SVG for print, since it stays sharp at any size." },
    ],
    related: ["word-counter", "jpg-to-png", "image-compressor"],
  },
];

export const getTool = (slug: string) => tools.find((t) => t.slug === slug);
export const getRelated = (tool: Tool) => tool.related.map(getTool).filter((t): t is Tool => Boolean(t));
