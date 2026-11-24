import { useState } from 'react';
import type { Day1State, Day2State } from '../types/calendar';

interface Day02BuildTreeProps {
  treeVariant?: Day1State['treeVariant'];
  existingState?: Day2State;
  onComplete: (state: Day2State) => void;
}

const TREE_PALETTES: Record<
  Day1State['treeVariant'],
  { label: string; dark: string; mid: string; light: string }
> = {
  spruce: { label: 'Blue Spruce', dark: '#18423e', mid: '#215853', light: '#2d756e' },
  pine: { label: 'Scots Pine', dark: '#1a422c', mid: '#24593c', light: '#2f724d' },
  fir: { label: 'Douglas Fir', dark: '#143628', mid: '#1d4c39', light: '#26634b' },
};

const STAND_OPTIONS: { id: Day2State['standStyle']; label: string }[] = [
  { id: 'classic-red', label: 'Classic Red Stand' },
  { id: 'wooden-barrel', label: 'Wooden Barrel' },
  { id: 'gold-pot', label: 'Brass Planter' },
];

const TOTAL_STEPS = 4;

const STEP_LABELS = [
  'Place Tree Stand',
  'Mount Trunk Upright',
  'Attach Lower & Mid Boughs',
  'Crown the Top Bough',
];

export function Day02BuildTree({
  treeVariant = 'spruce',
  existingState,
  onComplete,
}: Day02BuildTreeProps) {
  const [standStyle, setStandStyle] = useState<Day2State['standStyle']>(
    existingState?.standStyle ?? 'classic-red',
  );
  const [heightScale, setHeightScale] = useState<Day2State['heightScale']>(
    existingState?.heightScale ?? 'tall',
  );
  const [step, setStep] = useState<number>(existingState ? TOTAL_STEPS : 0);

  const palette = TREE_PALETTES[treeVariant];
  const isComplete = step >= TOTAL_STEPS;

  const handleAdvance = () => {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    }
  };

  const handleSave = () => {
    onComplete({
      builtAt: new Date().toISOString(),
      standStyle,
      heightScale,
    });
  };

  const scaleY = heightScale === 'tall' ? 1.06 : 0.94;

  return (
    <div className="day2-container">
      <p className="day-intro">
        Bring your freshly cut <strong>{palette.label}</strong> inside and assemble it
        step-by-step on the living room rug!
      </p>

      <div className="day2-options-row">
        <div className="variant-picker" role="group" aria-label="Choose tree stand">
          {STAND_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`variant-btn${standStyle === opt.id ? ' active' : ''}`}
              onClick={() => setStandStyle(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="variant-picker" role="group" aria-label="Choose tree height">
          <button
            type="button"
            className={`variant-btn${heightScale === 'cozy' ? ' active' : ''}`}
            onClick={() => setHeightScale('cozy')}
          >
            Cozy Height
          </button>
          <button
            type="button"
            className={`variant-btn${heightScale === 'tall' ? ' active' : ''}`}
            onClick={() => setHeightScale('tall')}
          >
            Grand &amp; Tall
          </button>
        </div>
      </div>

      <div className="day2-scene-wrap">
        <svg
          viewBox="0 0 420 280"
          className="day2-svg"
          role="img"
          aria-label={`Interactive living room tree assembly (${step} of ${TOTAL_STEPS} steps complete)`}
        >
          <defs>
            <linearGradient id="d2Wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b2618" />
              <stop offset="100%" stopColor="#26170e" />
            </linearGradient>
            <linearGradient id="d2Floor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f3320" />
              <stop offset="100%" stopColor="#2e1b10" />
            </linearGradient>
          </defs>

          {/* Cabin Backdrop */}
          <rect width="420" height="215" rx="12" fill="url(#d2Wall)" />
          <rect y="205" width="420" height="75" fill="url(#d2Floor)" />

          {/* Tree Rug */}
          <ellipse
            cx="210"
            cy="242"
            rx="105"
            ry="22"
            fill="#7c262d"
            stroke="#d9b166"
            strokeWidth="3"
          />

          {/* Step 2+: Trunk */}
          {step >= 2 && (
            <g className="tree-part-enter">
              <rect x="200" y="96" width="20" height="140" rx="4" fill="#5c3a21" />
            </g>
          )}

          {/* Step 1+: Tree Stand */}
          {step >= 1 && (
            <g className="tree-part-enter">
              {standStyle === 'classic-red' && (
                <>
                  <path d="M 182 242 L 192 216 L 228 216 L 238 242 Z" fill="#a8262d" />
                  <rect x="188" y="213" width="44" height="6" rx="2" fill="#e6b95c" />
                </>
              )}
              {standStyle === 'wooden-barrel' && (
                <>
                  <path d="M 184 242 L 188 212 L 232 212 L 236 242 Z" fill="#7c4f31" />
                  <line x1="186" y1="221" x2="234" y2="221" stroke="#3c2a1e" strokeWidth="3" />
                  <line x1="185" y1="234" x2="235" y2="234" stroke="#3c2a1e" strokeWidth="3" />
                </>
              )}
              {standStyle === 'gold-pot' && (
                <>
                  <path d="M 186 242 L 182 214 L 238 214 L 234 242 Z" fill="#cfa047" />
                  <rect x="178" y="210" width="64" height="7" rx="3" fill="#f0c674" />
                </>
              )}
            </g>
          )}

          {/* Scaled foliage tiers */}
          <g
            style={{
              transformOrigin: '210px 216px',
              transform: `scaleY(${scaleY})`,
              transition: 'transform 0.25s ease',
            }}
          >
            {/* Step 3+: Lower & Middle Boughs */}
            {step >= 3 && (
              <g className="tree-part-enter">
                <polygon points="210,126 118,214 302,214" fill={palette.dark} />
                <polygon points="210,88 138,168 282,168" fill={palette.mid} />
              </g>
            )}

            {/* Step 4: Top Crown Bough */}
            {step >= 4 && (
              <g className="tree-part-enter">
                <polygon points="210,36 156,120 264,120" fill={palette.light} />
                {/* Subtle pine needle highlights */}
                <path
                  d="M 210 44 L 182 104 M 210 44 L 238 104"
                  stroke="rgba(255,255,255,0.16)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            )}
          </g>
        </svg>
      </div>

      <div className="day1-controls">
        <div className="chop-meter" aria-label={`Assembly progress ${step} of ${TOTAL_STEPS}`}>
          <div
            className="chop-meter-fill"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>

        {!isComplete ? (
          <button type="button" className="primary-btn" onClick={handleAdvance} autoFocus>
            Step {step + 1}/{TOTAL_STEPS}: {STEP_LABELS[step]}
          </button>
        ) : (
          <div className="day1-done-actions">
            <button type="button" className="primary-btn" onClick={handleSave} autoFocus>
              {existingState ? 'Update Tree Setup' : 'Place Tree in Living Room'}
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
