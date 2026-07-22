#!/usr/bin/env tsx
/**
 * Generates favicon PNGs from the favicon.svg using sharp (installed temporarily).
 * Run: tsx scripts/gen-favicons.ts
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SVG_PATH = join(process.cwd(), "public/favicon.svg");
const svgBuffer = readFileSync(SVG_PATH);

// Install sharp temporarily if not present
try {
  await import("sharp");
} catch {
  console.log("Installing sharp temporarily...");
  execSync("pnpm add -D sharp", { stdio: "inherit" });
}

const sharp = (await import("sharp")).default;

const sizes: Array<{ name: string; size: number }> = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-48x48.png", size: 48 },
  { name: "favicon-192x192.png", size: 192 },
  { name: "favicon-512x512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "maskable-icon-192x192.png", size: 192 },
  { name: "maskable-icon-512x512.png", size: 512 },
];

for (const { name, size } of sizes) {
  const outPath = join(process.cwd(), "public", name);
  await sharp(svgBuffer).resize(size, size).png().toFile(outPath);
  console.log(`✓ ${name} (${size}×${size})`);
}

// Generate favicon.ico (16x16 PNG as .ico — browsers accept PNG-inside-ICO)
const ico16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
writeFileSync(join(process.cwd(), "public/favicon.ico"), ico16);
console.log("✓ favicon.ico (16×16)");

console.log("\nAll favicons generated.");
