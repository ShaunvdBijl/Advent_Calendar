import { useState } from 'react';
import type { Day22State } from '../types/calendar';

interface Day22PrepEggnogProps {
  existingState?: Day22State;
  onComplete: (state: Day22State) => void;
}

const TOPPINGS: { id: Day22State['topping']; label: string }[] = [
  { id: 'cinnamon-stick', label: 'Cinnamon Stick' },
  { id: 'whipped-nutmeg', label: 'Whipped Cream & Nutmeg' },
  { id: 'caramel-drizzle', label: 'Spiced Caramel Swirl' },
];

const TOTAL_STEPS = 4;
const STEP_LABELS = [
  'Pour Cream, Eggs & Vanilla',
  'Whisk Until Rich & Frothy',
  'Grate Fresh Nutmeg & Cinnamon',
  'Garnish & Pour Steaming Mug',
];

export function Day22PrepEggnog({ existingState, onComplete }: Day22PrepEggnogProps) {
  const [topping, setTopping] = useState<Day22State['topping']>(
    existingState?.topping ?? 'cinnamon-stick',
  );
  const [step, setStep] = useState<number>(existingState ? TOTAL_STEPS : 0);

  const isDone = step >= TOTAL_STEPS;

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    }
  };

  const handleSave = () => {
    onComplete({
      preppedAt: new Date().toISOString(),
      topping,
    });
  };

  return (
    <div className="day9-container">
      <p className="day-intro">
        Whisk up a cozy batch of spiced holiday <strong>eggnog</strong>, dust with freshly grated
        nutmeg, and pick your favorite festive topping!
      </p>

      <div className="variant-picker" role="group" aria-label="Choose eggnog topping">
        {TOPPINGS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`variant-btn${topping === opt.id ? ' active' : ''}`}
            onClick={() => setTopping(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="day2-scene-wrap">
        <svg
          viewBox="0 0 420 250"
          className="day2-svg"
          role="img"
          aria-label={`Eggnog preparation step ${step} of ${TOTAL_STEPS}`}
        >
          <defs>
            <linearGradient id="d22Bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2c1d14" />
              <stop offset="100%" stopColor="#1b120d" />
            </linearGradient>
            <linearGradient id="d22Counter" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#855a3c" />
              <stop offset="100%" stopColor="#5e3d26" />
            </linearGradient>
          </defs>

          <rect width="420" height="184" rx="12" fill="url(#d22Bg)" />
          <rect y="176" width="420" height="74" fill="url(#d22Counter)" />

          {/* Festive Holiday Mug */}
          <g transform="translate(152, 86)">
            {/* Mug Handle */}
            <path
              d="M 106 32 C 134 32, 134 84, 106 84"
              fill="none"
              stroke="#b82830"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M 106 32 C 134 32, 134 84, 106 84"
              fill="none"
              stroke="#8f1c22"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Mug Interior */}
            <ellipse cx="58" cy="24" rx="50" ry="12" fill="#4f291c" />

            {/* Step 1+: Golden Cream & Eggnog Liquid */}
            {step >= 1 && (
              <ellipse
                cx="58"
                cy="25"
                rx="46"
                ry="10"
                fill={step >= 2 ? '#f5dfad' : '#f7ecd0'}
                className="tree-part-enter"
              />
            )}

            {/* Step 2+: Frothy Whisked Foam */}
            {step >= 2 && (
              <g fill="#fff8e8" className="tree-part-enter">
                <ellipse cx="42" cy="24" rx="18" ry="6" />
                <ellipse cx="72" cy="24" rx="18" ry="6" />
                <ellipse cx="58" cy="21" rx="22" ry="7" />
              </g>
            )}

            {/* Step 3+: Grated Nutmeg & Cinnamon Specks */}
            {step >= 3 && (
              <g fill="#8c5327" className="tree-part-enter">
                <circle cx="42" cy="22" r="1.5" />
                <circle cx="52" cy="19" r="1.6" />
                <circle cx="64" cy="21" r="1.5" />
                <circle cx="74" cy="24" r="1.4" />
                <circle cx="57" cy="25" r="1.6" />
                <circle cx="48" cy="26" r="1.3" />
              </g>
            )}

            {/* Step 4: Selected Garnish & Warm Steam */}
            {step >= 4 && (
              <g className="tree-part-enter">
                {topping === 'cinnamon-stick' && (
                  <rect
                    x="72"
                    y="-18"
                    width="9"
                    height="46"
                    rx="3"
                    fill="#7c4120"
                    stroke="#4a240e"
                    strokeWidth="1.5"
                    transform="rotate(24 76 12)"
                  />
                )}
                {topping === 'whipped-nutmeg' && (
                  <g>
                    <path
                      d="M 30 24 Q 44 2 58 10 Q 72 2 86 24 Z"
                      fill="#ffffff"
                      stroke="#e2e8f0"
                      strokeWidth="1.5"
                    />
                    <path d="M 46 12 Q 58 -6 70 12 Z" fill="#ffffff" />
                    <circle cx="54" cy="6" r="1.6" fill="#8c5327" />
                    <circle cx="62" cy="10" r="1.5" fill="#8c5327" />
                  </g>
                )}
                {topping === 'caramel-drizzle' && (
                  <path
                    d="M 34 22 Q 44 16 54 22 T 74 22 T 86 20"
                    fill="none"
                    stroke="#c97a2b"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                )}

                {/* Warm Steam */}
                <g fill="none" stroke="#ffe7c2" strokeWidth="2.5" strokeLinecap="round" opacity="0.75">
                  <path d="M 40 -4 Q 34 -20 42 -34" className="steam-rise" />
                  <path d="M 60 -10 Q 54 -26 62 -40" className="steam-rise" style={{ animationDelay: '0.5s' }} />
                  <path d="M 80 -4 Q 74 -20 82 -34" className="steam-rise" style={{ animationDelay: '1s' }} />
                </g>
              </g>
            )}

            {/* Mug Ceramic Body */}
            <path
              d="M 8 24 L 8 92 C 8 110, 108 110, 108 92 L 108 24 C 108 36, 8 36, 8 24 Z"
              fill="#b82830"
              stroke="#7a181e"
              strokeWidth="2.5"
            />
            {/* Snowflake Emblem on Mug */}
            <g stroke="#f0c674" strokeWidth="2.5" strokeLinecap="round" opacity="0.9">
              <line x1="58" y1="54" x2="58" y2="82" />
              <line x1="44" y1="68" x2="72" y2="68" />
              <line x1="48" y1="58" x2="68" y2="78" />
              <line x1="68" y1="58" x2="48" y2="78" />
            </g>
          </g>
        </svg>
      </div>

      <div className="day1-controls">
        <div className="chop-meter" aria-label={`Eggnog prep progress ${step} of ${TOTAL_STEPS}`}>
          <div className="chop-meter-fill" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
        </div>

        {!isDone ? (
          <button type="button" className="primary-btn" onClick={handleNext} autoFocus>
            Step {step + 1}/{TOTAL_STEPS}: {STEP_LABELS[step]}
          </button>
        ) : (
          <div className="day1-done-actions">
            <button type="button" className="primary-btn" onClick={handleSave} autoFocus>
              {existingState ? 'Update Holiday Eggnog' : 'Set Steaming Eggnog on Windowsill'}
            </button>
            <button type="button" className="toolbar-btn" onClick={() => setStep(0)}>
              Make Fresh Batch
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
