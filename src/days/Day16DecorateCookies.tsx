import { useState } from 'react';
import type { Day16State } from '../types/calendar';

interface Day16DecorateCookiesProps {
  existingState?: Day16State;
  onComplete: (state: Day16State) => void;
}

const FROSTING_SWATCHES = [
  { id: '#fff8eb', label: 'Vanilla Cream' },
  { id: '#2d8659', label: 'Holly Green' },
  { id: '#d63638', label: 'Crimson Berry' },
  { id: '#60a5fa', label: 'Frost Blue' },
  { id: '#f5c542', label: 'Golden Lemon' },
];

const SPRINKLE_STYLES: Record<
  Day16State['sprinkleStyle'],
  { label: string; colors: [string, string, string] }
> = {
  'festive-red-green': { label: 'Red & Green', colors: ['#ef4444', '#22c55e', '#ffffff'] },
  'gold-stars': { label: 'Gold Shimmer', colors: ['#f0c674', '#fde68a', '#ffffff'] },
  'winter-frost': { label: 'Winter Frost', colors: ['#93c5fd', '#e0f2fe', '#ffffff'] },
};

export function Day16DecorateCookies({
  existingState,
  onComplete,
}: Day16DecorateCookiesProps) {
  const [selectedFrosting, setSelectedFrosting] = useState<string>(FROSTING_SWATCHES[4].id);
  const [starFrosting, setStarFrosting] = useState<string | null>(
    existingState?.starFrosting ?? null,
  );
  const [treeFrosting, setTreeFrosting] = useState<string | null>(
    existingState?.treeFrosting ?? null,
  );
  const [hasSprinkles, setHasSprinkles] = useState<boolean>(Boolean(existingState));
  const [sprinkleStyle, setSprinkleStyle] = useState<Day16State['sprinkleStyle']>(
    existingState?.sprinkleStyle ?? 'festive-red-green',
  );

  const sprinkles = SPRINKLE_STYLES[sprinkleStyle].colors;
  const bothFrosted = Boolean(starFrosting && treeFrosting);
  const progressCount =
    (starFrosting ? 1 : 0) + (treeFrosting ? 1 : 0) + (hasSprinkles ? 1 : 0);

  const handleSave = () => {
    if (!starFrosting || !treeFrosting) return;
    onComplete({
      decoratedAt: new Date().toISOString(),
      starFrosting,
      treeFrosting,
      sprinkleStyle,
    });
  };

  return (
    <div className="day9-container">
      <p className="day-intro">
        Pick a frosting color and <strong>click each sugar cookie</strong> (star &amp; tree) to
        pipe icing onto it, then shake on festive sprinkles!
      </p>

      <div className="day3-toolbar">
        <div className="day3-ornament-controls">
          <div className="color-swatches" role="group" aria-label="Frosting color">
            {FROSTING_SWATCHES.map((swatch) => (
              <button
                key={swatch.id}
                type="button"
                className={`color-swatch${selectedFrosting === swatch.id ? ' active' : ''}`}
                style={{ backgroundColor: swatch.id }}
                aria-label={swatch.label}
                title={swatch.label}
                onClick={() => setSelectedFrosting(swatch.id)}
              />
            ))}
          </div>

          <div className="variant-picker" role="group" aria-label="Sprinkle mix">
            {(Object.keys(SPRINKLE_STYLES) as Day16State['sprinkleStyle'][]).map((key) => (
              <button
                key={key}
                type="button"
                className={`variant-btn${sprinkleStyle === key ? ' active' : ''}`}
                onClick={() => setSprinkleStyle(key)}
              >
                {SPRINKLE_STYLES[key].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="day2-scene-wrap">
        <svg
          viewBox="0 0 420 240"
          className="day2-svg"
          role="img"
          aria-label="Baking tray with star and tree sugar cookies"
        >
          {/* Baking Tray & Parchment */}
          <rect width="420" height="240" rx="12" fill="#3a424e" />
          <rect x="20" y="20" width="380" height="200" rx="10" fill="#f5ede0" stroke="#cbd5e1" strokeWidth="2" />

          {/* Star Sugar Cookie (Left) */}
          <g
            transform="translate(122, 122)"
            className="photo-region-clickable"
            onClick={() => setStarFrosting(selectedFrosting)}
            role="button"
            tabIndex={0}
            aria-label="Pipe frosting onto star cookie"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setStarFrosting(selectedFrosting);
              }
            }}
          >
            <polygon
              points="0,-68 18,-22 66,-20 28,10 42,58 0,30 -42,58 -28,10 -66,-20 -18,-22"
              fill="#d9a462"
              stroke="#a87439"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {starFrosting && (
              <polygon
                points="0,-54 14,-17 52,-15 22,8 33,45 0,23 -33,45 -22,8 -52,-15 -14,-17"
                fill={starFrosting}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="2"
                strokeLinejoin="round"
                className="tree-part-enter"
              />
            )}
            {hasSprinkles && (
              <g className="tree-part-enter">
                <circle cx="0" cy="-28" r="3" fill={sprinkles[0]} />
                <circle cx="-18" cy="-6" r="3" fill={sprinkles[1]} />
                <circle cx="18" cy="-6" r="3" fill={sprinkles[2]} />
                <circle cx="0" cy="6" r="3.2" fill={sprinkles[0]} />
                <circle cx="-14" cy="24" r="2.8" fill={sprinkles[1]} />
                <circle cx="14" cy="24" r="2.8" fill={sprinkles[0]} />
              </g>
            )}
            {!starFrosting && (
              <text x="0" y="84" textAnchor="middle" fill="#6b5842" fontSize="12" fontWeight="600">
                Click to frost
              </text>
            )}
          </g>

          {/* Tree Sugar Cookie (Right) */}
          <g
            transform="translate(296, 122)"
            className="photo-region-clickable"
            onClick={() => setTreeFrosting(selectedFrosting)}
            role="button"
            tabIndex={0}
            aria-label="Pipe frosting onto tree cookie"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setTreeFrosting(selectedFrosting);
              }
            }}
          >
            {/* Trunk */}
            <rect x="-12" y="42" width="24" height="24" rx="4" fill="#c79150" stroke="#9e6b32" strokeWidth="3" />
            {/* Tree Cookie Silhouette */}
            <polygon
              points="0,-68 -42,-16 -24,-16 -54,20 -34,20 -64,52 64,52 34,20 54,20 24,-16 42,-16"
              fill="#d9a462"
              stroke="#a87439"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {treeFrosting && (
              <polygon
                points="0,-54 -31,-18 -16,-18 -42,16 -24,16 -50,44 50,44 24,16 42,16 16,-18 31,-18"
                fill={treeFrosting}
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="2"
                strokeLinejoin="round"
                className="tree-part-enter"
              />
            )}
            {hasSprinkles && (
              <g className="tree-part-enter">
                <circle cx="0" cy="-30" r="3" fill={sprinkles[0]} />
                <circle cx="-12" cy="-6" r="3" fill={sprinkles[1]} />
                <circle cx="14" cy="-2" r="3" fill={sprinkles[2]} />
                <circle cx="-22" cy="24" r="3" fill={sprinkles[0]} />
                <circle cx="2" cy="20" r="3.2" fill={sprinkles[2]} />
                <circle cx="24" cy="28" r="3" fill={sprinkles[1]} />
              </g>
            )}
            {!treeFrosting && (
              <text x="0" y="84" textAnchor="middle" fill="#6b5842" fontSize="12" fontWeight="600">
                Click to frost
              </text>
            )}
          </g>
        </svg>
      </div>

      <div className="day1-controls">
        <div className="chop-meter" aria-label={`Cookie decorating progress ${progressCount} of 3`}>
          <div className="chop-meter-fill" style={{ width: `${(progressCount / 3) * 100}%` }} />
        </div>

        {!bothFrosted ? (
          <div className="day1-done-actions">
            {!starFrosting && (
              <button
                type="button"
                className="toolbar-btn"
                onClick={() => setStarFrosting(selectedFrosting)}
              >
                Frost Star Cookie
              </button>
            )}
            {!treeFrosting && (
              <button
                type="button"
                className="toolbar-btn"
                onClick={() => setTreeFrosting(selectedFrosting)}
              >
                Frost Tree Cookie
              </button>
            )}
          </div>
        ) : !hasSprinkles ? (
          <button
            type="button"
            className="primary-btn"
            onClick={() => setHasSprinkles(true)}
            autoFocus
          >
            Shake Festive Sprinkles!
          </button>
        ) : (
          <div className="day1-done-actions">
            <button type="button" className="primary-btn" onClick={handleSave} autoFocus>
              {existingState ? 'Update Cookie Plate' : 'Place Plate of Cookies on Table'}
            </button>
            <button
              type="button"
              className="toolbar-btn"
              onClick={() => {
                setStarFrosting(null);
                setTreeFrosting(null);
                setHasSprinkles(false);
              }}
            >
              Bake Fresh Batch
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
