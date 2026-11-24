import { useState } from 'react';
import type { Day21State } from '../types/calendar';

interface Day21OutdoorLanternsProps {
  existingState?: Day21State;
  onComplete: (state: Day21State) => void;
}

const GLOW_STYLES: Record<Day21State['glowStyle'], { label: string; core: string; halo: string }> = {
  'warm-amber': { label: 'Warm Amber', core: '#ffbe55', halo: '#ff922b' },
  'starlight-gold': { label: 'Starlight Gold', core: '#fff0a6', halo: '#f0c674' },
  'frosted-teal': { label: 'Frosted Teal', core: '#99f6e4', halo: '#2dd4bf' },
};

const LANTERN_SPOTS = [
  { id: 0, x: 76, y: 204, scale: 1.05 },
  { id: 1, x: 146, y: 184, scale: 0.94 },
  { id: 2, x: 216, y: 170, scale: 0.86 },
  { id: 3, x: 282, y: 158, scale: 0.78 },
  { id: 4, x: 338, y: 148, scale: 0.72 },
];

export function Day21OutdoorLanterns({
  existingState,
  onComplete,
}: Day21OutdoorLanternsProps) {
  const [litIds, setLitIds] = useState<number[]>(
    existingState ? LANTERN_SPOTS.map((l) => l.id) : [],
  );
  const [glowStyle, setGlowStyle] = useState<Day21State['glowStyle']>(
    existingState?.glowStyle ?? 'warm-amber',
  );

  const glow = GLOW_STYLES[glowStyle];
  const allLit = litIds.length === LANTERN_SPOTS.length;

  const lightLantern = (id: number) => {
    setLitIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const handleLightNext = () => {
    const next = LANTERN_SPOTS.find((l) => !litIds.includes(l.id));
    if (next) lightLantern(next.id);
  };

  const handleSave = () => {
    onComplete({
      litAt: new Date().toISOString(),
      glowStyle,
    });
  };

  return (
    <div className="day9-container">
      <p className="day-intro">
        Click each of the <strong>5 iron pathway lanterns</strong> leading to the cabin front door
        to light the way for Santa&apos;s sleigh!
      </p>

      <div className="variant-picker" role="group" aria-label="Choose lantern glow tint">
        {(Object.keys(GLOW_STYLES) as Day21State['glowStyle'][]).map((key) => (
          <button
            key={key}
            type="button"
            className={`variant-btn${glowStyle === key ? ' active' : ''}`}
            onClick={() => setGlowStyle(key)}
          >
            {GLOW_STYLES[key].label}
          </button>
        ))}
      </div>

      <div className="day2-scene-wrap">
        <svg
          viewBox="0 0 420 250"
          className="day2-svg"
          role="img"
          aria-label={`Snowy cabin walkway with ${litIds.length} of ${LANTERN_SPOTS.length} lanterns lit`}
        >
          <defs>
            <linearGradient id="d21Sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#071021" />
              <stop offset="100%" stopColor="#162d50" />
            </linearGradient>
          </defs>

          <rect width="420" height="250" rx="12" fill="url(#d21Sky)" />

          {/* Moon & Stars */}
          <circle cx="76" cy="48" r="18" fill="#f7e7b4" />
          <circle cx="84" cy="43" r="16" fill="#0b1830" />
          <g fill="#f7eed3" opacity="0.85">
            <circle cx="150" cy="34" r="1.8" />
            <circle cx="220" cy="52" r="1.5" />
            <circle cx="290" cy="30" r="2" />
            <circle cx="370" cy="48" r="1.6" />
          </g>

          {/* Celebratory Santa Sleigh Silhouette in Sky once all lanterns are lit */}
          {allLit && (
            <g transform="translate(175, 42)" fill="#f0c674" opacity="0.92" className="tree-part-enter">
              <path d="M 0 12 L 26 12 Q 34 12 36 4 L 30 16 L -4 16 Z" />
              <line x1="34" y1="10" x2="72" y2="8" stroke="#f0c674" strokeWidth="1" />
              <circle cx="52" cy="8" r="3" />
              <circle cx="64" cy="7" r="3" />
              <circle cx="76" cy="6" r="3.2" fill="#ef4444" />
            </g>
          )}

          {/* Snowy Yard & Winding Walkway */}
          <path d="M 0 144 Q 210 124 420 144 L 420 250 L 0 250 Z" fill="#d3e4f5" />
          <path
            d="M 48 250 Q 150 185 352 152 L 386 156 Q 210 202 156 250 Z"
            fill="#93aec9"
          />

          {/* Cabin Front Door at End of Path */}
          <g transform="translate(342, 82)">
            <rect x="0" y="20" width="68" height="58" fill="#4f311d" stroke="#29170c" strokeWidth="2" />
            <polygon points="-8,22 34,-6 76,22" fill="#e6f1fc" stroke="#29170c" strokeWidth="2" />
            <rect x="22" y="40" width="24" height="38" rx="3" fill="#7c262d" stroke="#d9b166" strokeWidth="1.5" />
            <circle cx="40" cy="60" r="2" fill="#f0c674" />
          </g>

          {/* 5 Interactive Pathway Lanterns */}
          {LANTERN_SPOTS.map((spot) => {
            const isLit = litIds.includes(spot.id);
            return (
              <g
                key={spot.id}
                transform={`translate(${spot.x}, ${spot.y}) scale(${spot.scale})`}
                className="photo-region-clickable"
                onClick={() => lightLantern(spot.id)}
                role="button"
                tabIndex={0}
                aria-label={`Light pathway lantern ${spot.id + 1}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    lightLantern(spot.id);
                  }
                }}
              >
                {/* Glow Halo when Lit */}
                {isLit && (
                  <>
                    <circle cx="0" cy="-26" r="34" fill={glow.halo} opacity="0.22" className="fire-glow-pulse" />
                    <ellipse cx="0" cy="4" rx="22" ry="6" fill={glow.halo} opacity="0.26" />
                  </>
                )}
                {/* Iron Post */}
                <rect x="-2.5" y="-18" width="5" height="22" fill="#262c36" />
                {/* Lantern Glass Housing */}
                <rect
                  x="-10"
                  y="-38"
                  width="20"
                  height="22"
                  rx="3"
                  fill={isLit ? glow.core : '#334155'}
                  stroke="#1e2430"
                  strokeWidth="2.5"
                />
                {/* Lantern Cap */}
                <polygon points="-13,-38 0,-47 13,-38" fill="#1e2430" />
                {isLit && (
                  <circle cx="0" cy="-27" r="4.5" fill="#ffffff" opacity="0.9" className="twinkle-a" />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="day1-controls">
        <div className="chop-meter" aria-label={`Lanterns lit: ${litIds.length} of ${LANTERN_SPOTS.length}`}>
          <div
            className="chop-meter-fill"
            style={{ width: `${(litIds.length / LANTERN_SPOTS.length) * 100}%` }}
          />
        </div>

        {!allLit ? (
          <button type="button" className="primary-btn" onClick={handleLightNext} autoFocus>
            Light Next Lantern ({litIds.length}/{LANTERN_SPOTS.length})
          </button>
        ) : (
          <div className="day1-done-actions">
            <button type="button" className="primary-btn" onClick={handleSave} autoFocus>
              {existingState ? 'Update Pathway Lanterns' : 'Keep Pathway Lanterns Lit'}
            </button>
            <button type="button" className="toolbar-btn" onClick={() => setLitIds([])}>
              Extinguish All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
