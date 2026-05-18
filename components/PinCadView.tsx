"use client";

import { usePinCustomization } from "@/lib/usePinCustomization";
import { PLATING_COLORS } from "@/lib/pinConfig";

// ── Pin depth by style (mm) ────────────────────────────────────────────────────
const STYLE_DEPTH_MM: Record<string, number> = {
  hard_enamel: 2.2,
  soft_enamel: 1.8,
  die_struck: 1.5,
  "3d_mold": 5.0,
  laser_cut: 1.5,
  acrylic: 2.5,
};

// ── SVG canvas & layout constants ─────────────────────────────────────────────
const VW = 900;       // total SVG width
const VH = 520;       // total SVG height
const CY = 220;       // vertical center of all three views

// Panel center X positions
const F_CX = 155;     // Front view
const S_CX = 390;     // Side view
const B_CX = 615;     // Back view

// Max drawable px for the largest pin dimension
const MAX_DRAW = 200;

// Dim-line layout
const DIM_GAP   = 14;   // gap from shape edge → extension line start
const DIM_EXT   = 28;   // extension-line length beyond dim line
const ARR        = 6;    // arrowhead size

// Colors
const CLR = {
  dim:      "#2563EB",
  dimFill:  "#dbeafe",
  outline:  "#0f172a",
  rimOutline: "#374151",
  face:     "#f8fafc",
  label:    "#64748b",
  ext:      "#94a3b8",
  bg:       "#f8fafc",
  panel:    "#eef2ff",
  gridLine: "#c7d2fe",
  depth:    "#cbd5e1",
  depthDk:  "#94a3b8",
  attLine:  "#1e3a8a",
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function lighten(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, (n >> 16) + amt);
  const g = Math.min(255, ((n >> 8) & 0xff) + amt);
  const b = Math.min(255, (n & 0xff) + amt);
  return `rgb(${r},${g},${b})`;
}

function darken(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (n >> 16) - amt);
  const g = Math.max(0, ((n >> 8) & 0xff) - amt);
  const b = Math.max(0, (n & 0xff) - amt);
  return `rgb(${r},${g},${b})`;
}

/** Horizontal CAD dimension line with arrowheads and a centred label */
function HorizDim({
  x1, x2, y, label, extTop = false,
}: {
  x1: number; x2: number; y: number; label: string; extTop?: boolean;
}) {
  const mid = (x1 + x2) / 2;
  const ey1 = extTop ? y - DIM_EXT : y + DIM_GAP;
  const ey2 = extTop ? y - DIM_GAP : y + DIM_EXT;
  return (
    <g>
      {/* Extension lines */}
      <line x1={x1} y1={ey1} x2={x1} y2={ey2} stroke={CLR.ext} strokeWidth={0.8} strokeDasharray="3 2" />
      <line x1={x2} y1={ey1} x2={x2} y2={ey2} stroke={CLR.ext} strokeWidth={0.8} strokeDasharray="3 2" />
      {/* Dimension line */}
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={CLR.dim} strokeWidth={1.2} />
      {/* Arrowheads */}
      <polygon points={`${x1},${y} ${x1 + ARR},${y - ARR / 2} ${x1 + ARR},${y + ARR / 2}`} fill={CLR.dim} />
      <polygon points={`${x2},${y} ${x2 - ARR},${y - ARR / 2} ${x2 - ARR},${y + ARR / 2}`} fill={CLR.dim} />
      {/* Label background + text */}
      <rect x={mid - 26} y={y - 9} width={52} height={16} rx={3} fill="white" />
      <text x={mid} y={y + 4} textAnchor="middle" fontSize={10} fill={CLR.dim} fontFamily="monospace" fontWeight="600">
        {label}
      </text>
    </g>
  );
}

/** Vertical CAD dimension line */
function VertDim({
  x, y1, y2, label, extRight = false,
}: {
  x: number; y1: number; y2: number; label: string; extRight?: boolean;
}) {
  const mid = (y1 + y2) / 2;
  const ex1 = extRight ? x + DIM_GAP : x - DIM_EXT;
  const ex2 = extRight ? x + DIM_EXT : x - DIM_GAP;
  return (
    <g>
      <line x1={ex1} y1={y1} x2={ex2} y2={y1} stroke={CLR.ext} strokeWidth={0.8} strokeDasharray="3 2" />
      <line x1={ex1} y1={y2} x2={ex2} y2={y2} stroke={CLR.ext} strokeWidth={0.8} strokeDasharray="3 2" />
      <line x1={x} y1={y1} x2={x} y2={y2} stroke={CLR.dim} strokeWidth={1.2} />
      <polygon points={`${x},${y1} ${x - ARR / 2},${y1 + ARR} ${x + ARR / 2},${y1 + ARR}`} fill={CLR.dim} />
      <polygon points={`${x},${y2} ${x - ARR / 2},${y2 - ARR} ${x + ARR / 2},${y2 - ARR}`} fill={CLR.dim} />
      <rect x={x - 26} y={mid - 8} width={52} height={16} rx={3} fill="white" />
      <text x={x} y={mid + 4} textAnchor="middle" fontSize={10} fill={CLR.dim} fontFamily="monospace" fontWeight="600">
        {label}
      </text>
    </g>
  );
}

/** CAD view panel border + label */
function ViewPanel({
  x, y, w, h, title,
}: {
  x: number; y: number; w: number; h: number; title: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} fill={CLR.panel} stroke={CLR.dim} strokeWidth={1} />
      <text x={x + w / 2} y={y + h + 18} textAnchor="middle" fontSize={11} fill={CLR.label}
        fontFamily="monospace" fontWeight="700" letterSpacing="1">
        {title}
      </text>
    </g>
  );
}

/** Dashed centre-line cross */
function CentreLines({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g stroke={CLR.dim} strokeWidth={0.6} strokeDasharray="6 3" opacity={0.5}>
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} />
      <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} />
    </g>
  );
}

// ── Attachment schematic (top-down/back view) ──────────────────────────────────

function AttachmentSchematic({
  type, cx, cy, pinW,
}: {
  type: string; cx: number; cy: number; pinW: number;
}) {
  const s = pinW * 0.28; // schematic radius relative to pin width

  const SingleSchematic = ({ ox = 0 }: { ox?: number }) => {
    switch (type.replace("two_", "")) {
      case "rubber_clutch":
        return (
          <g transform={`translate(${ox},0)`}>
            <circle cx={cx} cy={cy} r={s * 0.55} fill="none" stroke={CLR.attLine} strokeWidth={1.2} />
            <circle cx={cx} cy={cy} r={s * 0.18} fill={CLR.attLine} opacity={0.6} />
          </g>
        );
      case "deluxe_clutch":
        return (
          <g transform={`translate(${ox},0)`}>
            <circle cx={cx} cy={cy} r={s * 0.70} fill="none" stroke={CLR.attLine} strokeWidth={1.2} />
            <circle cx={cx} cy={cy} r={s * 0.32} fill="none" stroke={CLR.attLine} strokeWidth={1} />
            <circle cx={cx} cy={cy} r={s * 0.12} fill={CLR.attLine} />
          </g>
        );
      case "military_clutch": {
        const arms = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];
        return (
          <g transform={`translate(${ox},0)`}>
            <circle cx={cx} cy={cy} r={s * 0.65} fill="none" stroke={CLR.attLine} strokeWidth={1.2} />
            <circle cx={cx} cy={cy} r={s * 0.18} fill={CLR.attLine} opacity={0.8} />
            {arms.map((a, i) => (
              <line key={i}
                x1={cx} y1={cy}
                x2={cx + Math.cos(a) * s * 0.55}
                y2={cy + Math.sin(a) * s * 0.55}
                stroke={CLR.attLine} strokeWidth={2.5} strokeLinecap="round"
              />
            ))}
            {arms.map((a, i) => (
              <circle key={i}
                cx={cx + Math.cos(a) * s * 0.55}
                cy={cy + Math.sin(a) * s * 0.55}
                r={s * 0.10} fill={CLR.attLine}
              />
            ))}
          </g>
        );
      }
      case "safety_pin": {
        const bw = s * 1.3;
        return (
          <g transform={`translate(${ox},0)`}>
            <line x1={cx - bw} y1={cy} x2={cx + bw} y2={cy} stroke={CLR.attLine} strokeWidth={2} strokeLinecap="round" />
            <circle cx={cx - bw} cy={cy} r={s * 0.18} fill="none" stroke={CLR.attLine} strokeWidth={1.2} />
            <rect x={cx + bw - s * 0.2} y={cy - s * 0.2} width={s * 0.35} height={s * 0.38}
              rx={2} fill="none" stroke={CLR.attLine} strokeWidth={1.2} />
            <line x1={cx - bw + s * 0.1} y1={cy - s * 0.22}
              x2={cx + bw - s * 0.1} y2={cy - s * 0.22}
              stroke={CLR.attLine} strokeWidth={1} strokeLinecap="round" />
          </g>
        );
      }
      case "magnet_back":
        return (
          <g transform={`translate(${ox},0)`}>
            <circle cx={cx} cy={cy} r={s * 0.72} fill="none" stroke={CLR.attLine} strokeWidth={1.5} />
            <circle cx={cx} cy={cy} r={s * 0.45} fill={CLR.attLine} opacity={0.15} stroke={CLR.attLine} strokeWidth={1} />
            <text x={cx} y={cy + 4} textAnchor="middle" fontSize={s * 0.35} fill={CLR.attLine} fontFamily="serif" fontWeight="bold">N</text>
          </g>
        );
      default:
        return null;
    }
  };

  if (type.startsWith("two_")) {
    const off = s * 0.62;
    return (
      <>
        <SingleSchematic ox={-off} />
        <SingleSchematic ox={off} />
      </>
    );
  }
  return <SingleSchematic />;
}

// ── Main component ─────────────────────────────────────────────────────────────

export function PinCadView() {
  const { shape, sizeWidth, sizeHeight, partMaterials, style, attachment, backSide, laserEngravingText } =
    usePinCustomization();

  const wMm = sizeWidth * 10;   // cm → mm
  const hMm = sizeHeight * 10;
  const depthMm = STYLE_DEPTH_MM[style] ?? 2.0;

  // Scale: fit max dimension into MAX_DRAW px
  const scale = Math.min(MAX_DRAW / Math.max(wMm, hMm), 8);

  const pinW = wMm * scale;   // displayed pin width (px)
  const pinH = hMm * scale;   // displayed pin height (px)
  const pinD = Math.max(depthMm * scale, 6); // displayed depth (px, min 6)

  const faceColor = PLATING_COLORS[partMaterials.face] ?? "#D4AF37";
  const rimColor  = PLATING_COLORS[partMaterials.rim]  ?? PLATING_COLORS.gold;
  const backColor = PLATING_COLORS[partMaterials.back] ?? PLATING_COLORS.gold;

  // ── Panel bounds ─────────────────────────────────────────────────────────────
  const fHalfW = pinW / 2 + 4; // panel half-width with a little padding
  const fHalfH = pinH / 2 + 4;
  const sHalfW = Math.max(pinD / 2 + 6, 20);
  const bHalfW = fHalfW;

  const PANEL_PAD = 4;
  const F_LEFT  = F_CX - fHalfW - PANEL_PAD;
  const F_RIGHT = F_CX + fHalfW + PANEL_PAD;
  const F_TOP   = CY - fHalfH - PANEL_PAD;
  const F_BOT   = CY + fHalfH + PANEL_PAD;
  const F_PW    = F_RIGHT - F_LEFT;
  const F_PH    = F_BOT - F_TOP;

  const S_LEFT  = S_CX - sHalfW - PANEL_PAD;
  const S_RIGHT = S_CX + sHalfW + PANEL_PAD;
  const S_PW    = S_RIGHT - S_LEFT;

  const B_LEFT  = B_CX - bHalfW - PANEL_PAD;
  const B_RIGHT = B_CX + bHalfW + PANEL_PAD;
  const B_PW    = B_RIGHT - B_LEFT;

  // Dimension label strings
  const wLabel = `${sizeWidth.toFixed(1)} cm  (${(sizeWidth / 2.54).toFixed(2)}")`;
  const hLabel = `${sizeHeight.toFixed(1)} cm  (${(sizeHeight / 2.54).toFixed(2)}")`;
  const dLabel = `${depthMm.toFixed(1)} mm`;

  // Shared horizontal dim Y (below all three panels)
  const DIM_Y = CY + fHalfH + PANEL_PAD + 32;
  // Vertical dim X (left of front panel)
  const DIM_X = F_LEFT - 32;

  const isCircle = shape === "circle" || (shape === "square" && sizeWidth === sizeHeight);
  const isSquare = shape === "square";

  // ── Pin face shape rendering ─────────────────────────────────────────────────
  function PinShape({
    cx, cy, fillId, strokeColor,
  }: {
    cx: number; cy: number; fillId: string; strokeColor: string;
  }) {
    if (isCircle) {
      return (
        <g>
          <circle cx={cx} cy={cy} r={pinW / 2 + 3} fill={strokeColor} />
          <circle cx={cx} cy={cy} r={pinW / 2} fill={`url(#${fillId})`} />
        </g>
      );
    }
    const rx = isSquare ? 4 : 3;
    return (
      <g>
        <rect x={cx - pinW / 2 - 3} y={cy - pinH / 2 - 3} width={pinW + 6} height={pinH + 6}
          rx={rx + 2} fill={strokeColor} />
        <rect x={cx - pinW / 2} y={cy - pinH / 2} width={pinW} height={pinH}
          rx={rx} fill={`url(#${fillId})`} />
      </g>
    );
  }

  // ── Side profile shape ───────────────────────────────────────────────────────
  // Shows the edge-on view: a thin rectangle with rounded sides
  function SideProfile() {
    const h = pinH;
    const d = pinD;
    return (
      <g>
        <rect x={S_CX - d / 2} y={CY - h / 2} width={d} height={h}
          rx={2} fill={`url(#sideGrad)`} stroke={CLR.outline} strokeWidth={1} />
        {/* subtle highlight line on left edge */}
        <line x1={S_CX - d / 2 + 2} y1={CY - h / 2 + 4}
          x2={S_CX - d / 2 + 2} y2={CY + h / 2 - 4}
          stroke="white" strokeWidth={1.2} opacity={0.5} />
      </g>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        width="100%"
        height="100%"
        style={{ maxHeight: "100%", fontFamily: "monospace" }}
      >
        {/* ── Defs: gradients ─────────────────────────────────────────────── */}
        <defs>
          {/* Face gradient */}
          <radialGradient id="faceGrad" cx="38%" cy="32%" r="65%">
            <stop offset="0%"  stopColor={lighten(faceColor, 55)} />
            <stop offset="60%" stopColor={faceColor} />
            <stop offset="100%" stopColor={darken(faceColor, 35)} />
          </radialGradient>
          {/* Back gradient */}
          <radialGradient id="backGrad" cx="38%" cy="32%" r="65%">
            <stop offset="0%"  stopColor={lighten(backColor, 45)} />
            <stop offset="60%" stopColor={backColor} />
            <stop offset="100%" stopColor={darken(backColor, 30)} />
          </radialGradient>
          {/* Side gradient */}
          <linearGradient id="sideGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor={darken(rimColor, 30)} />
            <stop offset="40%" stopColor={lighten(rimColor, 30)} />
            <stop offset="100%" stopColor={darken(rimColor, 20)} />
          </linearGradient>
          {/* Subtle grid pattern */}
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={CLR.gridLine} strokeWidth={0.4} />
          </pattern>
        </defs>

        {/* ── Background ──────────────────────────────────────────────────── */}
        <rect width={VW} height={VH} fill="white" />
        <rect width={VW} height={VH} fill="url(#grid)" opacity={0.5} />

        {/* ── Title block ──────────────────────────────────────────────────── */}
        <rect x={0} y={VH - 40} width={VW} height={40} fill="#f1f5f9" stroke={CLR.ext} strokeWidth={0.5} />
        <text x={20} y={VH - 15} fontSize={10} fill={CLR.label} fontWeight="600">
          ORTHOGRAPHIC PROJECTION  —  LAPEL PIN
        </text>
        <text x={VW - 20} y={VH - 22} textAnchor="end" fontSize={9} fill={CLR.label}>
          SCALE: 1:{(10 / scale).toFixed(1)}
        </text>
        <text x={VW - 20} y={VH - 10} textAnchor="end" fontSize={9} fill={CLR.label}>
          UNIT: cm / mm
        </text>

        {/* ── FRONT VIEW ───────────────────────────────────────────────────── */}
        <ViewPanel x={F_LEFT} y={F_TOP} w={F_PW} h={F_PH} title="FRONT VIEW" />
        <CentreLines cx={F_CX} cy={CY} r={Math.max(pinW, pinH) / 2 + 20} />
        <PinShape cx={F_CX} cy={CY} fillId="faceGrad" strokeColor={darken(rimColor, 10)} />

        {/* Width dim (below) */}
        <HorizDim
          x1={F_CX - pinW / 2} x2={F_CX + pinW / 2}
          y={DIM_Y}
          label={wLabel}
        />
        {/* Height dim (left) */}
        <VertDim
          x={DIM_X}
          y1={CY - pinH / 2} y2={CY + pinH / 2}
          label={hLabel}
        />

        {/* ── SIDE VIEW ────────────────────────────────────────────────────── */}
        <ViewPanel x={S_LEFT} y={F_TOP} w={S_PW} h={F_PH} title="SIDE VIEW" />
        <CentreLines cx={S_CX} cy={CY} r={Math.max(pinD, pinH) / 2 + 12} />
        <SideProfile />

        {/* Depth dim (right of side view) */}
        <HorizDim
          x1={S_CX - pinD / 2} x2={S_CX + pinD / 2}
          y={DIM_Y}
          label={dLabel}
        />

        {/* Projection lines: front → side */}
        <line x1={F_RIGHT + 2} y1={CY - pinH / 2} x2={S_LEFT - 2} y2={CY - pinH / 2}
          stroke={CLR.ext} strokeWidth={0.6} strokeDasharray="4 3" />
        <line x1={F_RIGHT + 2} y1={CY + pinH / 2} x2={S_LEFT - 2} y2={CY + pinH / 2}
          stroke={CLR.ext} strokeWidth={0.6} strokeDasharray="4 3" />

        {/* ── BACK VIEW ────────────────────────────────────────────────────── */}
        <ViewPanel x={B_LEFT} y={F_TOP} w={B_PW} h={F_PH} title="BACK VIEW" />
        <CentreLines cx={B_CX} cy={CY} r={Math.max(pinW, pinH) / 2 + 20} />
        <PinShape cx={B_CX} cy={CY} fillId="backGrad" strokeColor={darken(backColor, 10)} />
        {/* Attachment schematic overlay */}
        <AttachmentSchematic type={attachment} cx={B_CX} cy={CY} pinW={pinW} />
        {/* Laser engraving text overlay */}
        {backSide === "laser_engraving" && (() => {
          const maxR = Math.min(pinW, pinH) / 2;
          const displayText = laserEngravingText.trim() || "Add your own text";
          const isPlaceholder = !laserEngravingText.trim();
          const maxChars = 18;
          const fontSize = displayText.length > maxChars
            ? Math.max(7, Math.floor(12 * (maxChars / displayText.length)))
            : 12;
          const words = displayText.split(" ");
          const lines: string[] = [];
          let cur = "";
          for (const w of words) {
            const test = cur ? `${cur} ${w}` : w;
            if (test.length > maxChars && cur) { lines.push(cur); cur = w; }
            else { cur = test; }
          }
          if (cur) lines.push(cur);
          const lh = fontSize * 1.4;
          const totalH = lines.length * lh;
          const startY = CY - totalH / 2 + lh / 2;
          return (
            <g opacity={isPlaceholder ? 0.35 : 0.8}>
              {/* Subtle engraving area border */}
              <rect
                x={B_CX - maxR * 0.7} y={CY - maxR * 0.35}
                width={maxR * 1.4} height={maxR * 0.7}
                rx={3}
                fill="none"
                stroke={darken(backColor, 50)}
                strokeWidth={0.6}
                strokeDasharray="3 2"
              />
              {lines.map((line, i) => (
                <text
                  key={i}
                  x={B_CX}
                  y={startY + i * lh}
                  textAnchor="middle"
                  fontSize={fontSize}
                  fill={darken(backColor, 60)}
                  fontFamily="monospace"
                  fontWeight="600"
                  letterSpacing="0.5"
                >
                  {line}
                </text>
              ))}
              <text
                x={B_CX + pinW / 2 + 6} y={CY - maxR * 0.35 - 4}
                fontSize={7} fill={CLR.attLine} fontFamily="monospace"
              >
                LASER ENGRAVE
              </text>
            </g>
          );
        })()}

        {/* Width dim (below back view) */}
        <HorizDim
          x1={B_CX - pinW / 2} x2={B_CX + pinW / 2}
          y={DIM_Y}
          label={wLabel}
        />

        {/* Projection lines: side → back */}
        <line x1={S_RIGHT + 2} y1={CY - pinH / 2} x2={B_LEFT - 2} y2={CY - pinH / 2}
          stroke={CLR.ext} strokeWidth={0.6} strokeDasharray="4 3" />
        <line x1={S_RIGHT + 2} y1={CY + pinH / 2} x2={B_LEFT - 2} y2={CY + pinH / 2}
          stroke={CLR.ext} strokeWidth={0.6} strokeDasharray="4 3" />

        {/* ── Attachment label ─────────────────────────────────────────────── */}
        {attachment !== "no_backing" && (
          <>
            <line x1={B_CX + pinW / 2 + 6} y1={CY} x2={B_CX + pinW / 2 + 30} y2={CY - 22}
              stroke={CLR.attLine} strokeWidth={0.8} />
            <rect x={B_CX + pinW / 2 + 28} y={CY - 32} width={110} height={16} rx={3} fill="white" />
            <text x={B_CX + pinW / 2 + 33} y={CY - 20}
              fontSize={9} fill={CLR.attLine} fontWeight="600" fontFamily="monospace">
              {attachment.replace(/_/g, " ").toUpperCase()}
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
