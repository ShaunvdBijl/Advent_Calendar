import { useState } from 'react';
import type { Day19State, StockingConfig } from '../types/calendar';

interface Day19StockingsProps {
  existingState?: Day19State;
  onComplete: (state: Day19State) => void;
}

const DEFAULT_STOCKINGS: StockingConfig[] = [
  { id: 1, initial: 'S', color: '#c92a35', pattern: 'stripes' },
  { id: 2, initial: 'A', color: '#215c3e', pattern: 'polka' },
  { id: 3, initial: '★', color: '#1e3a5f', pattern: 'solid' },
];

const STOCKING_COLORS = [
  { id: '#c92a35', label: 'Crimson Red' },
  { id: '#215c3e', label: 'Forest Green' },
  { id: '#1e3a5f', label: 'Midnight Blue' },
  { id: '#7e22ce', label: 'Berry Plum' },
];

const PATTERN_OPTIONS: { id: StockingConfig['pattern']; label: string }[] = [
  { id: 'solid', label: 'Solid Knit' },
  { id: 'stripes', label: 'Festive Stripes' },
  { id: 'polka', label: 'Snowy Dots' },
];

export function Day19Stockings({ existingState, onComplete }: Day19StockingsProps) {
  const [stockings, setStockings] = useState<StockingConfig[]>(
    existingState?.stockings?.length ? existingState.stockings : DEFAULT_STOCKINGS,
  );
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const current = stockings[activeIndex];

  const updateCurrent = (patch: Partial<StockingConfig>) => {
    setStockings((prev) =>
      prev.map((item, idx) => (idx === activeIndex ? { ...item, ...patch } : item)),
    );
  };

  const handleSave = () => {
    onComplete({
      hungAt: new Date().toISOString(),
      stockings,
    });
  };

  return (
    <div className="day9-container">
      <p className="day-intro">
        Select each stocking below to customize its <strong>initial</strong>,{' '}
        <strong>color</strong>, and <strong>knit pattern</strong>, then hang them along the
        fireplace mantle!
      </p>

      <div className="day3-toolbar">
        <div className="day3-ornament-controls">
          <div className="variant-picker" role="group" aria-label="Select stocking">
            {stockings.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                className={`variant-btn${activeIndex === idx ? ' active' : ''}`}
                onClick={() => setActiveIndex(idx)}
              >
                Stocking {idx + 1} ({s.initial || '?'})
              </button>
            ))}
          </div>

          <label className="initial-inline-label">
            Initial:
            <input
              type="text"
              maxLength={2}
              className="initial-input"
              value={current.initial}
              onChange={(e) => updateCurrent({ initial: e.target.value.toUpperCase() })}
              aria-label="Stocking initial"
            />
          </label>
        </div>

        <div className="day3-ornament-controls">
          <div className="variant-picker" role="group" aria-label="Stocking knit pattern">
            {PATTERN_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`variant-btn${current.pattern === opt.id ? ' active' : ''}`}
                onClick={() => updateCurrent({ pattern: opt.id })}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="color-swatches" role="group" aria-label="Stocking color">
            {STOCKING_COLORS.map((swatch) => (
              <button
                key={swatch.id}
                type="button"
                className={`color-swatch${current.color === swatch.id ? ' active' : ''}`}
                style={{ backgroundColor: swatch.id }}
                aria-label={swatch.label}
                title={swatch.label}
                onClick={() => updateCurrent({ color: swatch.id })}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="day2-scene-wrap">
        <svg
          viewBox="0 0 420 220"
          className="day2-svg"
          role="img"
          aria-label="Three customized holiday stockings hanging from the fireplace mantle"
        >
          {/* Fireplace stone backdrop */}
          <rect width="420" height="220" rx="12" fill="#4b5260" />
          {/* Wooden Mantle Shelf */}
          <rect x="20" y="24" width="380" height="26" rx="5" fill="#7c4f31" stroke="#4a2d17" strokeWidth="2" />

          {stockings.map((stocking, idx) => {
            const x = 96 + idx * 114;
            const isSelected = idx === activeIndex;
            return (
              <g
                key={stocking.id}
                transform={`translate(${x}, 50)`}
                className="photo-region-clickable"
                onClick={() => setActiveIndex(idx)}
              >
                {/* Brass Hook */}
                <circle cx="0" cy="-2" r="4.5" fill="#f0c674" stroke="#7c5616" strokeWidth="1.5" />
                <line x1="0" y1="2" x2="0" y2="14" stroke="#f0c674" strokeWidth="2.5" />

                {/* Selection glow ring */}
                {isSelected && (
                  <rect
                    x="-40"
                    y="8"
                    width="82"
                    height="136"
                    rx="12"
                    fill="none"
                    stroke="#f0c674"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity="0.7"
                  />
                )}

                {/* Stocking Body */}
                <path
                  d="M -20 28 L 16 28 L 16 86 C 16 102, 24 114, 34 118 C 42 122, 40 138, 22 138 L -14 138 C -28 138, -28 120, -20 108 Z"
                  fill={stocking.color}
                  stroke="rgba(0,0,0,0.35)"
                  strokeWidth="2"
                />

                {/* Knit Pattern Overlay */}
                {stocking.pattern === 'stripes' && (
                  <g stroke="#f8fafc" strokeWidth="4" opacity="0.65">
                    <line x1="-19" y1="54" x2="15" y2="54" />
                    <line x1="-19" y1="74" x2="15" y2="74" />
                    <line x1="-19" y1="94" x2="17" y2="94" />
                  </g>
                )}
                {stocking.pattern === 'polka' && (
                  <g fill="#f8fafc" opacity="0.75">
                    <circle cx="-8" cy="54" r="3.5" />
                    <circle cx="6" cy="64" r="3.5" />
                    <circle cx="-10" cy="80" r="3.5" />
                    <circle cx="5" cy="92" r="3.5" />
                    <circle cx="-6" cy="112" r="3.5" />
                    <circle cx="14" cy="122" r="3.5" />
                  </g>
                )}

                {/* Heel & Toe Accent */}
                <path d="M 24 114 C 38 118, 40 138, 22 138 L 16 138 Z" fill="rgba(255,255,255,0.22)" />

                {/* Fluffy Cream Cuff */}
                <rect x="-25" y="12" width="46" height="22" rx="7" fill="#faf3e3" stroke="#d4c5a9" strokeWidth="1.8" />

                {/* Embroidered Initial */}
                <text
                  x="-2"
                  y="28"
                  textAnchor="middle"
                  fill={stocking.color}
                  fontSize="14"
                  fontWeight="800"
                >
                  {stocking.initial || '★'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="day1-controls">
        <button type="button" className="primary-btn" onClick={handleSave} autoFocus>
          {existingState ? 'Update Mantle Stockings' : 'Hang Stockings Along Mantle'}
        </button>
      </div>
    </div>
  );
}
