#!/usr/bin/env node
/**
 * Copy PBR textures from content/pbr to public/pbr so Next.js can serve them.
 * Run on postinstall and prebuild.
 */
const fs = require("fs");
const path = require("path");

const contentPbr = path.join(process.cwd(), "content", "pbr");
const publicPbr = path.join(process.cwd(), "public", "pbr");

if (!fs.existsSync(contentPbr)) {
  console.log("content/pbr not found, skipping PBR texture copy");
  process.exit(0);
}

const metals = fs.readdirSync(contentPbr).filter((f) => {
  const p = path.join(contentPbr, f);
  return fs.statSync(p).isDirectory();
});
for (const metal of metals) {
  const src = path.join(contentPbr, metal);
  const dest = path.join(publicPbr, metal);
  if (fs.existsSync(src)) {
    fs.mkdirSync(dest, { recursive: true });
    const items = fs.readdirSync(src);
    for (const item of items) {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      if (fs.statSync(srcPath).isDirectory()) {
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
    console.log(`Copied PBR textures: ${metal}`);
  }
}

function copyRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
