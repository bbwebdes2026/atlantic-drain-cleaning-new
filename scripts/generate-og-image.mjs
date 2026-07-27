// generate-og-image.mjs — builds public/og-image.jpg: the Sea Point rig shot
// (already graded by enhance-images.mjs) with the lockup composited over a
// navy scrim, per CLAUDE.md's SEO section ("the Sea Point rig shot with the
// lockup, not a logo-on-navy card"). Run via `npm run og`.
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const WIDTH = 1200;
const HEIGHT = 630;

async function main() {
  const hero = await sharp(path.join(ROOT, "public/images/hero.webp"))
    .resize(WIDTH, HEIGHT, { fit: "cover", position: sharp.strategy.attention })
    .toBuffer();

  // Navy multiply + bottom-anchored scrim, matching the on-page Hero treatment.
  const scrim = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="scrim" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#0B1E2D" stop-opacity="0.95"/>
          <stop offset="60%" stop-color="#0B1E2D" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#071520" stop-opacity="0.4"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#071520" opacity="0.35"/>
      <rect width="100%" height="100%" fill="url(#scrim)"/>
    </svg>
  `);

  const logoSvg = await readFile(path.join(ROOT, "public/logo-full.svg"));
  const logoPng = await sharp(logoSvg, { density: 300 })
    .resize({ width: 440 })
    .png()
    .toBuffer();
  const { height: logoHeight } = await sharp(logoPng).metadata();

  await sharp(hero)
    .composite([
      { input: scrim, top: 0, left: 0 },
      { input: logoPng, left: 64, top: HEIGHT - (logoHeight ?? 140) - 56 },
    ])
    .jpeg({ quality: 88 })
    .toFile(path.join(ROOT, "public/og-image.jpg"));

  console.log("Wrote public/og-image.jpg");
}

main();
