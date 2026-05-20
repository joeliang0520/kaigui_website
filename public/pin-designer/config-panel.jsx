// config-panel.jsx — All 6 tab content components

// ── Shared helpers ──────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#7a6030', marginBottom: 6 }}>{children}</div>;
}

function StepHeading({ step, sub }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <SectionLabel>{step}</SectionLabel>
      <p style={{ fontSize: 13, color: '#666', marginTop: 2 }}>{sub}</p>
    </div>);

}

function OptionBtn({ label, selected, onClick, badge, color, loading, style: extra }) {
  return (
    <button onClick={onClick} style={{
      padding: '10px 14px', border: selected ? '2px solid #c49a3a' : '1.5px solid #d8d0c0',
      background: selected ? '#fdf6e3' : '#fafaf8', borderRadius: 2, cursor: 'pointer',
      fontSize: 13, fontWeight: selected ? 600 : 400, color: selected ? '#8a6520' : '#333',
      textAlign: 'left', position: 'relative', transition: 'border-color 0.15s, background 0.15s',
      display: 'flex', alignItems: 'center', gap: 8, ...extra
    }}
    onMouseEnter={(e) => {if (!selected) {e.currentTarget.style.borderColor = '#c49a3a';e.currentTarget.style.background = '#fffcf5';}}}
    onMouseLeave={(e) => {if (!selected) {e.currentTarget.style.borderColor = '#d8d0c0';e.currentTarget.style.background = '#fafaf8';}}}>
      
      {color && <span style={{ width: 14, height: 14, borderRadius: '50%', background: color, border: '1px solid rgba(0,0,0,0.2)', flexShrink: 0 }} />}
      <span style={{ flex: 1 }}>{label}</span>
      {loading &&
      <span style={{
        width: 13, height: 13, borderRadius: '50%',
        border: '1.8px solid rgba(196,154,58,0.25)',
        borderTopColor: '#c49a3a',
        animation: 'pin-spin 0.7s linear infinite',
        flexShrink: 0
      }} />
      }
      {!loading && badge && <span style={{ fontSize: 9, padding: '2px 6px', background: '#c49a3a', color: 'white', borderRadius: 2, fontWeight: 700, letterSpacing: 0.5 }}>{badge}</span>}
    </button>);

}

function InfoBox({ title, text, image }) {
  return (
    <div style={{ marginTop: 16, border: '1px solid #e8d89a', borderRadius: 2, overflow: 'hidden' }}>
      {image &&
      <div style={{ background: '#fff', borderBottom: '1px solid #f0e4b8', padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={image} alt={title}
        style={{ maxWidth: '100%', maxHeight: 200, display: 'block', objectFit: "contain" }}
        onError={(e) => {e.currentTarget.style.display = 'none';}} />
        
        </div>
      }
      <div style={{ padding: '12px 14px', background: '#fdf6e3' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#7a6030', textTransform: 'uppercase', marginBottom: 4 }}>{title}</div>
        <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>{text}</p>
      </div>

    </div>);

}

function Slider({ label, value, min, max, step, unit, onChange, hint }) {
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <SectionLabel>{label}</SectionLabel>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#c49a3a' }}>{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      style={{ width: '100%', accentColor: '#c49a3a', cursor: 'pointer' }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#aaa', marginTop: 2 }}>
        <span>{min}{unit}</span>
        {hint && <span style={{ color: '#999', fontStyle: 'italic' }}>{hint}</span>}
        <span>{max}{unit}</span>
      </div>
    </div>);

}

// ── 1. Shape & Size ─────────────────────────────────────────────────────────

const SHAPES = [
{ id: 'rectangle', label: 'Rectangle' }, { id: 'square', label: 'Square' },
{ id: 'circle', label: 'Circle' }, { id: 'custom', label: 'Custom Shape' }];

const RECT_PRESETS = [
{ label: '2×1 cm', w: 2, h: 1 },   { label: '3×2 cm',  w: 3,  h: 2 },
{ label: '4×2 cm', w: 4, h: 2 },   { label: '4×3 cm',  w: 4,  h: 3 },
{ label: '5×3 cm', w: 5, h: 3 },   { label: '6×3 cm',  w: 6,  h: 3 },
{ label: '6×4 cm', w: 6, h: 4 },   { label: '8×5 cm',  w: 8,  h: 5 },
{ label: '10×6 cm', w: 10, h: 6 }, { label: '12×8 cm', w: 12, h: 8 }];


function ShapeTab({ config, setConfig }) {
  const isSingle = config.shape === 'circle' || config.shape === 'square';
  const [customVal, setCustomVal] = React.useState('');
  const [customH, setCustomH] = React.useState('');

  const setShape = (id) => setConfig((c) => ({ ...c, shape: id, sizeH: id === 'circle' || id === 'square' ? c.size : c.sizeH }));
  const setSize = (v) => setConfig((c) => ({ ...c, size: v, sizeH: isSingle ? v : c.sizeH }));
  const setRect = (w, h) => setConfig((c) => ({ ...c, size: w, sizeH: h }));

  return (
    <div>
      <StepHeading step="Step 1: Select Shape & Size" sub="Choose the form factor for your pin." />

      <SectionLabel>Shape</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 20 }}>
        {SHAPES.map((s) => <OptionBtn key={s.id} label={s.label} selected={config.shape === s.id} onClick={() => setShape(s.id)} />)}
      </div>

      {config.shape === 'custom' ?
      <InfoBox title="Custom Shape" text="Upload a vector file (AI, EPS, SVG, PDF) or 3D model in the upload section below. Our team will use it to create your unique pin shape." /> :

      <>
          {isSingle && (
            <>
              <SectionLabel>{config.shape === 'circle' ? 'Diameter (cm)' : 'Side length (cm)'}</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 16 }}>
                {window.SIZES_IN.map((s) =>
                  <OptionBtn key={s.value} label={s.label} selected={Math.abs(config.size - s.value) < 0.01}
                    onClick={() => setSize(s.value)}
                    style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 1, minHeight: 56 }} />
                )}
              </div>
            </>
          )}

          {config.shape === 'rectangle' &&
        <>
              <SectionLabel>Rectangle Presets</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 16 }}>
                {RECT_PRESETS.map((p) =>
            <OptionBtn key={p.label} label={p.label}
            selected={Math.abs(config.size - p.w) < 0.01 && Math.abs(config.sizeH - p.h) < 0.01}
            onClick={() => setRect(p.w, p.h)} />
            )}
              </div>
            </>
        }

          <SectionLabel>Custom size (cm)</SectionLabel>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
            <input type="text" inputMode="decimal" placeholder="e.g. 4.5" value={customVal}
          onChange={(e) => {setCustomVal(e.target.value);const v = parseFloat(e.target.value);if (!isNaN(v) && v >= 0.5 && v <= 15) setSize(v);}}
          style={{ flex: 1, padding: '9px 12px', border: '1.5px solid #d8d0c0', borderRadius: 2, fontSize: 13, outline: 'none', fontFamily: 'inherit' }} />
          
            {!isSingle && <>
              <span style={{ color: '#888', fontSize: 14 }}>×</span>
              <input type="text" inputMode="decimal" placeholder="height" value={customH}
            onChange={(e) => {setCustomH(e.target.value);const v = parseFloat(e.target.value);if (!isNaN(v) && v >= 0.5 && v <= 15) setConfig((c) => ({ ...c, sizeH: v }));}}
            style={{ flex: 1, padding: '9px 12px', border: '1.5px solid #d8d0c0', borderRadius: 2, fontSize: 13, outline: 'none', fontFamily: 'inherit' }} />
            
            </>}
            <span style={{ color: '#888', fontSize: 13 }}>cm</span>
          </div>
          <p style={{ fontSize: 11, color: '#999', marginBottom: 20 }}>0.5 – 15 cm per dimension</p>

          {/* Thickness slider */}
          <Slider label="Pin Thickness" value={config.thickness || 2.2} min={1.0} max={5.0} step={0.1} unit=" mm"
        hint="Standard: 2.2mm"
        onChange={(v) => setConfig((c) => ({ ...c, thickness: v }))} />

          <div style={{ marginTop: 14, padding: '12px 14px', background: '#f0f4f8', borderRadius: 2, fontSize: 12, color: '#555' }}>
            <strong>Current:</strong>&nbsp;
            {isSingle ?
          `⌀ ${config.size.toFixed(2)} cm · ${(config.size * 10).toFixed(1)}mm` :
          `${config.size.toFixed(2)} × ${config.sizeH.toFixed(2)} cm`
          } &nbsp;·&nbsp; Thickness: {(config.thickness || 2.2).toFixed(1)} mm
          </div>
        </>
      }
    </div>);

}

// ── 2. Material ──────────────────────────────────────────────────────────────

const MATERIAL_INFO = {
  gold: { title: 'Gold Plating', desc: 'The most popular choice for lapel pins. Gives a classic, premium, eye-catching look. Ideal for awards, corporate pins, and commemorative designs.' },
  silver: { title: 'Silver Plating', desc: 'Bright, reflective finish with a clean modern look. Pairs beautifully with cool-toned artwork.' },
  nickel: { title: 'Nickel Plating', desc: 'A muted silver alternative with a slightly warmer tone. Very durable and cost-effective.' },
  black_nickel: { title: 'Black Nickel', desc: 'Bold, edgy dark metallic finish. Great for dark-themed artwork and streetwear aesthetics.' },
  copper: { title: 'Copper Plating', desc: 'Warm reddish-brown tones with natural character. Perfect for vintage and artisan-style designs.' },
  antique_gold: { title: 'Antique Gold', desc: 'Aged, matte gold with a heritage feel. Excellent for historical, military, and commemorative pins.' },
  antique_silver: { title: 'Antique Silver', desc: 'Oxidized silver look with depth and vintage character. Popular for craft and collectible pins.' },
  antique_copper: { title: 'Antique Copper', desc: 'Deep, rich warm tones with an aged patina effect. A distinctive and artisanal choice.' },
  dyed_black: { title: 'Dyed Black', desc: 'Flat matte black with maximum contrast. Bold and contemporary, ideal for minimalist designs.' }
};

function MaterialTab({ config, setConfig }) {
  const info = MATERIAL_INFO[config.material] || MATERIAL_INFO.gold;
  return (
    <div>
      <StepHeading step="Step 2: Choose Metal Finish" sub="Select the plating for your pin." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 20 }}>
        {window.PLATINGS.map((p) =>
        <OptionBtn key={p.id} label={p.name} selected={config.material === p.id} color={p.color}
        onClick={() => setConfig((c) => ({ ...c, material: p.id }))} />
        )}
      </div>
      <InfoBox title={info.title} text={info.desc} />
      <div style={{ marginTop: 16, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        {window.PLATINGS.map((p) =>
        <div key={p.id} title={p.name} onClick={() => setConfig((c) => ({ ...c, material: p.id }))} style={{
          width: config.material === p.id ? 28 : 20, height: config.material === p.id ? 28 : 20,
          borderRadius: '50%', background: p.color, cursor: 'pointer', transition: 'all 0.2s',
          border: config.material === p.id ? '2px solid #c49a3a' : '1px solid rgba(0,0,0,0.15)',
          boxShadow: config.material === p.id ? '0 0 0 3px #fdf6e3,0 0 0 4px #c49a3a' : 'inset 0 1px 3px rgba(0,0,0,0.3)'
        }} />
        )}
      </div>
    </div>);

}

// ── 3. Effects ───────────────────────────────────────────────────────────────

const EFFECTS = [
{ id: 'glow', label: 'Glow in the Dark', bg: '#c8eaff', border: '#7ab8e8', desc: 'Luminescent pigment that glows blue-green in darkness.' },
{ id: 'glitter', label: 'Glitter Color', bg: '#fef3c0', border: '#d4a820', desc: 'Metallic glitter particles suspended in enamel for a sparkling finish.' },
{ id: 'rhinestones', label: 'Rhinestones', bg: '#ede9ff', border: '#9988cc', desc: 'Hand-set crystal rhinestones applied to selected areas.' },
{ id: 'transparent', label: 'Transparent Color', bg: '#d0f0f8', border: '#56aac8', desc: 'See-through enamel fill that lets light pass through.' },
{ id: 'pearlescent', label: 'Pearlescent Color', bg: '#ffe0f0', border: '#cc88aa', desc: 'Pearl-shimmer pigment that shifts color with viewing angle.' }];


function EffectsTab({ config, setConfig }) {
  const toggle = (id) => setConfig((c) => ({
    ...c, effects: c.effects.includes(id) ? c.effects.filter((e) => e !== id) : [...c.effects, id]
  }));
  return (
    <div>
      <StepHeading step="Step 3: Special Effects" sub="Enhance your pin with optional decorative effects. Select multiple." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        {EFFECTS.map((fx) => {
          const on = config.effects.includes(fx.id);
          return (
            <button key={fx.id} onClick={() => toggle(fx.id)} style={{
              padding: '14px 12px', textAlign: 'left', cursor: 'pointer',
              background: on ? fx.bg : '#fafaf8',
              border: `${on ? 2 : 1.5}px solid ${on ? fx.border : '#d8d0c0'}`,
              borderRadius: 4, transition: 'all 0.15s'
            }}
            onMouseEnter={(e) => {if (!on) e.currentTarget.style.borderColor = fx.border;}}
            onMouseLeave={(e) => {if (!on) e.currentTarget.style.borderColor = '#d8d0c0';}}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: fx.border, display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: on ? '#333' : '#555', letterSpacing: 0.3 }}>{fx.label}</span>
                {on && <span style={{ marginLeft: 'auto', fontSize: 10, color: '#c49a3a', fontWeight: 700 }}>✓ ON</span>}
              </div>
              <p style={{ fontSize: 11, color: '#777', lineHeight: 1.5, margin: 0 }}>{fx.desc}</p>
            </button>);

        })}
      </div>
      {config.effects.length > 0 &&
      <div style={{ padding: '10px 14px', background: '#fdf6e3', border: '1px solid #e8d89a', borderRadius: 2, fontSize: 12, color: '#7a6030' }}>
          <strong>Active:</strong> {config.effects.map((id) => EFFECTS.find((e) => e.id === id)?.label).join(', ')}
        </div>
      }
    </div>);

}

// ── 4. Back Side ─────────────────────────────────────────────────────────────

const BACK_OPTIONS = [
{ id: 'plain', label: 'Plain Back', desc: 'Smooth, unadorned back. Simple and cost-effective.', image: 'option-images/backSide/plain_back.png' },
{ id: 'stamp', label: 'Back Stamp', desc: 'Custom text or logo stamped/debossed into the metal back. Great for branding marks.', image: 'option-images/backSide/back_stamp.png' },
{ id: 'engraving', label: 'Laser Engraving', desc: 'Precision laser-etched text or design on the reverse. Permanent and highly detailed.', image: 'option-images/backSide/laser_engraving.png' }];


function BackSideTab({ config, setConfig }) {
  const sel = BACK_OPTIONS.find((o) => o.id === config.backSide) || BACK_OPTIONS[0];
  return (
    <div>
      <StepHeading step="Step 4: Back Side" sub="Customize the reverse face of your pin." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 20 }}>
        {BACK_OPTIONS.map((o) => <OptionBtn key={o.id} label={o.label} selected={config.backSide === o.id} onClick={() => setConfig((c) => ({ ...c, backSide: o.id }))} />)}
      </div>
      {config.backSide === 'stamp' &&
      <div style={{ marginBottom: 16, padding: '14px 14px 12px', background: '#fdf6e3', border: '1.5px solid #e8d89a', borderRadius: 4 }}>
          <SectionLabel>Stamp Text (previewed on pin)</SectionLabel>
          <input type="text" placeholder="e.g. © Your Company 2025" maxLength={40}
        value={config.backText || ''} onChange={(e) => setConfig((c) => ({ ...c, backText: e.target.value }))}
        style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #d8c878', borderRadius: 2, fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', background: '#fffdf3' }} />
        
          <p style={{ fontSize: 11, color: '#8a7a3a', marginTop: 6, marginBottom: 0 }}>Max 40 characters · visible on 3D and 2D views</p>
        </div>
      }
      {config.backSide === 'engraving' &&
      <div style={{ marginBottom: 16, padding: '14px 14px 12px', background: '#fdf6e3', border: '1.5px solid #e8d89a', borderRadius: 4 }}>
          <SectionLabel>Engraving Text (previewed on pin)</SectionLabel>
          <textarea placeholder="Text to laser engrave on the back..." rows={3}
        value={config.engravingText || ''} onChange={(e) => setConfig((c) => ({ ...c, engravingText: e.target.value }))}
        style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #d8c878', borderRadius: 2, fontSize: 13, outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', background: '#fffdf3' }} />
        
          <p style={{ fontSize: 11, color: '#8a7a3a', marginTop: 6, marginBottom: 0 }}>Visible on 3D and 2D views</p>
        </div>
      }
      <InfoBox title={sel.label} text={sel.desc} image={sel.image} />
    </div>);

}

// ── 5. Attachment ────────────────────────────────────────────────────────────

const ATTACHMENTS = [
{ id: 'rubber_clutch', label: 'Rubber Clutch', desc: 'Soft rubber backing for easy attachment and removal. Comfortable on fabric.', image: 'option-images/attachment/rubber_clutch.png', glb: true },
{ id: 'rubber_clutch_2x', label: '2× Rubber Clutch', desc: 'Two rubber clutches provide extra stability for larger or heavier lapel pins. With two post and clutch sets, the pin stays flat against fabric and does not rotate. This is the recommended option for pins over 2 inches or pins with an irregular shape.', image: 'option-images/attachment/two_rubber_clutch.png', glb: true },
{ id: 'deluxe_clutch', label: 'Deluxe Clutch', desc: 'Premium metal clutch with superior grip. Best for heavier pins.', image: 'option-images/attachment/deluxe_clutch.png', glb: true },
{ id: 'deluxe_clutch_2x', label: '2× Deluxe Clutch', desc: 'Two deluxe clutches combine the premium locking hold of the deluxe clutch with the added stability of a dual-post design. Ideal for large collector pins, award medals, and any pin where precise positioning and maximum security are required.', image: 'option-images/attachment/two_deluxe_clutch.png', glb: true },
{ id: 'military_clutch', label: 'Military Clutch', desc: 'Military clutch is a heavy-duty backing used on premium and military-grade lapel pins. It features a wide circular disc base with a rotating locking clasp in the center that locks firmly onto the pin post. It is the most secure backing available and is the standard choice for military medals, government pins, and high-value awards.', image: 'option-images/attachment/military_clutch.png', glb: true },
{ id: 'military_2x', label: '2× Military', desc: 'Two military clutches deliver the highest level of security available for lapel pins. The dual-post, dual-clasp design ensures the pin cannot shift, spin, or fall off even under heavy wear. This is the standard configuration for large military medals and official government pins.', image: 'option-images/attachment/two_military_clutch.png', glb: true },
{ id: 'safety_pin', label: 'Safety Pin', desc: 'Classic safety pin style. Easy to attach to any fabric.', image: 'option-images/attachment/safety_pin.png', glb: true },
{ id: 'magnet', label: 'Magnet Back', desc: 'Strong magnetic backing. No piercing required; can be repositioned easily.', image: 'option-images/attachment/magnet_back.png' },
{ id: 'magnet_2x', label: '2× Magnet Back', desc: 'Two magnet backs use a pair of strong neodymium magnets to hold the pin firmly in place without any holes or posts. The dual-magnet design provides a stronger grip for thicker fabrics like denim jackets and coats. A great no-damage option for large or heavy pins.', image: 'option-images/attachment/two_magnet_back.png' },
{ id: 'no_backing', label: 'No Backing', desc: 'Smooth flat back with no post. For display, collectible, or decorative pins.', image: 'option-images/attachment/no_backing.png' }];


function AttachmentTab({ config, setConfig }) {
  const sel = ATTACHMENTS.find((a) => a.id === config.attachment) || ATTACHMENTS[0];
  const isMagnet = config.attachment === 'magnet' || config.attachment === 'magnet_2x';
  const isDual = config.attachment === 'rubber_clutch_2x' || config.attachment === 'deluxe_clutch_2x' || config.attachment === 'military_2x' || config.attachment === 'magnet_2x';

  // Track which attachment is currently loading.
  const [loadingId, setLoadingId] = React.useState(null);

  const handleSelect = (id) => {
    setConfig((c) => ({ ...c, attachment: id }));
    setLoadingId(id);

    const cached = window.isAttachmentCached && window.isAttachmentCached(id);
    // Always show spinner for at least 600ms so the switch feels intentional.
    const minDelay = new Promise((r) => setTimeout(r, 600));
    const loaded = cached ?
    Promise.resolve() :
    new Promise((r) => {
      const h = (e) => {
        if (!e.detail || e.detail.attachmentId === id) {
          window.removeEventListener('attachment-loaded', h);
          r();
        }
      };
      window.addEventListener('attachment-loaded', h);
      // Safety: bail after 15s
      setTimeout(() => {window.removeEventListener('attachment-loaded', h);r();}, 15000);
    });

    Promise.all([minDelay, loaded]).then(() => {
      setLoadingId((curr) => curr === id ? null : curr);
    });
  };

  // Warn if pin is too small for dual attachments
  // Rule: pin diameter should be ≥ 2.5cm for dual clutch, ≥ 3cm for dual magnet
  const minDualCm = config.attachment === 'magnet_2x' ? 3.0 : 2.5;
  const tooSmall = isDual && config.size < minDualCm;

  return (
    <div>
      <StepHeading step="Step 5: Attachment" sub="Choose how your pin fastens." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 20 }}>
        {ATTACHMENTS.map((a) =>
        <OptionBtn key={a.id} label={a.label} selected={config.attachment === a.id}
        loading={loadingId === a.id}
        onClick={() => handleSelect(a.id)} />
        )}
      </div>

      {tooSmall &&
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 12px', background: '#fff3cd', borderRadius: 3, border: '1px solid #ffc107', marginBottom: 12 }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>⚠</span>
          <p style={{ fontSize: 12, color: '#856404', lineHeight: 1.5, margin: 0 }}>
            <strong>Pin too small for dual attachment.</strong> {config.attachment === 'magnet_2x' ? '2× Magnet Back' : 'Dual clutch'} requires a minimum diameter of <strong>{minDualCm} cm ({(minDualCm / 2.54).toFixed(2)}")</strong>. Your current size is {config.size.toFixed(2)} cm. Please increase the pin size in the Shape & Size tab, or choose a single attachment.
          </p>
        </div>
      }

      <InfoBox title={sel.label} text={sel.desc} image={sel.image} />

      {isMagnet &&
      <>
          <Slider label="Magnet Diameter" value={config.magnetSize || 12} min={8} max={25} step={1} unit="mm"
        hint="Standard: 12mm"
        onChange={(v) => setConfig((c) => ({ ...c, magnetSize: v }))} />
        </>
      }

      {sel.glb &&
      <div style={{ marginTop: 12, fontSize: 11, color: '#888', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4caf50', display: 'inline-block' }} />
          3D model loaded in viewer
        </div>
      }
    </div>);

}

// ── 6. Pack ──────────────────────────────────────────────────────────────────

const PACKAGING = [
{ id: 'thin_poly', label: 'Thin Poly Bag', desc: 'A thin, transparent poly bag that keeps your pin clean and protected during storage and shipping. The most economical packaging option, perfect for bulk orders.', image: 'option-images/packaging/thin_poly_bag.png', hasDims: false },
{ id: 'thick_poly', label: 'Thick Poly Bag', desc: 'A thicker, more durable transparent poly bag that offers superior protection against scratches and impact. Great for high-quality pins where extra care is needed.', image: 'option-images/packaging/thick_poly_bag.png', hasDims: false },
{ id: 'plastic_box', label: 'Plastic Box', desc: 'Sturdy plastic case for protection and display.', image: 'option-images/packaging/plastic_box.png', hasDims: true },
{ id: 'paper_box', label: 'Paper Box', desc: 'Eco-friendly printed paper box. Customizable with your branding.', image: 'option-images/packaging/paper_box.png', hasDims: true },
{ id: 'velvet_pouch', label: 'Velvet Pouch', desc: 'Soft velvet pouch for a premium feel. Great for gifts.', image: 'option-images/packaging/velvet_pouch.png', hasDims: false },
{ id: 'backing_card', label: 'Backing Card', desc: 'A professional backing card with a die-cut hole to securely hold and display your pin. Retail-ready and ideal for displaying at events, in stores, or as gifts. Available with custom printing on both sides.', image: 'option-images/packaging/backing_card.png', hasDims: false }];



function PackTab({ config, setConfig }) {
  const sel = PACKAGING.find((p) => p.id === config.packaging) || PACKAGING[0];
  const showDims = sel.hasDims;
  const dims = config.boxDimensions || { l: '', h: '', w: '' };
  const setDims = (patch) => setConfig((c) => ({ ...c, boxDimensions: { ...(c.boxDimensions || { l: '', h: '', w: '' }), ...patch } }));

  return (
    <div>
      <StepHeading step="Step 6: Packaging" sub="Select how your order will be packaged." />
      <SectionLabel>Packaging</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 20 }}>
        {PACKAGING.map((p) => <OptionBtn key={p.id} label={p.label} selected={config.packaging === p.id} onClick={() => setConfig((c) => ({ ...c, packaging: p.id, boxDimensions: { l: '', h: '', w: '' } }))} />)}
      </div>
      <InfoBox title={sel.label} text={sel.desc} image={sel.image} />

      {showDims &&
      <div style={{ marginTop: 16, padding: '14px', background: '#fff8e8', border: '1.5px solid #e8d89a', borderRadius: 4 }}>
          <SectionLabel>Custom Box Dimensions (cm)</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 10 }}>
            {[['l', 'Length'], ['h', 'Height'], ['w', 'Width']].map(([k, lbl]) =>
          <div key={k}>
                <div style={{ fontSize: 10, color: '#888', marginBottom: 3 }}>{lbl}</div>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <input type="text" inputMode="decimal" placeholder="cm"
              value={dims[k]} onChange={(e) => setDims({ [k]: e.target.value })}
              style={{ width: '100%', padding: '7px 10px', border: '1.5px solid #d8d0c0', borderRadius: 2, fontSize: 13, outline: 'none', fontFamily: 'inherit' }} />
              
                </div>
              </div>
          )}
          </div>
          {(dims.l || dims.h || dims.w) &&
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 10px', background: '#fff3cd', borderRadius: 3, border: '1px solid #ffc107' }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>⚠</span>
              <p style={{ fontSize: 11, color: '#856404', lineHeight: 1.5, margin: 0 }}>
                Custom box dimensions may require additional tooling. Our team will confirm specifications before production.
              </p>
            </div>
        }
        </div>
      }

    </div>);

}

Object.assign(window, { ShapeTab, MaterialTab, EffectsTab, BackSideTab, AttachmentTab, PackTab, OptionBtn, SectionLabel, StepHeading });