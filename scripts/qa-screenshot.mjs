// qa-screenshot.mjs — one-off Self-QA helper (CLAUDE.md's "Playwright
// screenshots of every changed page at 360px, 768px, 1440px"). Not wired to
// npm scripts; run directly with `node scripts/qa-screenshot.mjs <outDir>`
// against a running `npm run start` server on :3100.
import { chromium } from "playwright";

const URL = "http://localhost:3100/";
const OUT = process.argv[2] ?? "./.qa-screenshots";

const viewports = [
  { name: "360", width: 360, height: 800 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 900 },
];

const browser = await chromium.launch();

for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
  });
  await page.goto(URL, { waitUntil: "networkidle" });

  // A resize-based fullPage capture never actually scrolls the page, so
  // below-fold lazy images and scroll-linked motion (the How It Works
  // stack) would otherwise be caught in their pre-scroll state. Scroll
  // through for real first so everything has settled before the capture.
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(50);
  }
  await page.waitForTimeout(300);

  await page.screenshot({ path: `${OUT}/full-${vp.name}.png`, fullPage: true });
  console.log(`Saved full-${vp.name}.png`);
  await page.close();
}

await browser.close();
console.log("Done.");
