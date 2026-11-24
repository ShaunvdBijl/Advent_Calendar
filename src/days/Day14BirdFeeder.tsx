import { useState } from 'react';
import type { Day14State } from '../types/calendar';

interface Day14BirdFeederProps {
  existingState?: Day14State;
  onComplete: (state: Day14State) => void;
}

const BIRD_STYLES: Record<
  Day14State['birdKind'],
  { label: string; body: string; breast: string; wing: string; crest?: boolean }
> = {
  'red-robin': { label: 'Red Robin', body: '#6b4c3b', breast: '#d94832', wing: '#4f372b' },
  'snow-cardinal': {
    label: 'Winter Cardinal',
    body: '#c92a35',
    breast: '#e03131',
    wing: '#9b1c26',
    crest: true,
  },
  'blue-jay': { label: 'Winter Blue Jay', body: '#3b82f6', breast: '#e2e8f0', wing: '#1d4ed8', crest: true },
};

const TOTAL_STEPS = 4;
const STEP_LABELS = [
  'Plant Wooden Post & Seed Tray',
  'Attach Gabled Roof & Perch',
  'Scatter Sunflower & Millet Seeds',
  'Welcome Winter Bird Visitor',
];

export function Day14BirdFeeder({ existingState, onComplete }: Day14BirdFeederProps) {
  const [birdKind, setBirdKind] = useState<Day14State['birdKind']>(
    existingState?.birdKind ?? 'red-robin',
  );
  const [step, setStep] = useState<number>(existingState ? TOTAL_STEPS : 0);

  const bird = BIRD_STYLES[birdKind];
  const isDone = step >= TOTAL_STEPS;

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    }
  };

  const handleSave = () => {
    onComplete({
      builtAt: new Date().toISOString(),
      birdKind,
    });
  };

  return (
    <div className="day9-container">
      <p className="day-intro">
        Build a cozy wooden bird feeder, scatter winter seeds, and welcome a permanent little bird
        visitor to your snowy yard!
      </p>

      <div className="variant-picker" role="group" aria-label="Choose winter bird visitor">
        {(Object.keys(BIRD_STYLES) as Day14State['birdKind'][]).map((key) => (
          <button
            key={key}
            type="button"
            className={`variant-btn${birdKind === key ? ' active' : ''}`}
            onClick={() => setBirdKind(key)}
          >
            {BIRD_STYLES[key].label}
          </button>
        ))}
      </div>

      <div className="day2-scene-wrap">
        <svg
          viewBox="0 0 420 250"
          className="day2-svg"
          role="img"
          aria-label={`Wooden bird feeder assembly step ${step} of ${TOTAL_STEPS}`}
        >
          <defs>
            <linearGradient id="d14Sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d1b33" />
              <stop offset="100%" stopColor="#1d3557" />
            </linearGradient>
          </defs>

          <rect width="420" height="250" rx="12" fill="url(#d14Sky)" />
          <path d="M 0 206 Q 210 192 420 206 L 420 250 L 0 250 Z" fill="#dce9f7" />

          {/* Step 1+: Wooden Post & Seed Tray */}
          {step >= 1 && (
            <g className="tree-part-enter">
              <rect x="202" y="148" width="16" height="82" rx="2" fill="#6b4426" stroke="#3e2514" strokeWidth="2" />
              <rect x="148" y="140" width="124" height="14" rx="4" fill="#8c5a34" stroke="#4a2d17" strokeWidth="2" />
              <rect x="158" y="132" width="104" height="8" rx="2" fill="#a46d42" />
            </g>
          )}

          {/* Step 2+: Support Pillars, Roof & Perch */}
          {step >= 2 && (
            <g className="tree-part-enter">
              <rect x="166" y="88" width="8" height="46" fill="#6b4426" />
              <rect x="246" y="88" width="8" height="46" fill="#6b4426" />
              {/* Gabled Wooden Roof */}
              <polygon points="136,92 210,46 284,92" fill="#7a4827" stroke="#3e2514" strokeWidth="2.5" />
              {/* Snow dusting on roof */}
              <path d="M 136 92 L 210 46 L 284 92 L 274 96 L 210 56 L 146 96 Z" fill="#e6f1fc" />
            </g>
          )}

          {/* Step 3+: Scattered Seeds on Tray */}
          {step >= 3 && (
            <g className="tree-part-enter">
              {[
                [172, 134, '#e6b85c'], [182, 132, '#c9933b'], [194, 134, '#f0c674'],
                [206, 131, '#d9a441'], [218, 134, '#e6b85c'], [230, 132, '#c9933b'],
                [242, 134, '#f0c674'], [188, 135, '#8c6239'], [224, 135, '#8c6239'],
              ].map(([sx, sy, sc], idx) => (
                <ellipse key={idx} cx={sx as number} cy={sy as number} rx="3.2" ry="1.8" fill={sc as string} />
              ))}
            </g>
          )}

          {/* Step 4: Visiting Winter Bird */}
          {step >= 4 && (
            <g transform="translate(212, 118)" className="bird-bob">
              {/* Tail */}
              <polygon points="-14,4 -30,10 -26,-1" fill={bird.wing} />
              {/* Body */}
              <ellipse cx="0" cy="0" rx="16" ry="12" fill={bird.body} />
              {/* Breast */}
              <ellipse cx="5" cy="3" rx="10" ry="8" fill={bird.breast} />
              {/* Wing */}
              <ellipse cx="-4" cy="1" rx="9" ry="5.5" fill={bird.wing} transform="rotate(-12 -4 1)" />
              {/* Head */}
              <circle cx="11" cy="-9" r="8.5" fill={bird.body} />
              {bird.crest && <polygon points="8,-16 14,-23 16,-14" fill={bird.body} />}
              {/* Eye */}
              <circle cx="14" cy="-10" r="1.6" fill="#0f172a" />
              {/* Beak */}
              <polygon points="18,-9 26,-7 18,-5" fill="#f59e0b" />
              {/* Tiny legs */}
              <line x1="-2" y1="11" x2="-4" y2="18" stroke="#3e2514" strokeWidth="1.8" />
              <line x1="4" y1="11" x2="6" y2="18" stroke="#3e2514" strokeWidth="1.8" />
            </g>
          )}
        </svg>
      </div>

      <div className="day1-controls">
        <div className="chop-meter" aria-label={`Feeder progress ${step} of ${TOTAL_STEPS}`}>
          <div className="chop-meter-fill" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
        </div>

        {!isDone ? (
          <button type="button" className="primary-btn" onClick={handleNext} autoFocus>
            Step {step + 1}/{TOTAL_STEPS}: {STEP_LABELS[step]}
          </button>
        ) : (
          <div className="day1-done-actions">
            <button type="button" className="primary-btn" onClick={handleSave} autoFocus>
              {existingState ? 'Update Yard Bird Feeder' : 'Place Feeder in Snowy Yard'}
            </button>
            <button type="button" className="toolbar-btn" onClick={() => setStep(0)}>
              Rebuild
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
