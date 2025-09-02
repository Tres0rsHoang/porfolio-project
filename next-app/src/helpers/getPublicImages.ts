import fs from "fs";
import path from "path";

export function getAllImagesFromPublicFolder(): string[] {
  const imagesDir = path.join(process.cwd(), "public/images");
  const files = fs.readdirSync(imagesDir);
  return files.map((file) => `/images/${file}`);
}

export function getAllFontsFromPublicFolder(): string[] {
  const imagesDir = path.join(process.cwd(), "public/fonts");
  const files = fs.readdirSync(imagesDir);
  return files.map((file) => `/fonts/${file}`);
}
