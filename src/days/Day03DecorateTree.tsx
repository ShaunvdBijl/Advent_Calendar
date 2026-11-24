import { useRef, useState, type MouseEvent } from 'react';
import type { Day1State, Day2State, Day3State, TreeOrnament } from '../types/calendar';

interface Day03DecorateTreeProps {
  treeVariant?: Day1State['treeVariant'];
  standStyle?: Day2State['standStyle'];
  existingState?: Day3State;
  onComplete: (state: Day3State) => void;
}

const TREE_PALETTES: Record<
  Day1State['treeVariant'],
  { dark: string; mid: string; light: string }
> = {
  spruce: { dark: '#18423e', mid: '#215853', light: '#2d756e' },
  pine: { dark: '#1a422c', mid: '#24593c', light: '#2f724d' },
  fir: { dark: '#143628', mid: '#1d4c39', light: '#26634b' },
};

const ORNAMENT_COLORS = [
  { id: '#d63638', label: 'Crimson' },
  { id: '#f0c674', label: 'Gold' },
  { id: '#5eb5f7', label: 'Frost Blue' },
  { id: '#e2e8f0', label: 'Silver' },
  { id: '#c084fc', label: 'Plum' },
];

const GARLAND_OPTIONS: { id: Day3State['garlandStyle']; label: string }[] = [
  { id: 'warm-lights', label: 'Warm Lights' },
  { id: 'gold-tinsel', label: 'Gold Tinsel' },
  { id: 'red-ribbon', label: 'Red Ribbon' },
  { id: 'none', label: 'No Garland' },
];

const KIND_OPTIONS: { id: TreeOrnament['kind']; label: string }[] = [
  { id: 'bauble', label: 'Bauble' },
  { id: 'candy-cane', label: 'Candy Cane' },
  { id: 'bell', label: 'Bell' },
];

const MIN_ORNAMENTS = 5;
const MAX_ORNAMENTS = 24;

const PRESET_ORNAMENTS: Omit<TreeOrnament, 'id'>[] = [
  { nx: -0.14, ny: 0.24, color: '#d63638', kind: 'bauble' },
  { nx: 0.16, ny: 0.3, color: '#f0c674', kind: 'bell' },
  { nx: -0.28, ny: 0.48, color: '#5eb5f7', kind: 'bauble' },
  { nx: 0.04, ny: 0.52, color: '#d63638', kind: 'candy-cane' },
  { nx: 0.34, ny: 0.58, color: '#f0c674', kind: 'bauble' },
  { nx: -0.44, ny: 0.76, color: '#e2e8f0', kind: 'bauble' },
  { nx: -0.12, ny: 0.82, color: '#f0c674', kind: 'bell' },
  { nx: 0.26, ny: 0.78, color: '#d63638', kind: 'bauble' },
  { nx: 0.54, ny: 0.86, color: '#c084fc', kind: 'bauble' },
];

export function Day03DecorateTree({
  treeVariant = 'spruce',
  standStyle = 'classic-red',
  existingState,
  onComplete,
}: Day03DecorateTreeProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [garlandStyle, setGarlandStyle] = useState<Day3State['garlandStyle']>(
    existingState?.garlandStyle ?? 'warm-lights',
  );
  const [ornaments, setOrnaments] = useState<TreeOrnament[]>(
    existingState?.ornaments ?? [],
  );
  const [selectedKind, setSelectedKind] = useState<TreeOrnament['kind']>('bauble');
  const [selectedColor, setSelectedColor] = useState<string>(ORNAMENT_COLORS[0].id);

  const palette = TREE_PALETTES[treeVariant];
  const canFinish = ornaments.length >= MIN_ORNAMENTS;

  const handleSvgClick = (event: MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg || ornaments.length >= MAX_ORNAMENTS) return;

    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 420;
    const y = ((event.clientY - rect.top) / rect.height) * 280;

    // Tree foliage spans y = 36 (apex) to y = 214 (base), centered at x = 210, max half-width = 92
    const ny = (y - 36) / (214 - 36);
    const nx = (x - 210) / 92;

    if (ny < 0.08 || ny > 0.96) return;
    if (Math.abs(nx) > ny * 0.92) return;

    const next: TreeOrnament = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      nx: Number(nx.toFixed(3)),
      ny: Number(ny.toFixed(3)),
      color: selectedColor,
      kind: selectedKind,
    };
    setOrnaments((prev) => [...prev, next]);
  };

  const handleRemoveOrnament = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    setOrnaments((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAutoDecorate = () => {
    setOrnaments(
      PRESET_ORNAMENTS.map((item, idx) => ({
        ...item,
        id: `preset-${idx}-${Date.now()}`,
      })),
    );
  };

  const handleSave = () => {
    onComplete({
      decoratedAt: new Date().toISOString(),
      garlandStyle,
      ornaments,
    });
  };

  return (
    <div className="day3-container">
      <p className="day-intro">
        Click directly on the tree branches to hang at least{' '}
        <strong>{MIN_ORNAMENTS} ornaments</strong> (click any ornament to remove it), and pick a
        garland style!
      </p>

      <div className="day3-toolbar">
        <div className="variant-picker" role="group" aria-label="Garland style">
          {GARLAND_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`variant-btn${garlandStyle === opt.id ? ' active' : ''}`}
              onClick={() => setGarlandStyle(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="day3-ornament-controls">
          <div className="variant-picker" role="group" aria-label="Ornament type">
            {KIND_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`variant-btn${selectedKind === opt.id ? ' active' : ''}`}
                onClick={() => setSelectedKind(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="color-swatches" role="group" aria-label="Ornament color">
            {ORNAMENT_COLORS.map((swatch) => (
              <button
                key={swatch.id}
                type="button"
                className={`color-swatch${selectedColor === swatch.id ? ' active' : ''}`}
                style={{ backgroundColor: swatch.id }}
                aria-label={swatch.label}
                title={swatch.label}
                onClick={() => setSelectedColor(swatch.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="day2-scene-wrap">
        <svg
          ref={svgRef}
          viewBox="0 0 420 280"
          className="day2-svg day3-interactive-svg"
          onClick={handleSvgClick}
          role="img"
          aria-label={`Christmas tree with ${ornaments.length} ornaments`}
        >
          <defs>
            <linearGradient id="d3Wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b2618" />
              <stop offset="100%" stopColor="#26170e" />
            </linearGradient>
            <linearGradient id="d3Floor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f3320" />
              <stop offset="100%" stopColor="#2e1b10" />
            </linearGradient>
          </defs>

          <rect width="420" height="215" rx="12" fill="url(#d3Wall)" />
          <rect y="205" width="420" height="75" fill="url(#d3Floor)" />

          {/* Rug & Stand */}
          <ellipse
            cx="210"
            cy="242"
            rx="105"
            ry="22"
            fill="#7c262d"
            stroke="#d9b166"
            strokeWidth="3"
          />
          <rect x="200" y="190" width="20" height="42" rx="4" fill="#5c3a21" />
          {standStyle === 'classic-red' && (
            <path d="M 182 242 L 192 216 L 228 216 L 238 242 Z" fill="#a8262d" />
          )}
          {standStyle === 'wooden-barrel' && (
            <path d="M 184 242 L 188 212 L 232 212 L 236 242 Z" fill="#7c4f31" />
          )}
          {standStyle === 'gold-pot' && (
            <path d="M 186 242 L 182 214 L 238 214 L 234 242 Z" fill="#cfa047" />
          )}

          {/* Tree Foliage */}
          <polygon points="210,126 118,214 302,214" fill={palette.dark} />
          <polygon points="210,88 138,168 282,168" fill={palette.mid} />
          <polygon points="210,36 156,120 264,120" fill={palette.light} />

          {/* Garland Layer */}
          {garlandStyle === 'gold-tinsel' && (
            <g fill="none" stroke="#f0c674" strokeWidth="4" strokeDasharray="5 3" opacity="0.9">
              <path d="M 176 92 Q 210 112 246 96" />
              <path d="M 152 142 Q 210 166 268 144" />
              <path d="M 132 192 Q 210 214 288 194" />
            </g>
          )}
          {garlandStyle === 'red-ribbon' && (
            <g fill="none" stroke="#c92a35" strokeWidth="5" strokeLinecap="round" opacity="0.92">
              <path d="M 176 92 Q 210 114 246 96" />
              <path d="M 152 142 Q 210 168 268 144" />
              <path d="M 132 192 Q 210 216 288 194" />
            </g>
          )}
          {garlandStyle === 'warm-lights' && (
            <g>
              <g fill="none" stroke="#30483a" strokeWidth="1.5" opacity="0.7">
                <path d="M 176 92 Q 210 112 246 96" />
                <path d="M 152 142 Q 210 166 268 144" />
                <path d="M 132 192 Q 210 214 288 194" />
              </g>
              {[
                [182, 96], [200, 102], [220, 102], [238, 98],
                [160, 146], [184, 154], [210, 156], [236, 154], [260, 147],
                [142, 195], [174, 202], [210, 204], [246, 202], [278, 196],
              ].map(([lx, ly], i) => (
                <circle
                  key={`${lx}-${ly}`}
                  cx={lx}
                  cy={ly}
                  r="3.2"
                  fill={i % 2 === 0 ? '#ffe79e' : '#ffbe55'}
                  className={i % 2 === 0 ? 'twinkle-a' : 'twinkle-b'}
                />
              ))}
            </g>
          )}

          {/* Placed Ornaments */}
          {ornaments.map((orn) => {
            const ox = 210 + orn.nx * 92;
            const oy = 36 + orn.ny * (214 - 36);
            return (
              <g
                key={orn.id}
                transform={`translate(${ox}, ${oy})`}
                className="ornament-node"
                onClick={(e) => handleRemoveOrnament(orn.id, e)}
              >
                {orn.kind === 'bauble' && (
                  <>
                    <rect x="-2" y="-9" width="4" height="3" fill="#e6c373" />
                    <circle r="6.5" fill={orn.color} stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                    <circle cx="-2" cy="-2" r="1.8" fill="rgba(255,255,255,0.55)" />
                  </>
                )}
                {orn.kind === 'bell' && (
                  <>
                    <path d="M -5 5 L -3 -5 Q 0 -8 3 -5 L 5 5 Z" fill="#f0c674" stroke="#9e7424" strokeWidth="1" />
                    <circle cx="0" cy="6" r="1.8" fill="#b4832b" />
                  </>
                )}
                {orn.kind === 'candy-cane' && (
                  <path
                    d="M -2 7 L -2 -3 A 3.5 3.5 0 0 1 5 -3"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                )}
                {orn.kind === 'candy-cane' && (
                  <path
                    d="M -2 7 L -2 -3 A 3.5 3.5 0 0 1 5 -3"
                    fill="none"
                    stroke="#d63638"
                    strokeWidth="3"
                    strokeDasharray="2.5 2.5"
                    strokeLinecap="round"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="day1-controls">
        <div className="chop-meter" aria-label={`Ornaments placed: ${ornaments.length}`}>
          <div
            className="chop-meter-fill"
            style={{ width: `${Math.min((ornaments.length / MIN_ORNAMENTS) * 100, 100)}%` }}
          />
        </div>

        <div className="day1-done-actions">
          <button
            type="button"
            className="primary-btn"
            disabled={!canFinish}
            onClick={handleSave}
            autoFocus
          >
            {canFinish
              ? existingState
                ? `Update Decorations (${ornaments.length})`
                : `Finish Decorating (${ornaments.length})`
              : `Place ${MIN_ORNAMENTS - ornaments.length} More Ornament${MIN_ORNAMENTS - ornaments.length === 1 ? '' : 's'}`}
          </button>
          <button type="button" className="toolbar-btn" onClick={handleAutoDecorate}>
            Auto-Decorate
          </button>
          <button
            type="button"
            className="toolbar-btn"
            disabled={ornaments.length === 0}
            onClick={() => setOrnaments([])}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
