/* eslint-env node */
import { readdir, stat } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(path.join(__dirname, ".."));
const assetsDir = path.join(rootDir, "src", "assets");
const supportedExtensions = [".png", ".jpg", ".jpeg"];

let convertedCount = 0;

const walk = async (dir) => {
  const entries = await readdir(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const fileStat = await stat(fullPath);

    if (fileStat.isDirectory()) {
      await walk(fullPath);
      continue;
    }

    const ext = path.extname(entry).toLowerCase();
    if (!supportedExtensions.includes(ext)) continue;

    const webpPath = fullPath.replace(ext, ".webp");

    // Skip if target already exists and is newer
    try {
      const webpStat = await stat(webpPath);
      if (webpStat.mtimeMs >= fileStat.mtimeMs) continue;
    } catch {
      // target missing, so continue
    }

    try {
      await sharp(fullPath).webp({ quality: 78 }).toFile(webpPath);
      convertedCount++;
      console.log(`Converted ${path.relative(assetsDir, fullPath)} -> .webp`);
    } catch (error) {
      console.error(`Failed to convert ${fullPath}:`, error);
    }
  }
};

const run = async () => {
  console.log("Converting raster images in", assetsDir);
  await walk(assetsDir);
  console.log(`Finished conversions. Total new/updated WebP files: ${convertedCount}`);
};

run().catch((error) => {
  console.error("Conversion script failed:", error);
  process.exitCode = 1;
});

