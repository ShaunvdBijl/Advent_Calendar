import { useState } from 'react';
import type { Day16State, Day23State } from '../types/calendar';

interface Day23MilkByHearthProps {
  day16State?: Day16State;
  existingState?: Day23State;
  onComplete: (state: Day23State) => void;
}

const MILK_OPTIONS: Record<Day23State['milkType'], { label: string; fill: string; top: string }> = {
  'whole-milk': { label: 'Cold Whole Milk', fill: '#f8fafc', top: '#ffffff' },
  'warm-vanilla': { label: 'Warm Vanilla Milk', fill: '#fcf3dc', top: '#fffaf0' },
  'chocolate-milk': { label: 'Chocolate Milk', fill: '#8b5a3c', top: '#a67252' },
};

export function Day23MilkByHearth({
  day16State,
  existingState,
  onComplete,
}: Day23MilkByHearthProps) {
  const [milkType, setMilkType] = useState<Day23State['milkType']>(
    existingState?.milkType ?? 'whole-milk',
  );
  const [hasCandyStraw, setHasCandyStraw] = useState<boolean>(
    existingState?.hasCandyStraw ?? true,
  );
  const [isPoured, setIsPoured] = useState<boolean>(Boolean(existingState));

  const milk = MILK_OPTIONS[milkType];

  const handleSave = () => {
    onComplete({
      placedAt: new Date().toISOString(),
      milkType,
      hasCandyStraw,
    });
  };

  return (
    <div className="day9-container">
      <p className="day-intro">
        Pour a fresh glass of milk for Santa and set it right beside your Day 16 frosted cookies by
        the warm hearth!
      </p>

      <div className="day2-options-row">
        <div className="variant-picker" role="group" aria-label="Choose milk type">
          {(Object.keys(MILK_OPTIONS) as Day23State['milkType'][]).map((key) => (
            <button
              key={key}
              type="button"
              className={`variant-btn${milkType === key ? ' active' : ''}`}
              onClick={() => setMilkType(key)}
            >
              {MILK_OPTIONS[key].label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`variant-btn${hasCandyStraw ? ' active' : ''}`}
          onClick={() => setHasCandyStraw((v) => !v)}
        >
          {hasCandyStraw ? '✓ Peppermint Straw' : '+ Peppermint Straw'}
        </button>
      </div>

      <div className="day2-scene-wrap">
        <svg
          viewBox="0 0 420 240"
          className="day2-svg"
          role="img"
          aria-label={isPoured ? 'Full glass of milk next to frosted cookies by the hearth' : 'Empty glass next to frosted cookies ready to pour'}
        >
          <defs>
            <linearGradient id="d23Bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#352216" />
              <stop offset="100%" stopColor="#21140d" />
            </linearGradient>
          </defs>

          <rect width="420" height="176" rx="12" fill="url(#d23Bg)" />
          {/* Wooden table surface */}
          <rect y="168" width="420" height="72" fill="#7c4f31" />
          <rect y="168" width="420" height="8" fill="#996540" />

          {/* Day 16 Cookie Plate on the Left */}
          <g transform="translate(86, 152)">
            <ellipse cx="64" cy="24" rx="64" ry="15" fill="#f8fafc" stroke="#c92a35" strokeWidth="3" />
            <ellipse cx="64" cy="22" rx="48" ry="10" fill="none" stroke="#f0c674" strokeWidth="1.5" />
            {/* Star Cookie */}
            <polygon
              points="40,-8 47,6 62,7 50,16 54,30 40,21 26,30 30,16 18,7 33,6"
              fill={day16State?.starFrosting ?? '#f5c542'}
              stroke="#a87439"
              strokeWidth="2"
            />
            {/* Tree Cookie */}
            <polygon
              points="88,-10 68,24 108,24"
              fill={day16State?.treeFrosting ?? '#2d8659'}
              stroke="#a87439"
              strokeWidth="2"
            />
          </g>

          {/* Tall Milk Glass on the Right */}
          <g transform="translate(262, 68)">
            {/* Peppermint Striped Straw */}
            {hasCandyStraw && (
              <g>
                <line x1="48" y1="-26" x2="30" y2="108" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
                <line
                  x1="48"
                  y1="-26"
                  x2="30"
                  y2="108"
                  stroke="#d63638"
                  strokeWidth="7"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Glass Back */}
            <polygon
              points="4,8 68,8 60,114 12,114"
              fill="rgba(226, 232, 240, 0.14)"
              stroke="rgba(226, 232, 240, 0.55)"
              strokeWidth="2.5"
            />

            {/* Milk Fill (animates in when poured) */}
            {isPoured && (
              <g className="tree-part-enter">
                <polygon points="8,32 64,32 58,112 14,112" fill={milk.fill} />
                <ellipse cx="36" cy="32" rx="28" ry="6" fill={milk.top} />
              </g>
            )}

            {/* Glass Rim & Highlight */}
            <ellipse cx="36" cy="8" rx="32" ry="6.5" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2.2" />
            <line x1="16" y1="22" x2="20" y2="102" stroke="rgba(255,255,255,0.45)" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      <div className="day1-controls">
        {!isPoured ? (
          <button type="button" className="primary-btn" onClick={() => setIsPoured(true)} autoFocus>
            Pour Glass of Milk
          </button>
        ) : (
          <div className="day1-done-actions">
            <button type="button" className="primary-btn" onClick={handleSave} autoFocus>
              {existingState ? 'Update Santa’s Milk' : 'Place Milk Next to Cookies'}
            </button>
            <button type="button" className="toolbar-btn" onClick={() => setIsPoured(false)}>
              Pour Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
