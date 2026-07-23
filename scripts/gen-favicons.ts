import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

async function generateFavicons() {
  const publicDir = path.join(process.cwd(), "public");
  const svgPath = path.join(publicDir, "favicon.svg");

  const svgBuffer = fs.readFileSync(svgPath);

  const sizes = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "favicon-48x48.png", size: 48 },
    { name: "favicon-192x192.png", size: 192 },
    { name: "favicon-512x512.png", size: 512 },
    { name: "apple-touch-icon.png", size: 180 },
    { name: "maskable-icon-192x192.png", size: 192 },
    { name: "maskable-icon-512x512.png", size: 512 },
  ];

  console.log("Generating favicon PNGs...");

  for (const item of sizes) {
    const outputPath = path.join(publicDir, item.name);
    await sharp(svgBuffer)
      .resize(item.size, item.size)
      .png()
      .toFile(outputPath);
    console.log(`✓ Generated ${item.name} (${item.size}x${item.size})`);
  }

  // Generate OpenGraph image (1200x630)
  const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#090d16"/>
    <circle cx="600" cy="315" r="400" fill="#4f46e5" opacity="0.15" filter="blur(80px)"/>
    <g transform="translate(400, 185) scale(0.78125)">
      ${svgBuffer.toString().replace(/<\/?svg[^>]*>/g, "")}
    </g>
    <text x="600" y="490" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="42" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="-1">ScribeCV</text>
    <text x="600" y="530" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#818cf8" text-anchor="middle" letter-spacing="4">FREE &amp; LOCAL-FIRST ATS RESUME BUILDER</text>
  </svg>`;

  const ogPath = path.join(publicDir, "opengraph-image.png");
  await sharp(Buffer.from(ogSvg)).resize(1200, 630).png().toFile(ogPath);
  console.log("✓ Generated opengraph-image.png (1200x630)");

  console.log("Done generating all assets!");
}

generateFavicons().catch((err) => {
  console.error("Error generating favicons:", err);
  process.exit(1);
});
