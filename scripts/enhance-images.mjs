/**
 * enhance-images.mjs — build-time image pipeline for Atlantic Drain Cleaning.
 * Run with `npm run images`.
 *
 * Every source in /assets-raw is WhatsApp-compressed, so the pipeline exists to
 * (1) upscale, (2) apply one shared cool navy grade so a set shot by different
 * people on different phones reads as one library, (3) crop flagged CCTV monitor
 * stills to the screen rectangle, and (4) emit web-ready AVIF/WebP into
 * /public/images with a content-hash manifest so reruns are cheap.
 *
 * Upscale: prefers Real-ESRGAN (realesrgan-ncnn-vulkan) when the binary is in
 * scripts/bin — set REALESRGAN=1 to auto-download it (into the gitignored
 * scripts/bin) and use it. When it is unavailable or fails (e.g. no Vulkan) the
 * pipeline falls back to a high-quality Lanczos upscale so it always produces
 * output. The upscale is a mitigation, not a fix — full-res originals have been
 * requested from the client and remain the real solution.
 */
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import { existsSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RAW = path.join(ROOT, "assets-raw");
const OUT = path.join(ROOT, "public", "images");
const BIN = path.join(ROOT, "scripts", "bin");
const MANIFEST = path.join(OUT, "manifest.json");

// Bump when the grade/params change so every image reprocesses on next run.
const PIPELINE_VERSION = 1;
// Long-edge ceiling. Sources are WhatsApp-compressed at ≤1280px and the display
// width is capped at 720px, so 1280 covers 720 @~1.8x without the Lanczos
// fallback fabricating detail. Well under CLAUDE.md's 2400 max. Real-ESRGAN,
// when enabled, can legitimately fill more — revisit when originals arrive.
const OUT_MAX = 1280;
const WEBP_Q = 80;
const AVIF_Q = 58;

// The pamphlet is a transcription source, never UI (CLAUDE.md). Never process it.
const PAMPHLET = "WhatsApp Image 2026-06-16 at 10.27.36.jpeg";
// The hero is locked to the Sea Point rig shot (Tier 1).
const HERO = "WhatsApp Image 2026-07-21 at 11.57.14.jpeg";

// Tier 3 = CCTV monitor stills. Curated for the camera section (step 5) by visual
// review of every frame in the 11.56.35–11.56.47 burst: these are the only three
// that show the monitor screen itself (the rest are pipe/drain contents, already
// Tier 2). Each rect is the screen only — the white plastic case bezel and the
// button/port row below it cropped out — hand-verified by extracting and viewing
// each candidate crop before locking it in here. The pipeline's own resize step
// (see below) normalises whatever aspect this rect is to exactly 3:2.
/** @type {Record<string, {left:number,top:number,width:number,height:number}>} */
const TIER3 = {
  "WhatsApp Image 2026-07-21 at 11.56.41.jpeg": {
    left: 30,
    top: 365,
    width: 900,
    height: 545,
  },
  "WhatsApp Image 2026-07-21 at 11.56.41 (1).jpeg": {
    left: 110,
    top: 390,
    width: 730,
    height: 430,
  },
  "WhatsApp Image 2026-07-21 at 11.56.45.jpeg": {
    left: 100,
    top: 372,
    width: 740,
    height: 388,
  },
};

const slugify = (name) =>
  path
    .basename(name, path.extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const tierOf = (file) =>
  file === HERO ? 1 : TIER3[file] ? 3 : 2;

// Trims a curated screen rect to exactly 3:2 (centred), for CLAUDE.md's
// Tier-3 output ratio. Only ever shrinks — never grows past the curated
// rect's own bounds — so it can't crop back into the case bezel.
function to3x2({ left, top, width, height }) {
  const targetRatio = 3 / 2;
  const rectRatio = width / height;
  if (rectRatio > targetRatio) {
    const newWidth = Math.round(height * targetRatio);
    return { left: left + Math.round((width - newWidth) / 2), top, width: newWidth, height };
  }
  if (rectRatio < targetRatio) {
    const newHeight = Math.round(width / targetRatio);
    return { left, top: top + Math.round((height - newHeight) / 2), width, height: newHeight };
  }
  return { left, top, width, height };
}

/* ------------------------------------------------------------------ grade -- */
// One shared grade; Tier 2 (proof-of-work) is desaturated a little more so the
// drain-contents photos read as unified evidence rather than lurid snapshots.
function grade(pipe, tier) {
  const saturation = tier === 2 ? 0.8 : 0.9;
  return pipe
    .modulate({ saturation })
    // Cool navy grade + gentle contrast: trim red, lift blue, tint shadows to ink.
    .linear([0.99, 1.0, 1.05], [-4, -2, 3])
    .gamma(1.06);
}

/* --------------------------------------------------------------- upscaler -- */
const REALESRGAN_URL =
  "https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesrgan-ncnn-vulkan-20220424-windows.zip";
const realesrganExe = () =>
  path.join(BIN, process.platform === "win32" ? "realesrgan-ncnn-vulkan.exe" : "realesrgan-ncnn-vulkan");

async function ensureRealesrgan() {
  if (existsSync(realesrganExe())) return realesrganExe();
  if (process.env.REALESRGAN !== "1") return null; // opt-in download
  try {
    await fs.mkdir(BIN, { recursive: true });
    const zip = path.join(BIN, "realesrgan.zip");
    console.log("  ↓ downloading Real-ESRGAN…");
    const res = await fetch(REALESRGAN_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await fs.writeFile(zip, Buffer.from(await res.arrayBuffer()));
    // Unzip with PowerShell (Windows) so we add no dependency.
    const r = spawnSync(
      "powershell",
      ["-NoProfile", "-Command", `Expand-Archive -Force -LiteralPath '${zip}' -DestinationPath '${BIN}'`],
      { stdio: "inherit" },
    );
    if (r.status !== 0) throw new Error("unzip failed");
    return existsSync(realesrganExe()) ? realesrganExe() : null;
  } catch (e) {
    console.warn(`  ! Real-ESRGAN unavailable (${e.message}); using Lanczos fallback`);
    return null;
  }
}

// Returns a Buffer of the upscaled image, or null to signal "use sharp path".
function runRealesrgan(exe, inputPath) {
  const outPath = inputPath + ".up.png";
  const r = spawnSync(exe, ["-i", inputPath, "-o", outPath, "-s", "2", "-n", "realesrgan-x4plus"], {
    cwd: BIN,
  });
  if (r.status !== 0 || !existsSync(outPath)) return null;
  return outPath;
}

/* ------------------------------------------------------------------ main --- */
async function loadManifest() {
  try {
    return JSON.parse(await fs.readFile(MANIFEST, "utf8"));
  } catch {
    return { version: PIPELINE_VERSION, generated: null, hero: null, entries: {} };
  }
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const manifest = await loadManifest();
  if (manifest.version !== PIPELINE_VERSION) manifest.entries = {};
  manifest.version = PIPELINE_VERSION;

  const files = (await fs.readdir(RAW))
    .filter((f) => /\.(jpe?g|png)$/i.test(f) && f !== PAMPHLET)
    .sort();

  const exe = await ensureRealesrgan();
  let processed = 0,
    skipped = 0;

  for (const file of files) {
    const src = path.join(RAW, file);
    const bytes = await fs.readFile(src);
    const tier = tierOf(file);
    const slug = tier === 1 ? "hero" : slugify(file);
    const hash = createHash("sha256")
      .update(bytes)
      .update(`v${PIPELINE_VERSION}:t${tier}:${OUT_MAX}:${WEBP_Q}:${AVIF_Q}:${JSON.stringify(TIER3[file] ?? null)}`)
      .digest("hex")
      .slice(0, 16);

    const prev = manifest.entries[slug];
    const webpOut = path.join(OUT, `${slug}.webp`);
    const avifOut = path.join(OUT, `${slug}.avif`);
    if (prev && prev.hash === hash && existsSync(webpOut) && existsSync(avifOut)) {
      skipped++;
      continue;
    }

    // 1. Upscale (Real-ESRGAN when available, else Lanczos in step 4's resize).
    let working = src;
    let upscaler = "lanczos";
    if (exe) {
      const up = runRealesrgan(exe, src);
      if (up) {
        working = up;
        upscaler = "realesrgan";
      }
    }

    // 2/3. Grade (+ Tier-3 bezel crop), honouring EXIF orientation.
    let pipe = sharp(working, { failOn: "none" }).rotate();
    if (tier === 3) {
      // Sharp only keeps the *last* .resize() queued on a pipeline — chaining
      // an .extract() + .resize() here and relying on step 4's final resize
      // to also apply would silently drop this one. So the crop rect is
      // trimmed to exactly 3:2 by extract() alone; step 4's single resize
      // then just scales it down, preserving that ratio.
      const { left, top, width, height } = to3x2(TIER3[file]);
      pipe = pipe.extract({ left, top, width, height });
    }
    pipe = grade(pipe, tier);

    // 4. Emit AVIF + WebP, capped at the long-edge ceiling.
    const graded = await pipe
      .resize({ width: OUT_MAX, height: OUT_MAX, fit: "inside", withoutEnlargement: false, kernel: "lanczos3" })
      .toBuffer();
    const meta = await sharp(graded).metadata();
    await sharp(graded).webp({ quality: WEBP_Q }).toFile(webpOut);
    await sharp(graded).avif({ quality: AVIF_Q, effort: 4 }).toFile(avifOut);

    if (working !== src) await fs.rm(working, { force: true });

    manifest.entries[slug] = {
      raw: file,
      hash,
      tier,
      upscaler,
      width: meta.width,
      height: meta.height,
      outputs: {
        webp: `/images/${slug}.webp`,
        avif: `/images/${slug}.avif`,
      },
    };
    if (tier === 1) manifest.hero = slug;
    processed++;
    process.stdout.write(`  ✓ ${slug} (tier ${tier}, ${upscaler}, ${meta.width}×${meta.height})\n`);
  }

  manifest.generated = new Date().toISOString();
  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\nDone. ${processed} processed, ${skipped} unchanged. Manifest → public/images/manifest.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
