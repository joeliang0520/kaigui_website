// viewer.jsx — Pin3DViewer + Pin2DFlat
// Exports: Pin3DViewer, Pin2DFlat, PLATINGS, SIZES_IN, hexDarken, lighten, loadPBRTextures, applyPBRToMaterial

const PLATINGS = [
  { id: 'gold',           name: 'Gold',           color: '#D4AF37', metalness: 0.9,  roughness: 0.15 },
  { id: 'silver',         name: 'Silver',         color: '#C0C0C0', metalness: 0.92, roughness: 0.1  },
  { id: 'nickel',         name: 'Nickel',         color: '#A8A8A8', metalness: 0.85, roughness: 0.2  },
  { id: 'black_nickel',   name: 'Black Nickel',   color: '#2C2C2C', metalness: 0.8,  roughness: 0.6  },
  { id: 'copper',         name: 'Copper',         color: '#B87333', metalness: 0.88, roughness: 0.2  },
  { id: 'antique_gold',   name: 'Antique Gold',   color: '#B8860B', metalness: 0.82, roughness: 0.5  },
  { id: 'antique_silver', name: 'Antique Silver', color: '#8B8B8B', metalness: 0.8,  roughness: 0.5  },
  { id: 'antique_copper', name: 'Antique Copper', color: '#8B4513', metalness: 0.78, roughness: 0.5  },
  { id: 'dyed_black',     name: 'Dyed Black',     color: '#1A1A1A', metalness: 0.6,  roughness: 0.6  },
];

const SIZES_IN = [
  { value: 1,  label: '1 cm',  mm: '10mm' },
  { value: 2,  label: '2 cm',  mm: '20mm' },
  { value: 3,  label: '3 cm',  mm: '30mm' },
  { value: 4,  label: '4 cm',  mm: '40mm' },
  { value: 5,  label: '5 cm',  mm: '50mm' },
  { value: 6,  label: '6 cm',  mm: '60mm' },
  { value: 7,  label: '7 cm',  mm: '70mm' },
  { value: 8,  label: '8 cm',  mm: '80mm' },
  { value: 9,  label: '9 cm',  mm: '90mm' },
  { value: 10, label: '10 cm', mm: '100mm' },
  { value: 12, label: '12 cm', mm: '120mm' },
  { value: 15, label: '15 cm', mm: '150mm' },
];

function hexDarken(hex, f = 0.65) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return `rgb(${Math.round(r*f)},${Math.round(g*f)},${Math.round(b*f)})`;
}
function lighten(hex, f = 1.3) {
  return `rgb(${Math.min(255,Math.round(parseInt(hex.slice(1,3),16)*f))},${Math.min(255,Math.round(parseInt(hex.slice(3,5),16)*f))},${Math.min(255,Math.round(parseInt(hex.slice(5,7),16)*f))})`;
}

// ── PBR ──────────────────────────────────────────────────────────────────────
// Map plating option id → folder + per-channel file names.
// Folder names follow what's on disk under pbr/pbr_material/ (incl. the "sliver" typo).
const PBR_MAP = {
  gold: {
    dir: 'pbr/pbr_material/gold',
    color:     'Metal034_2K-JPG_Color.jpg',
    roughness: 'Metal034_2K-JPG_Roughness.jpg',
    metalness: 'Metal034_2K-JPG_Metalness.jpg',
    normal:    'Metal034_2K-JPG_NormalGL.jpg',
  },
  silver: {
    dir: 'pbr/pbr_material/sliver',
    color:     'Metal009_1K-JPG_Color.jpg',
    roughness: 'Metal009_1K-JPG_Roughness.jpg',
    metalness: 'Metal009_1K-JPG_Metalness.jpg',
    normal:    'Metal009_1K-JPG_NormalGL.jpg',
  },
  nickel: {
    dir: 'pbr/pbr_material/nickel',
    color:     'Industrial_Brushed_Nickel_xexhnytas_1k_Albedo.jpg',
    roughness: 'Industrial_Brushed_Nickel_xexhnytas_1k_Roughness.jpg',
    metalness: 'Industrial_Brushed_Nickel_xexhnytas_1k_Metallic.jpg',
    normal:    'Industrial_Brushed_Nickel_xexhnytas_1k_Normal.jpg',
  },
  antique_copper: {
    dir: 'pbr/pbr_material/antique_copper',
    color:     'Metal035_1K-JPG_Color.jpg',
    roughness: 'Metal035_1K-JPG_Roughness.jpg',
    metalness: 'Metal035_1K-JPG_Metalness.jpg',
    normal:    'Metal035_1K-JPG_NormalGL.jpg',
  },
  dyed_black: {
    dir: 'pbr/pbr_material/dyed_black',
    color:     'Metal028_1K-JPG_Color.jpg',
    roughness: 'Metal028_1K-JPG_Roughness.jpg',
    metalness: 'Metal028_1K-JPG_Metalness.jpg',
    normal:    'Metal028_1K-JPG_NormalGL.jpg',
  },
};
const textureCache = {};

function loadPBRTextures(T, platingId, onReady) {
  const cfg = PBR_MAP[platingId];
  if (!cfg) { onReady(null); return; }
  if (textureCache[platingId]) { onReady(textureCache[platingId]); return; }
  const loader = new T.TextureLoader();
  const load = (file, isColor) => new Promise(res => {
    if (!file) { res(null); return; }
    loader.load(`${cfg.dir}/${file}`, t => {
      t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(2,2);
      // Color map → sRGB; data maps (roughness/metalness/normal) → linear.
      if (isColor) t.colorSpace = T.SRGBColorSpace;
      else t.colorSpace = T.NoColorSpace;
      res(t);
    }, undefined, () => res(null));
  });
  Promise.all([load(cfg.color, true), Promise.resolve(null), load(cfg.metalness, false), load(cfg.normal, false)]).then(([color,roughness,metalness,normal]) => {
    const maps = { color, roughness, metalness, normal };
    textureCache[platingId] = maps;
    onReady(maps);
  });
}

function applyPBRToMaterial(mat, maps, plating) {
  if (maps) {
    mat.map = maps.color || null;
    mat.roughnessMap = null;                // roughness map disabled — polished finish
    mat.metalnessMap = maps.metalness || null;
    mat.normalMap = maps.normal || null;
    mat.color.set('#ffffff');
    mat.metalness = 1.0;
    mat.roughness = 0.18;                   // low, uniform → mirror-like reflections
    mat.envMapIntensity = 1.4;
  } else {
    mat.map = mat.roughnessMap = mat.metalnessMap = mat.normalMap = null;
    mat.color.set(plating.color);
    mat.metalness = plating.metalness;
    mat.roughness = plating.roughness;
  }
  mat.needsUpdate = true;
}

// ── Geometry ─────────────────────────────────────────────────────────────────
function createPinGeometry(shape, sizeW_cm, sizeH_cm, thickness_mm = 2.2) {
  const T = window.THREE;
  if (!T) return null;
  const w = sizeW_cm / 2.54;
  const h = sizeH_cm / 2.54;
  const depth = thickness_mm / 25.4; // mm → inches unit
  if (shape === 'circle') return new T.CylinderGeometry(w*0.5, w*0.5, depth, 80, 1);
  if (shape === 'square') return new T.BoxGeometry(w, w, depth);
  return new T.BoxGeometry(w, h, depth);
}

// ── Back-text canvas texture ──────────────────────────────────────────────────
function createBackTextTexture(T, text, type, baseColor = '#111111') {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  // Base — picks up the plating color so engraving/stamp blend with the metal
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);
  if (text) {
    // Engraving = darker recess, stamp = lighter raised mark.
    ctx.fillStyle = type === 'engraving'
      ? 'rgba(0,0,0,0.55)'
      : 'rgba(255,255,255,0.35)';
    const fontSize = Math.max(24, Math.min(64, Math.floor(size * 0.1)));
    ctx.font = `bold ${fontSize}px Helvetica, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // Word-wrap
    const words = text.split(' ');
    let line = '', lines = [];
    for (const w of words) {
      const test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > size * 0.85) { lines.push(line); line = w; }
      else line = test;
    }
    lines.push(line);
    const lineH = fontSize * 1.3;
    const startY = size/2 - (lines.length-1) * lineH/2;
    lines.forEach((l, i) => ctx.fillText(l, size/2, startY + i * lineH));
  }
  return new T.CanvasTexture(canvas);
}

// Real-world target widths (in mm) for each attachment, so the back
// hardware stays a constant physical size regardless of pin diameter —
// matching how a real clutch is the same 10mm whether the pin is 1" or 3".
const ATTACHMENT_SIZES_MM = {
  rubber_clutch: 10,    rubber_clutch_2x: 10,
  deluxe_clutch: 11,    deluxe_clutch_2x: 11,
  military_clutch: 11,  military_2x: 11,
  safety_pin: 16,
};
const DEFAULT_ATTACHMENT_MM = 10;

// Helper: scale one GLB clone and flush its contact face against the pin back.
//
// GLB geometry analysis:
//   rubber_clutch / safety_pin: baked 90°X rotation → post-transform, the post
//     extends in +Z and the flat contact face sits at box.min.z (closest to pin).
//   deluxe_clutch / military_clutch: no rotation, Z-translation pushes the model
//     in +Z — flat contact face also at box.min.z.
//
// So we always flush box.min.z to the pin's back face (backZ = -depth/2):
//   clone.position.z = backZ - box.min.z
//
// offsetX lets us shift copies left/right for dual-clutch layouts.
function fitAttachment(clone, T, attachmentId, thicknessMm, offsetX = 0) {
  const depth = (thicknessMm || 2.2) / 25.4;
  const backZ = -depth / 2;

  // Flip the attachment 180° around X so the body extends in -Z (behind the pin),
  // and what was box.min.z (contact face) now sits at box.max.z in world coords.
  clone.rotation.x = Math.PI;

  // Scale to a FIXED real-world width (in scene units = inches), independent
  // of the pin size, so the clutch reads as the same physical hardware on a
  // 0.5" pin and a 3" pin.
  const targetIn = (ATTACHMENT_SIZES_MM[attachmentId] || DEFAULT_ATTACHMENT_MM) / 25.4;
  let box = new T.Box3().setFromObject(clone);
  let sz  = new T.Vector3(); box.getSize(sz);
  const sc = targetIn / Math.max(sz.x, sz.y, sz.z, 1e-6);
  clone.scale.multiplyScalar(sc);

  // Re-measure post-scale
  box = new T.Box3().setFromObject(clone);
  const ctr = new T.Vector3(); box.getCenter(ctr);

  // Flush the contact face (now at box.max.z) to pin back — zero gap.
  // Body extends from backZ into -Z direction.
  clone.position.set(
    -ctr.x + offsetX,
    -ctr.y,
    backZ - box.max.z
  );
}

// ── Attachment GLB loader ─────────────────────────────────────────────────────
const ATTACHMENT_GLB = {
  rubber_clutch:    'models/attachments/rubber_clutch.glb',
  rubber_clutch_2x: 'models/attachments/rubber_clutch.glb',
  deluxe_clutch:    'models/attachments/deluxe_clutch.glb',
  deluxe_clutch_2x: 'models/attachments/deluxe_clutch.glb',
  military_clutch:  'models/attachments/military_clutch.glb',
  military_2x:      'models/attachments/military_clutch.glb',
  safety_pin:       'models/attachments/safety_pin.glb',
};

const glbCache = {};

function isAttachmentCached(attachmentId) {
  const path = ATTACHMENT_GLB[attachmentId];
  return !!(path && glbCache[path]);
}
window.isAttachmentCached = isAttachmentCached;

function loadAttachmentGLB(T, attachmentId, onReady) {
  const path = ATTACHMENT_GLB[attachmentId];
  if (!path || !window.THREE || !THREE.GLTFLoader) { onReady(null); return; }
  if (glbCache[path]) { onReady(glbCache[path].clone ? glbCache[path] : glbCache[path]); return; }
  const loader = new THREE.GLTFLoader();
  loader.load(path, gltf => {
    glbCache[path] = gltf.scene;
    window.dispatchEvent(new CustomEvent('attachment-loaded', { detail: { attachmentId, path } }));
    onReady(gltf.scene);
  }, undefined, () => {
    window.dispatchEvent(new CustomEvent('attachment-loaded', { detail: { attachmentId, path, error: true } }));
    onReady(null);
  });
}

// ── 3D Viewer ────────────────────────────────────────────────────────────────
function Pin3DViewer({ config }) {
  const mountRef = React.useRef(null);
  const s = React.useRef({});

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !window.THREE) return;
    const T = window.THREE;
    const W = mount.clientWidth || 500, H = mount.clientHeight || 500;

    const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6;
    mount.appendChild(renderer.domElement);

    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(40, W/H, 0.01, 100);
    camera.position.set(0.4, 0.5, 3.5);

    // ── Lighting ──
    // Procedural environment map so metallic PBR has smooth, even reflections
    // (instead of one bright hot-spot from a single light). Built from a soft
    // vertical gradient canvas → PMREM → scene.environment.
    const envCanvas = document.createElement('canvas');
    envCanvas.width = 256; envCanvas.height = 256;
    const ectx = envCanvas.getContext('2d');
    const grad = ectx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.00, '#ffffff');
    grad.addColorStop(0.45, '#e8eef5');
    grad.addColorStop(0.55, '#bcc6d2');
    grad.addColorStop(1.00, '#5a6470');
    ectx.fillStyle = grad; ectx.fillRect(0, 0, 256, 256);
    // A couple soft "windows" to give reflections some shape without hotspots
    const softBlob = (x, y, r, a) => {
      const g2 = ectx.createRadialGradient(x, y, 0, x, y, r);
      g2.addColorStop(0, `rgba(255,255,255,${a})`);
      g2.addColorStop(1, 'rgba(255,255,255,0)');
      ectx.fillStyle = g2; ectx.fillRect(0, 0, 256, 256);
    };
    softBlob(64, 70, 90, 0.55);
    softBlob(200, 90, 70, 0.35);
    const envTex = new T.CanvasTexture(envCanvas);
    envTex.mapping = T.EquirectangularReflectionMapping;
    const pmrem = new T.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envRT = pmrem.fromEquirectangular(envTex);
    scene.environment = envRT.texture;
    envTex.dispose();

    // Soft fill from sky/ground + a few balanced directional lights — no point
    // lights, since they concentrate as a single bright spot on metals.
    scene.add(new T.HemisphereLight(0xffffff, 0x444a55, 0.55));
    const addDir = (x, y, z, c, i) => {
      const l = new T.DirectionalLight(c, i);
      l.position.set(x, y, z);
      scene.add(l);
    };
    addDir( 3,  4,  5, 0xfff2dc, 1.6);   // key — warm, upper right
    addDir(-4,  2,  3, 0xdde8ff, 1.0);   // fill — cool, upper left
    addDir( 0,  5, -3, 0xffffff, 0.6);   // top back rim
    addDir( 0, -3,  2, 0xfff8ee, 0.45);  // soft underfill

    const plating = PLATINGS.find(p => p.id === config.material) || PLATINGS[0];
    const thickness_mm = config.thickness || 2.2;

    const mat = new T.MeshStandardMaterial({ color: new T.Color(plating.color), metalness: plating.metalness, roughness: plating.roughness });
    const rimMat = new T.MeshStandardMaterial({ color: new T.Color(plating.color).multiplyScalar(0.7), metalness: plating.metalness*0.85, roughness: Math.min(plating.roughness+0.15,1) });
    // Back face material (for text)
    const backMat = new T.MeshStandardMaterial({ color: new T.Color(plating.color), metalness: plating.metalness, roughness: plating.roughness + 0.1 });

    const geo = createPinGeometry(config.shape, config.size, config.sizeH, thickness_mm);
    // Cylinder groups: [side=rimMat, top=mat(front), bottom=backMat]
    // Box: single mat (we'll use a multi-mat array for back text)
    let meshMats;
    if (config.shape === 'circle') meshMats = [rimMat, mat, backMat];
    else meshMats = [mat, mat, mat, mat, mat, backMat]; // BoxGeometry: 6 faces, last two are +Z/-Z

    const mesh = new T.Mesh(geo, meshMats);
    if (config.shape === 'circle') mesh.rotation.x = Math.PI / 2;
    scene.add(mesh);

    // Load PBR textures
    loadPBRTextures(T, config.material, (maps) => {
      applyPBRToMaterial(mat, maps, plating);
      if (maps) {
        [rimMat, backMat].forEach(m => {
          m.map = maps.color || null; m.roughnessMap = null;
          m.metalnessMap = maps.metalness || null; m.color.set('#888888');
          m.metalness = 0.9; m.roughness = 0.25; m.needsUpdate = true;
        });
      }
    });

    // Attachment model group
    const attachGroup = new T.Group();
    scene.add(attachGroup);

    // Load initial attachment
    loadAttachmentGLB(T, config.attachment, (model) => {
      if (!model) return;
      const isDual = config.attachment === 'rubber_clutch_2x' || config.attachment === 'deluxe_clutch_2x' || config.attachment === 'military_2x';
      if (!isDual) {
        const clone = model.clone(true);
        fitAttachment(clone, T, config.attachment, config.thickness, 0);
        attachGroup.add(clone);
      } else {
        const probe = model.clone(true);
        fitAttachment(probe, T, config.attachment, config.thickness, 0);
        const box = new T.Box3().setFromObject(probe);
        const sz = new T.Vector3(); box.getSize(sz);
        const halfSpan = sz.x * 0.5 + sz.x * 0.15;
        const c1 = model.clone(true); fitAttachment(c1, T, config.attachment, config.thickness, -halfSpan); attachGroup.add(c1);
        const c2 = model.clone(true); fitAttachment(c2, T, config.attachment, config.thickness, +halfSpan); attachGroup.add(c2);
      }
    });

    const controls = new T.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.enablePan = false; controls.minDistance = 1; controls.maxDistance = 12;
    controls.autoRotate = true; controls.autoRotateSpeed = 0.9;
    controls.addEventListener('start', () => { controls.autoRotate = false; });
    controls.addEventListener('end', () => { setTimeout(() => { controls.autoRotate = true; }, 2500); });

    let raf;
    const animate = () => { raf = requestAnimationFrame(animate); controls.update(); renderer.render(scene, camera); };
    animate();

    const ro = new ResizeObserver(([e]) => {
      const {width:rw,height:rh} = e.contentRect;
      if (rw>0&&rh>0) { renderer.setSize(rw,rh); camera.aspect=rw/rh; camera.updateProjectionMatrix(); }
    });
    ro.observe(mount);

    s.current = { renderer, scene, camera, mesh, mat, rimMat, backMat, controls, attachGroup, T };

    return () => {
      cancelAnimationFrame(raf); controls.dispose(); renderer.dispose(); ro.disconnect();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  // Reactive: material + effects
  React.useEffect(() => {
    const { mat, rimMat, backMat, T } = s.current;
    if (!mat || !T) return;
    const p = PLATINGS.find(x => x.id === config.material) || PLATINGS[0];
    loadPBRTextures(T, config.material, (maps) => {
      applyPBRToMaterial(mat, maps, p);
      // Front + rim only — backMat is handled by the back-text effect so the
      // back stays in sync with both material and stamp/engraving state.
      [rimMat].filter(Boolean).forEach(m => {
        if (maps) { m.map=maps.color||null; m.roughnessMap=null; m.metalnessMap=maps.metalness||null; m.normalMap=maps.normal||null; m.color.set('#888888'); m.metalness=0.9; m.roughness=0.25; }
        else { m.map=m.roughnessMap=m.metalnessMap=m.normalMap=null; m.color.set(new T.Color(p.color).multiplyScalar(0.7)); m.metalness=p.metalness*0.85; m.roughness=Math.min(p.roughness+0.15,1); }
        m.needsUpdate = true;
      });
      const fx = config.effects || [];
      mat.emissive = new T.Color(fx.includes('glow') ? '#0a3060' : '#000000');
      mat.emissiveIntensity = fx.includes('glow') ? 0.55 : 0;
      if (!maps) {
        let r = p.roughness;
        if (fx.includes('glitter')) r = Math.max(0.03, r - 0.13);
        if (fx.includes('pearlescent')) { r = Math.max(0.05, r-0.08); mat.emissive.set('#180018'); mat.emissiveIntensity=0.18; }
        mat.roughness = r;
      }
      mat.transparent = fx.includes('transparent');
      mat.opacity = fx.includes('transparent') ? 0.58 : 1;
      mat.needsUpdate = true;
    });
  }, [config.material, config.effects]);

  // Reactive: shape + size + thickness
  React.useEffect(() => {
    const { mesh, T } = s.current;
    if (!mesh || !T) return;
    mesh.geometry.dispose();
    mesh.geometry = createPinGeometry(config.shape, config.size, config.sizeH, config.thickness || 2.2);
    mesh.rotation.x = config.shape === 'circle' ? Math.PI / 2 : 0;
    const { mat, rimMat, backMat } = s.current;
    if (config.shape === 'circle') mesh.material = [rimMat, mat, backMat];
    else mesh.material = [mat, mat, mat, mat, mat, backMat];
    mesh.material.forEach && mesh.material.forEach(m => m && (m.needsUpdate = true));
  }, [config.shape, config.size, config.sizeH, config.thickness]);

  // Reactive: back text + plain-back finish (must mirror selected material)
  React.useEffect(() => {
    const { backMat, T } = s.current;
    if (!backMat || !T) return;
    const p = PLATINGS.find(x => x.id === config.material) || PLATINGS[0];
    const text = config.backSide === 'stamp' ? config.backText
               : config.backSide === 'engraving' ? config.engravingText
               : '';

    // Always (re-)apply the PBR set so back matches the front for the current
    // plating. After this, we either overlay text via canvas, or leave the
    // bare PBR color map for 'Plain Back'.
    loadPBRTextures(T, config.material, (maps) => {
      const oldMap = backMat.map;
      if (text) {
        // Stamp / engraving: tint a canvas with the plating color so the back
        // reads as the selected metal, with the text incised/raised on top.
        backMat.map = createBackTextTexture(T, text, config.backSide, p.color);
        backMat.roughnessMap = null;
        backMat.metalnessMap = maps?.metalness || null;
        backMat.normalMap    = maps?.normal    || null;
        backMat.color.set('#ffffff');
        backMat.metalness = maps ? 1.0 : p.metalness;
        backMat.roughness = maps ? 0.22 : Math.min(p.roughness + 0.1, 1);
        backMat.envMapIntensity = 1.4;
      } else if (maps) {
        // Plain Back — mirror the front material's full PBR setup.
        backMat.map          = maps.color     || null;
        backMat.roughnessMap = null;
        backMat.metalnessMap = maps.metalness || null;
        backMat.normalMap    = maps.normal    || null;
        backMat.color.set('#ffffff');
        backMat.metalness = 1.0;
        backMat.roughness = 0.18;
        backMat.envMapIntensity = 1.4;
      } else {
        // No PBR set for this plating — fall back to its solid base color.
        backMat.map = backMat.roughnessMap = backMat.metalnessMap = backMat.normalMap = null;
        backMat.color.set(p.color);
        backMat.metalness = p.metalness;
        backMat.roughness = Math.min(p.roughness + 0.05, 1);
      }
      backMat.needsUpdate = true;
      // Only dispose the previous map if it was a canvas we built (don't kill
      // the shared PBR color texture).
      if (oldMap && oldMap !== backMat.map && oldMap.isCanvasTexture) oldMap.dispose();
    });
  }, [config.backSide, config.backText, config.engravingText, config.material]);

  // Reactive: attachment model
  React.useEffect(() => {
    const { attachGroup, T, mesh } = s.current;
    if (!attachGroup || !T) return;

    // Clear old attachments
    while (attachGroup.children.length) attachGroup.remove(attachGroup.children[0]);

    const isDual = config.attachment === 'rubber_clutch_2x' || config.attachment === 'deluxe_clutch_2x' || config.attachment === 'military_2x';

    loadAttachmentGLB(T, config.attachment, (model) => {
      if (!model) return;

      if (!isDual) {
        // Single: centered on pin back
        const clone = model.clone(true);
        fitAttachment(clone, T, config.attachment, config.thickness, 0);
        attachGroup.add(clone);
      } else {
        // Dual: measure one scaled clone to compute spacing
        const probe = model.clone(true);
        fitAttachment(probe, T, config.attachment, config.thickness, 0);
        let box = new T.Box3().setFromObject(probe);
        let sz = new T.Vector3(); box.getSize(sz);
        // Gap = 30% of model width; offset each copy by ±(halfWidth + halfGap)
        const halfGap = sz.x * 0.15;
        const halfSpan = sz.x * 0.5 + halfGap;

        const c1 = model.clone(true);
        fitAttachment(c1, T, config.attachment, config.thickness, -halfSpan);
        attachGroup.add(c1);

        const c2 = model.clone(true);
        fitAttachment(c2, T, config.attachment, config.thickness, +halfSpan);
        attachGroup.add(c2);
      }
    });
  }, [config.attachment, config.thickness]);

  // Magnet overlay
  React.useEffect(() => {
    const { scene, T } = s.current;
    if (!scene || !T) return;
    // Remove existing magnet overlays
    scene.children.filter(c => c.name === 'magnet_disc').forEach(c => scene.remove(c));

    if (config.attachment === 'magnet' || config.attachment === 'magnet_2x') {
      const magnetR = (config.magnetSize || 12) / 2 / 25.4; // mm → inches
      const depth   = (config.thickness || 2.2) / 25.4;
      const backZ   = -depth / 2;                           // pin back face Z
      const magnetH = depth * 0.55;                         // magnet thickness ~ half pin

      const magnetGeo = new T.CylinderGeometry(magnetR, magnetR, magnetH, 48);
      const magnetMat = new T.MeshStandardMaterial({ color: '#888888', metalness: 0.95, roughness: 0.25 });
      // Slightly darker matte steel for the connecting bar so it reads as a
      // separate piece of hardware, not part of the magnets.
      const barMat    = new T.MeshStandardMaterial({ color: '#5a5d63', metalness: 0.85, roughness: 0.45 });

      const makeMagnet = (offsetX) => {
        const m = new T.Mesh(magnetGeo, magnetMat);
        m.name = 'magnet_disc';
        m.rotation.x = Math.PI / 2;
        // Flush: back face of magnet (at -magnetH/2 in local Z after rotation) == backZ
        m.position.set(offsetX, 0, backZ - magnetH / 2);
        scene.add(m);
      };

      if (config.attachment === 'magnet') {
        makeMagnet(0);
      } else {
        // 2× magnet: side by side with small gap
        const gap = magnetR * 0.4;
        const cx1 = -(magnetR + gap);
        const cx2 = +(magnetR + gap);
        makeMagnet(cx1);
        makeMagnet(cx2);

        // Connecting bar: a flat steel plate with two circular cut-outs for the
        // magnets so the geometry doesn't overlap with the magnet cylinders.
        // Height is intentionally a hair shorter than the magnets, so the
        // magnet faces protrude very slightly past the bar (the contact face).
        const barLen   = 2 * (2 * magnetR + gap) * 1.18;    // ~18 % past outer edges
        const barWidth = magnetR * 2 * 1.1;                 // 10 % wider than Ø
        const barH     = magnetH * 0.85;                    // slightly shorter

        // Build the plate as an extruded shape with two circular holes.
        const holeR = magnetR * 1.02;                       // tiny clearance
        const plate = new T.Shape();
        const rx = barLen / 2, ry = barWidth / 2;
        plate.moveTo(-rx, -ry); plate.lineTo(rx, -ry);
        plate.lineTo( rx,  ry); plate.lineTo(-rx,  ry);
        plate.lineTo(-rx, -ry);
        [cx1, cx2].forEach(cx => {
          const hole = new T.Path();
          hole.absarc(cx, 0, holeR, 0, Math.PI * 2, false);
          plate.holes.push(hole);
        });
        const barGeo = new T.ExtrudeGeometry(plate, { depth: barH, bevelEnabled: false, curveSegments: 48 });
        const bar    = new T.Mesh(barGeo, barMat);
        bar.name = 'magnet_disc';                            // grouped for cleanup
        // Place the bar so its front face (toward pin) sits at backZ; it
        // extrudes in +Z away from the pin, ending at backZ - barH … wait:
        // ExtrudeGeometry extrudes in +local-Z, so set position.z so the
        // FAR end of the extrusion sits at backZ (front face of magnets),
        // and the near end (local z = 0) sits behind it.
        bar.position.set(0, 0, backZ - barH);
        scene.add(bar);
      }
    }
  }, [config.attachment, config.magnetSize, config.thickness]);

  const zoom = f => {
    const { camera, controls } = s.current;
    if (camera) { camera.position.multiplyScalar(1/f); controls && controls.update(); }
  };
  const reset = () => {
    const { camera, controls } = s.current;
    if (camera) { camera.position.set(0.4, 0.5, 3.5); controls && controls.update(); }
  };

  const btnStyle = { width:30, height:30, background:'rgba(255,255,255,0.92)', border:'1px solid #ccc8be', borderRadius:3, cursor:'pointer', fontSize:15, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 1px 3px rgba(0,0,0,.1)', color:'#333' };

  return (
    <div style={{ position:'relative', width:'100%', height:'100%' }}>
      <div ref={mountRef} style={{ width:'100%', height:'100%' }} />
      <div style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', display:'flex', flexDirection:'column', gap:6 }}>
        <button style={btnStyle} onClick={() => zoom(1.3)}>+</button>
        <button style={btnStyle} onClick={() => zoom(0.77)}>−</button>
        <button style={btnStyle} onClick={reset}>↺</button>
      </div>
      <div style={{ position:'absolute', top:10, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:2, padding:'7px 14px', background:'rgba(255,255,255,0.82)', backdropFilter:'blur(4px)', border:'1px solid rgba(180,170,150,0.5)', borderRadius:10, fontSize:11.5, color:'#5e5e5e', pointerEvents:'none', letterSpacing:0.2, lineHeight:1.45, maxWidth:'min(86%, 460px)', textAlign:'center' }}>
        <span style={{ fontWeight:700, color:'#a07a1f', letterSpacing:1.2, fontSize:10 }}>FOR PREVIEW ONLY</span>
        <span>Color, material, texture &amp; size may differ from the final product — contact us for details.</span>
      </div>
      <div style={{ position:'absolute', bottom:10, left:'50%', transform:'translateX(-50%)', fontSize:10, color:'#9a9a9a', whiteSpace:'nowrap', pointerEvents:'none', letterSpacing:0.3 }}>
        ✦ Drag to rotate · scroll to zoom
      </div>
    </div>
  );
}

// ── 2D Flat ───────────────────────────────────────────────────────────────────

function Pin2DFlat({ config }) {
  const plating = PLATINGS.find(p => p.id === config.material) || PLATINGS[0];
  const w_in = config.size / 2.54;
  const h_in = config.sizeH / 2.54;
  const t_mm = config.thickness || 2.2;
  const t_in = t_mm / 25.4;

  const SC = 56;
  const fw = w_in * SC, fh = h_in * SC, sw = Math.max(6, t_in * SC);
  const PAD = 28, GAP = 40;
  const totalW = fw + GAP + sw + GAP + fw + PAD * 2;
  const maxH = Math.max(fh, 60);
  const totalH = maxH + PAD * 2 + 36;

  const cy = PAD + maxH / 2;
  const fx = PAD + fw / 2, sx = PAD + fw + GAP + sw / 2, bx = PAD + fw + GAP + sw + GAP + fw / 2;
  const pinFill = plating.color, pinStroke = hexDarken(plating.color, 0.6);
  const backText = config.backSide === 'stamp' ? config.backText : config.backSide === 'engraving' ? config.engravingText : '';

  const viewLabel = (txt, x, y) => <text x={x} y={y} fontSize="5.5" fill="#4466aa" textAnchor="middle" fontFamily="monospace" fontWeight="bold" letterSpacing="1">{txt}</text>;
  const dimLine = (x1,y1,x2,y2,lbl) => {
    const mx=(x1+x2)/2, my=(y1+y2)/2;
    return <g><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3366aa" strokeWidth="0.5" strokeDasharray="2 1"/><text x={mx} y={my+9} fontSize="5.5" fill="#3366aa" textAnchor="middle" fontFamily="monospace">{lbl}</text></g>;
  };

  const sizeLabel = `${config.size.toFixed(2)} cm / ${w_in.toFixed(2)}"`;
  const thickLabel = `${t_mm.toFixed(1)} mm`;

  const PinShape = ({ cx, fill, showText }) => config.shape === 'circle'
    ? <ellipse cx={cx} cy={cy} rx={fw/2} ry={fh/2} fill={fill} stroke={pinStroke} strokeWidth="0.8"/>
    : <rect x={cx-fw/2} y={cy-fh/2} width={fw} height={fh} fill={fill} stroke={pinStroke} strokeWidth="0.8"/>;

  return (
    <div style={{ width:'100%', height:'100%', background:'#f7f8fa', overflowY:'auto', display:'flex', flexDirection:'column', alignItems:'center', padding:20 }}>
      <div style={{ fontSize:9, color:'#4466aa', fontFamily:'monospace', marginBottom:12, letterSpacing:2, textTransform:'uppercase', alignSelf:'flex-start' }}>
        Orthographic Projection — Lapel Pin &nbsp;|&nbsp; Units: CM / MM
      </div>
      <svg viewBox={`0 0 ${totalW} ${totalH}`} style={{ width:'100%', maxWidth:660, background:'white', border:'1px solid #c8d4e8', borderRadius:2 }}>
        <defs>
          <pattern id="grid2d" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ddeaf5" strokeWidth="0.4"/>
          </pattern>
          <radialGradient id="faceGrad2" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor={lighten(plating.color, 1.4)}/>
            <stop offset="60%" stopColor={plating.color}/>
            <stop offset="100%" stopColor={hexDarken(plating.color, 0.75)}/>
          </radialGradient>
        </defs>
        <rect width={totalW} height={totalH} fill="url(#grid2d)"/>

        {/* FRONT VIEW */}
        <PinShape cx={fx} fill="url(#faceGrad2)"/>
        {/* Sheen */}
        {config.shape === 'circle'
          ? <ellipse cx={fx-fw*0.1} cy={cy-fh*0.15} rx={fw*0.18} ry={fh*0.09} fill="rgba(255,255,255,0.22)"/>
          : <rect x={fx-fw*0.28} y={cy-fh*0.3} width={fw*0.18} height={fh*0.15} fill="rgba(255,255,255,0.22)" rx="1"/>
        }
        {viewLabel('FRONT VIEW', fx, cy+fh/2+14)}
        {dimLine(fx-fw/2, cy+fh/2+22, fx+fw/2, cy+fh/2+22, sizeLabel)}
        <line x1={fx-fw/2} y1={cy+fh/2+4} x2={fx-fw/2} y2={cy+fh/2+25} stroke="#3366aa" strokeWidth="0.4"/>
        <line x1={fx+fw/2} y1={cy+fh/2+4} x2={fx+fw/2} y2={cy+fh/2+25} stroke="#3366aa" strokeWidth="0.4"/>

        {/* SIDE VIEW */}
        <rect x={sx-sw/2} y={cy-fh/2} width={sw} height={fh} fill="url(#faceGrad2)" stroke={pinStroke} strokeWidth="0.5"/>
        {viewLabel('SIDE VIEW', sx, cy+fh/2+14)}
        {dimLine(sx-sw/2, cy+fh/2+22, sx+sw/2, cy+fh/2+22, thickLabel)}
        <line x1={sx-sw/2} y1={cy+fh/2+4} x2={sx-sw/2} y2={cy+fh/2+25} stroke="#3366aa" strokeWidth="0.4"/>
        <line x1={sx+sw/2} y1={cy+fh/2+4} x2={sx+sw/2} y2={cy+fh/2+25} stroke="#3366aa" strokeWidth="0.4"/>

        {/* BACK VIEW */}
        <PinShape cx={bx} fill="url(#faceGrad2)"/>
        {/* Attachment indicator */}
        {(config.attachment === 'magnet' || config.attachment === 'magnet_2x') && (() => {
          const isDual = config.attachment === 'magnet_2x';
          const magR = ((config.magnetSize||12)/2)/25.4*SC;
          const gap = magR * 0.4;
          const offsets = isDual ? [-(magR + gap), +(magR + gap)] : [0];
          const barLen   = 2 * (2 * magR + gap) * 1.18;    // ~18 % past outer edges
          const barW     = magR * 2 * 1.1;          // 10 % wider than Ø
          const maskId = `mag-bar-mask-${config.attachment}`;
          return (
            <g>
              {isDual && (
                <>
                  {/* Mask cuts circular holes through the bar where the magnets sit */}
                  <defs>
                    <mask id={maskId}>
                      <rect x={bx - barLen/2 - 2} y={cy - barW/2 - 2}
                            width={barLen + 4} height={barW + 4} fill="white"/>
                      {offsets.map((ox, i) => (
                        <circle key={i} cx={bx + ox} cy={cy} r={magR * 1.02} fill="black"/>
                      ))}
                    </mask>
                  </defs>
                  <rect x={bx - barLen/2} y={cy - barW/2} width={barLen} height={barW}
                    rx="1.5" fill="rgba(90,93,99,0.22)" stroke="#5a5d63"
                    strokeWidth="0.8" strokeDasharray="2 1.5"
                    mask={`url(#${maskId})`}/>
                </>
              )}
              {offsets.map((ox, i) => (
                <g key={i}>
                  <circle cx={bx + ox} cy={cy} r={magR}
                    fill="rgba(136,136,136,0.18)" stroke="#666" strokeWidth="0.9" strokeDasharray="2 1"/>
                  <text x={bx + ox} y={cy + 3.5} fontSize="5.5" fill="#555" textAnchor="middle"
                    fontFamily="monospace" fontWeight="bold" letterSpacing="0.3">MAGNET</text>
                  <text x={bx + ox} y={cy + 10} fontSize="4.5" fill="#888" textAnchor="middle"
                    fontFamily="monospace">{config.magnetSize||12}mm</text>
                </g>
              ))}
            </g>
          );
        })()}
        {(config.attachment !== 'no_backing' && config.attachment !== 'magnet' && config.attachment !== 'magnet_2x') && (() => {
          const isDual = config.attachment === 'rubber_clutch_2x' || config.attachment === 'deluxe_clutch_2x' || config.attachment === 'military_2x';
          const widthMm = ATTACHMENT_SIZES_MM[config.attachment] || DEFAULT_ATTACHMENT_MM;
          const r = (widthMm / 2) / 25.4 * SC;
          const offsets = isDual ? [-(r * 1.4), +(r * 1.4)] : [0];
          return offsets.map((ox, i) => (
            <circle key={i} cx={bx + ox} cy={cy} r={r}
              fill="rgba(60,60,60,0.08)"
              stroke={hexDarken(plating.color, 0.55)} strokeWidth="0.8" strokeDasharray="2 1.5"/>
          ));
        })()}
        {/* Back text */}
        {backText && (
          <text x={bx} y={cy+2} fontSize={Math.min(9, fw/backText.length * 1.5)} fill="rgba(80,60,20,0.7)"
            textAnchor="middle" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5"
            style={{ dominantBaseline: 'middle' }}>
            {backText.length > 24 ? backText.slice(0,22)+'…' : backText}
          </text>
        )}
        {!backText && (
          <text x={bx} y={cy+3} fontSize="5" fill="rgba(80,60,20,0.4)" textAnchor="middle" fontFamily="sans-serif" fontStyle="italic">Add your design</text>
        )}
        {viewLabel('BACK VIEW', bx, cy+fh/2+14)}

        {/* Cross-wires */}
        <line x1={fx+fw/2+2} y1={cy} x2={sx-sw/2-2} y2={cy} stroke="#3366aa" strokeWidth="0.3" strokeDasharray="3 2" opacity="0.4"/>
        <line x1={sx+sw/2+2} y1={cy} x2={bx-fw/2-2} y2={cy} stroke="#3366aa" strokeWidth="0.3" strokeDasharray="3 2" opacity="0.4"/>
      </svg>
      <div style={{ marginTop:10, alignSelf:'stretch', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, fontSize:9, fontFamily:'monospace', color:'#8899bb', letterSpacing:1 }}>
        <div style={{ maxWidth:'72%', lineHeight:1.5, color:'#7a8aa8', letterSpacing:0.3, textTransform:'none', fontFamily:'inherit' }}>
          <span style={{ color:'#b07a1a', fontWeight:700, letterSpacing:1, textTransform:'uppercase' }}>For preview only — </span>
          color, material, texture &amp; size may differ from the final product. Please contact us for details.
        </div>
        <div style={{ whiteSpace:'nowrap' }}>
          SCALE: 1:1 &nbsp;|&nbsp; MATERIAL HONESTY: DIRECT-TO-FACTORY
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Pin3DViewer, Pin2DFlat, PLATINGS, SIZES_IN, hexDarken, lighten, loadPBRTextures, applyPBRToMaterial });
