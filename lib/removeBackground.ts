/**
 * Removes the white (or near-white) background from an image using a
 * stack-based flood-fill starting from every border pixel, then crops
 * tightly to the remaining content and pads to a square output.
 *
 * Returns a PNG data-URL with a transparent background.
 */

const BG_THRESHOLD = 230; // pixels with R,G,B all above this are "background-like"

function isBgPixel(data: Uint8ClampedArray, i: number): boolean {
  const a = data[i + 3];
  if (a < 10) return true; // already transparent
  return data[i] > BG_THRESHOLD && data[i + 1] > BG_THRESHOLD && data[i + 2] > BG_THRESHOLD;
}

function floodFillBorder(data: Uint8ClampedArray, w: number, h: number): Uint8Array {
  const visited = new Uint8Array(w * h);
  // Stack of flat pixel indices
  const stack: number[] = [];

  function seed(x: number, y: number) {
    const idx = y * w + x;
    if (!visited[idx] && isBgPixel(data, idx * 4)) {
      visited[idx] = 1;
      stack.push(idx);
    }
  }

  // Seed every pixel on all four borders
  for (let x = 0; x < w; x++) { seed(x, 0); seed(x, h - 1); }
  for (let y = 1; y < h - 1; y++) { seed(0, y); seed(w - 1, y); }

  // 4-directional flood fill (fast and avoids "diagonal leaks" through thin strokes)
  while (stack.length > 0) {
    const idx = stack.pop()!;
    const x = idx % w;
    const y = (idx / w) | 0;
    const neighbours = [
      x > 0     ? idx - 1 : -1,
      x < w - 1 ? idx + 1 : -1,
      y > 0     ? idx - w : -1,
      y < h - 1 ? idx + w : -1,
    ];
    for (const n of neighbours) {
      if (n >= 0 && !visited[n] && isBgPixel(data, n * 4)) {
        visited[n] = 1;
        stack.push(n);
      }
    }
  }
  return visited;
}

export function removeBackground(imageDataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;

      // Draw source image
      const src = document.createElement("canvas");
      src.width = w;
      src.height = h;
      const srcCtx = src.getContext("2d")!;
      srcCtx.drawImage(img, 0, 0);

      const imageData = srcCtx.getImageData(0, 0, w, h);
      const data = imageData.data;

      // Find background pixels connected to any border
      const bgMask = floodFillBorder(data, w, h);

      // Erase background
      for (let i = 0; i < w * h; i++) {
        if (bgMask[i]) data[i * 4 + 3] = 0;
      }
      srcCtx.putImageData(imageData, 0, 0);

      // Compute tight bounding box of remaining content
      let minX = w, maxX = 0, minY = h, maxY = 0;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          if (data[(y * w + x) * 4 + 3] > 0) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (minX > maxX || minY > maxY) {
        // Nothing found — return original
        resolve(imageDataUrl);
        return;
      }

      const cropW = maxX - minX + 1;
      const cropH = maxY - minY + 1;

      // Pad to square so the texture is not stretched on the pin face
      const side = Math.max(cropW, cropH);
      const out = document.createElement("canvas");
      out.width = side;
      out.height = side;
      const outCtx = out.getContext("2d")!;

      // Center the cropped content inside the square
      const dx = Math.round((side - cropW) / 2);
      const dy = Math.round((side - cropH) / 2);
      outCtx.drawImage(src, minX, minY, cropW, cropH, dx, dy, cropW, cropH);

      resolve(out.toDataURL("image/png"));
    };

    img.onerror = () => resolve(imageDataUrl); // fallback: use original
    img.src = imageDataUrl;
  });
}
