import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const fontPath = join(__dirname, "fonts", "Tinos-Italic.ttf");
const appDir = join(root, "app");

const bg = "#1d3658";
const fg = "#f2f4f7";

async function ensureFont() {
  if (existsSync(fontPath)) return;
  mkdirSync(dirname(fontPath), { recursive: true });
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Tinos:ital,wght@1,400&display=swap",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
    },
  ).then((r) => r.text());
  const match = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/);
  if (!match) throw new Error("Could not resolve Tinos font URL");
  const bytes = await fetch(match[1]).then((r) => r.arrayBuffer());
  writeFileSync(fontPath, Buffer.from(bytes));
}

function makeSvg(size) {
  const fontB64 = readFileSync(fontPath).toString("base64");
  const radius = Math.round(size * 0.22);
  const fontSize = Math.round(size * 0.42);
  const y = Math.round(size * 0.66);

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face {
        font-family: 'Tinos';
        src: url('data:font/truetype;charset=utf-8;base64,${fontB64}') format('truetype');
        font-weight: 400;
        font-style: italic;
      }
    </style>
  </defs>
  <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${bg}"/>
  <text x="50%" y="${y}" text-anchor="middle" font-family="Tinos, serif" font-weight="400" font-style="italic" font-size="${fontSize}" fill="${fg}">PwB</text>
</svg>`;
}

function renderPng(size) {
  return sharp(Buffer.from(makeSvg(size))).png();
}

function createIco(images) {
  const count = images.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = images.map(({ size, buffer }) => {
    const entry = { size, buffer, offset };
    offset += buffer.length;
    return entry;
  });

  const out = Buffer.alloc(offset);
  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2);
  out.writeUInt16LE(count, 4);

  let dirPos = 6;
  for (const { size, buffer, offset: imageOffset } of entries) {
    out.writeUInt8(size === 256 ? 0 : size, dirPos);
    out.writeUInt8(size === 256 ? 0 : size, dirPos + 1);
    out.writeUInt8(0, dirPos + 2);
    out.writeUInt8(0, dirPos + 3);
    out.writeUInt16LE(1, dirPos + 4);
    out.writeUInt16LE(32, dirPos + 6);
    out.writeUInt32LE(buffer.length, dirPos + 8);
    out.writeUInt32LE(imageOffset, dirPos + 12);
    dirPos += 16;
  }

  let imagePos = headerSize;
  for (const { buffer } of entries) {
    buffer.copy(out, imagePos);
    imagePos += buffer.length;
  }

  return out;
}

await ensureFont();
await renderPng(192).toFile(join(appDir, "icon.png"));
await renderPng(180).toFile(join(appDir, "apple-icon.png"));

const icoSizes = [16, 32, 48];
const icoBuffers = await Promise.all(
  icoSizes.map(async (size) => ({
    size,
    buffer: await renderPng(size).toBuffer(),
  })),
);
writeFileSync(join(appDir, "favicon.ico"), createIco(icoBuffers));

console.log("Generated app/icon.png, app/apple-icon.png, app/favicon.ico");
