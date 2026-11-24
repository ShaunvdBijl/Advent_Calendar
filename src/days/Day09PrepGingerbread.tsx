import { useState } from 'react';
import type { Day9State } from '../types/calendar';

interface Day09PrepGingerbreadProps {
  existingState?: Day9State;
  onComplete: (state: Day9State) => void;
}

const SPICE_BLENDS: Record<
  Day9State['spiceBlend'],
  { label: string; dough: string; baked: string; edge: string }
> = {
  'classic-ginger': {
    label: 'Classic Ginger',
    dough: '#b87a46',
    baked: '#9c5f2f',
    edge: '#6e3f1b',
  },
  'dark-molasses': {
    label: 'Dark Molasses',
    dough: '#854e29',
    baked: '#693a1b',
    edge: '#47240f',
  },
  'honey-cinnamon': {
    label: 'Honey Cinnamon',
    dough: '#cf9355',
    baked: '#b57638',
    edge: '#82501f',
  },
};

const TOTAL_STEPS = 4;
const STEP_LABELS = [
  'Add Flour & Holiday Spices',
  'Mix & Knead Smooth Dough',
  'Roll & Cut House Panels',
  'Bake Golden Brown',
];

export function Day09PrepGingerbread({
  existingState,
  onComplete,
}: Day09PrepGingerbreadProps) {
  const [spiceBlend, setSpiceBlend] = useState<Day9State['spiceBlend']>(
    existingState?.spiceBlend ?? 'classic-ginger',
  );
  const [step, setStep] = useState<number>(existingState ? TOTAL_STEPS : 0);

  const colors = SPICE_BLENDS[spiceBlend];
  const isDone = step >= TOTAL_STEPS;

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    }
  };

  const handleSave = () => {
    onComplete({
      preppedAt: new Date().toISOString(),
      spiceBlend,
    });
  };

  return (
    <div className="day9-container">
      <p className="day-intro">
        Pick your spice blend, mix the dough, roll out the house panels, and bake them golden brown
        for tomorrow&apos;s gingerbread house build!
      </p>

      <div className="variant-picker" role="group" aria-label="Choose gingerbread spice blend">
        {(Object.keys(SPICE_BLENDS) as Day9State['spiceBlend'][]).map((key) => (
          <button
            key={key}
            type="button"
            className={`variant-btn${spiceBlend === key ? ' active' : ''}`}
            onClick={() => setSpiceBlend(key)}
          >
            {SPICE_BLENDS[key].label}
          </button>
        ))}
      </div>

      <div className="day2-scene-wrap">
        <svg
          viewBox="0 0 420 250"
          className="day2-svg"
          role="img"
          aria-label={`Gingerbread preparation step ${step} of ${TOTAL_STEPS}`}
        >
          <defs>
            <linearGradient id="d9Kitchen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2c221d" />
              <stop offset="100%" stopColor="#1b1411" />
            </linearGradient>
            <linearGradient id="d9Counter" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#855a3c" />
              <stop offset="100%" stopColor="#5e3d26" />
            </linearGradient>
          </defs>

          {/* Warm Kitchen Backdrop & Wooden Counter */}
          <rect width="420" height="175" rx="12" fill="url(#d9Kitchen)" />
          <rect y="165" width="420" height="85" fill="url(#d9Counter)" />

          {/* Step 0–2: Ceramic Mixing Bowl Stage */}
          {step <= 2 && (
            <g transform="translate(115, 70)">
              {/* Flour dust */}
              {step >= 1 && (
                <g fill="#f5efe6" opacity="0.55">
                  <ellipse cx="95" cy="112" rx="85" ry="12" />
                  <circle cx="28" cy="108" r="3" />
                  <circle cx="164" cy="106" r="4" />
                </g>
              )}

              {/* Bowl interior */}
              <ellipse cx="95" cy="56" rx="68" ry="18" fill="#d9cfc3" />

              {/* Ingredients / Kneaded Dough */}
              {step === 1 && (
                <g className="tree-part-enter">
                  <ellipse cx="78" cy="58" rx="34" ry="11" fill="#f7f2e8" />
                  <ellipse cx="112" cy="58" rx="28" ry="10" fill={colors.dough} />
                </g>
              )}
              {step === 2 && (
                <g className="tree-part-enter">
                  <ellipse cx="95" cy="56" rx="48" ry="18" fill={colors.dough} stroke={colors.edge} strokeWidth="2" />
                </g>
              )}

              {/* Wooden Spoon */}
              <g transform={step === 2 ? 'rotate(16 120 40)' : 'rotate(-10 120 40)'}>
                <rect x="118" y="4" width="10" height="62" rx="4" fill="#c49562" />
                <ellipse cx="123" cy="64" rx="11" ry="15" fill="#b3824d" />
              </g>

              {/* Ceramic Bowl Body */}
              <path
                d="M 27 56 C 27 110, 163 110, 163 56 Z"
                fill="#b8333a"
                stroke="#851f25"
                strokeWidth="2.5"
              />
              <path d="M 38 74 Q 95 92 152 74" fill="none" stroke="#f0c674" strokeWidth="3" opacity="0.85" />
            </g>
          )}

          {/* Step 3–4: Rolled & Cut / Baked Gingerbread Panels on Tray */}
          {step >= 3 && (
            <g transform="translate(55, 58)" className="tree-part-enter">
              {/* Baking Sheet */}
              <rect
                x="0"
                y="42"
                width="310"
                height="118"
                rx="8"
                fill="#4a5568"
                stroke="#94a3b8"
                strokeWidth="2.5"
              />
              {/* Parchment Paper */}
              <rect x="12" y="52" width="286" height="98" rx="4" fill="#f2e8d5" />

              {/* Front Gable Wall Panel */}
              <polygon
                points="68,62 28,96 28,140 108,140 108,96"
                fill={step === 4 ? colors.baked : colors.dough}
                stroke={colors.edge}
                strokeWidth="2.5"
              />
              {/* Door & Window Cutouts */}
              <rect x="58" y="114" width="20" height="26" rx="8" fill="#f2e8d5" stroke={colors.edge} strokeWidth="1.5" />
              <circle cx="68" cy="92" r="8" fill="#f2e8d5" stroke={colors.edge} strokeWidth="1.5" />

              {/* Side Wall Panel */}
              <rect
                x="124"
                y="86"
                width="74"
                height="54"
                rx="3"
                fill={step === 4 ? colors.baked : colors.dough}
                stroke={colors.edge}
                strokeWidth="2.5"
              />
              <rect x="148" y="102" width="24" height="22" rx="2" fill="#f2e8d5" stroke={colors.edge} strokeWidth="1.5" />

              {/* Roof Panel */}
              <rect
                x="212"
                y="70"
                width="74"
                height="70"
                rx="3"
                fill={step === 4 ? colors.baked : colors.dough}
                stroke={colors.edge}
                strokeWidth="2.5"
              />

              {/* Rolling Pin (Step 3 only) */}
              {step === 3 && (
                <g transform="translate(88, 12)">
                  <rect x="0" y="6" width="20" height="8" rx="3" fill="#8b5a2b" />
                  <rect x="20" y="0" width="96" height="20" rx="5" fill="#d9b482" stroke="#9e7442" strokeWidth="2" />
                  <rect x="116" y="6" width="20" height="8" rx="3" fill="#8b5a2b" />
                </g>
              )}

              {/* Warm Baking Steam (Step 4) */}
              {step === 4 && (
                <g fill="none" stroke="#ffe7c2" strokeWidth="2.5" strokeLinecap="round" opacity="0.75">
                  <path d="M 68 48 Q 62 32 70 18" className="steam-rise" />
                  <path d="M 160 44 Q 154 28 162 14" className="steam-rise" style={{ animationDelay: '0.5s' }} />
                  <path d="M 248 48 Q 242 32 250 18" className="steam-rise" style={{ animationDelay: '1s' }} />
                </g>
              )}
            </g>
          )}
        </svg>
      </div>

      <div className="day1-controls">
        <div className="chop-meter" aria-label={`Baking progress ${step} of ${TOTAL_STEPS}`}>
          <div
            className="chop-meter-fill"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>

        {!isDone ? (
          <button type="button" className="primary-btn" onClick={handleNext} autoFocus>
            Step {step + 1}/{TOTAL_STEPS}: {STEP_LABELS[step]}
          </button>
        ) : (
          <div className="day1-done-actions">
            <button type="button" className="primary-btn" onClick={handleSave} autoFocus>
              {existingState ? 'Update Gingerbread Batch' : 'Cool Panels on Side Table'}
            </button>
            <button type="button" className="toolbar-btn" onClick={() => setStep(0)}>
              Bake Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
