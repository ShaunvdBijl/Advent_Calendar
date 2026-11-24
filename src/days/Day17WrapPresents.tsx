import { useState } from 'react';
import type { Day17State } from '../types/calendar';

interface Day17WrapPresentsProps {
  existingState?: Day17State;
  onComplete: (state: Day17State) => void;
}

const PAPER_STYLES: Record<
  Day17State['paperStyle'],
  { label: string; fill: string; accent: string; stroke: string }
> = {
  'crimson-plaid': { label: 'Crimson Plaid', fill: '#b82830', accent: '#8c1920', stroke: '#6b1218' },
  'pine-stars': { label: 'Evergreen Pine', fill: '#1f5c3e', accent: '#2c7a54', stroke: '#133d28' },
  'midnight-gold': { label: 'Midnight Navy', fill: '#1e3557', accent: '#2b4a78', stroke: '#12223a' },
};

const RIBBON_COLORS = [
  { id: '#f0c674', label: 'Gold Satin' },
  { id: '#e03131', label: 'Crimson Satin' },
  { id: '#f8fafc', label: 'Snow White' },
  { id: '#2f9e66', label: 'Emerald Ribbon' },
];

const TOTAL_STEPS = 3;
const STEP_LABELS = ['Cut Wrapping Paper', 'Fold & Tape Corners', 'Tie Satin Ribbon & Bow'];

export function Day17WrapPresents({ existingState, onComplete }: Day17WrapPresentsProps) {
  const [paperStyle, setPaperStyle] = useState<Day17State['paperStyle']>(
    existingState?.paperStyle ?? 'crimson-plaid',
  );
  const [ribbonColor, setRibbonColor] = useState<string>(
    existingState?.ribbonColor ?? RIBBON_COLORS[0].id,
  );
  const [step, setStep] = useState<number>(existingState ? TOTAL_STEPS : 0);

  const paper = PAPER_STYLES[paperStyle];
  const isDone = step >= TOTAL_STEPS;

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    }
  };

  const handleSave = () => {
    onComplete({
      wrappedAt: new Date().toISOString(),
      paperStyle,
      ribbonColor,
    });
  };

  return (
    <div className="day9-container">
      <p className="day-intro">
        Pick your wrapping paper and satin ribbon, then follow the 3-step wrapping sequence to
        place festive gift boxes under your Christmas tree!
      </p>

      <div className="day3-toolbar">
        <div className="day3-ornament-controls">
          <div className="variant-picker" role="group" aria-label="Wrapping paper style">
            {(Object.keys(PAPER_STYLES) as Day17State['paperStyle'][]).map((key) => (
              <button
                key={key}
                type="button"
                className={`variant-btn${paperStyle === key ? ' active' : ''}`}
                onClick={() => setPaperStyle(key)}
              >
                {PAPER_STYLES[key].label}
              </button>
            ))}
          </div>

          <div className="color-swatches" role="group" aria-label="Ribbon color">
            {RIBBON_COLORS.map((swatch) => (
              <button
                key={swatch.id}
                type="button"
                className={`color-swatch${ribbonColor === swatch.id ? ' active' : ''}`}
                style={{ backgroundColor: swatch.id }}
                aria-label={swatch.label}
                title={swatch.label}
                onClick={() => setRibbonColor(swatch.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="day2-scene-wrap">
        <svg
          viewBox="0 0 420 240"
          className="day2-svg"
          role="img"
          aria-label={`Gift wrapping step ${step} of ${TOTAL_STEPS}`}
        >
          {/* Wooden workbench */}
          <rect width="420" height="240" rx="12" fill="#4f3320" />
          <g stroke="#3a2315" strokeWidth="2" opacity="0.45">
            <line x1="0" y1="60" x2="420" y2="60" />
            <line x1="0" y1="120" x2="420" y2="120" />
            <line x1="0" y1="180" x2="420" y2="180" />
          </g>

          {/* Step 0: Uncut Wrapping Paper Roll + Dotted Cut Line + Cardboard Box */}
          {step === 0 && (
            <g>
              {/* Wrapping paper roll on left */}
              <rect x="44" y="42" width="24" height="156" rx="10" fill={paper.accent} stroke={paper.stroke} strokeWidth="2" />
              {/* Unrolled sheet */}
              <rect x="66" y="48" width="268" height="144" fill={paper.fill} stroke={paper.stroke} strokeWidth="2" />
              {/* Dotted cut line */}
              <line x1="312" y1="44" x2="312" y2="196" stroke="#fff8e7" strokeWidth="2.5" strokeDasharray="6 5" />
              {/* Cardboard box sitting in center */}
              <rect x="148" y="80" width="124" height="84" rx="4" fill="#c79b68" stroke="#8c6438" strokeWidth="2.5" />
              {/* Scissors icon on cut line */}
              <g transform="translate(312, 118)">
                <circle cx="14" cy="-8" r="7" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
                <circle cx="14" cy="8" r="7" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
                <line x1="8" y1="-4" x2="-12" y2="5" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                <line x1="8" y1="4" x2="-12" y2="-5" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
              </g>
            </g>
          )}

          {/* Step 1: Paper Cut to Size with Open Flaps */}
          {step === 1 && (
            <g className="tree-part-enter">
              {/* Open paper flaps */}
              <polygon points="104,72 142,84 142,164 104,176" fill={paper.accent} stroke={paper.stroke} strokeWidth="2" />
              <polygon points="316,72 278,84 278,164 316,176" fill={paper.accent} stroke={paper.stroke} strokeWidth="2" />
              <polygon points="142,46 278,46 266,84 154,84" fill={paper.fill} stroke={paper.stroke} strokeWidth="2" />
              {/* Center box partially covered */}
              <rect x="142" y="84" width="136" height="84" rx="4" fill={paper.fill} stroke={paper.stroke} strokeWidth="2.5" />
            </g>
          )}

          {/* Step 2–3: Crisp Folded Gift Box + Satin Ribbon & Bow */}
          {step >= 2 && (
            <g className="tree-part-enter" transform="translate(132, 76)">
              {/* Shadow */}
              <rect x="8" y="102" width="144" height="14" rx="7" fill="rgba(0,0,0,0.32)" />
              {/* Box Body */}
              <rect x="6" y="22" width="144" height="88" rx="4" fill={paper.fill} stroke={paper.stroke} strokeWidth="2.5" />
              {/* Box Lid */}
              <rect x="0" y="6" width="156" height="24" rx="4" fill={paper.accent} stroke={paper.stroke} strokeWidth="2.5" />
              {/* Subtle pattern accent dots */}
              <g fill="#f0c674" opacity="0.55">
                <circle cx="32" cy="52" r="2.5" />
                <circle cx="124" cy="52" r="2.5" />
                <circle cx="32" cy="86" r="2.5" />
                <circle cx="124" cy="86" r="2.5" />
              </g>

              {/* Step 3: Satin Ribbon & Double Bow */}
              {step >= 3 && (
                <g className="tree-part-enter">
                  {/* Vertical & Horizontal Ribbon */}
                  <rect x="68" y="6" width="20" height="104" fill={ribbonColor} />
                  <rect x="6" y="54" width="144" height="16" fill={ribbonColor} />
                  {/* Satin Bow Loops */}
                  <ellipse cx="60" cy="-2" rx="22" ry="11" fill={ribbonColor} stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" transform="rotate(-18 60 -2)" />
                  <ellipse cx="96" cy="-2" rx="22" ry="11" fill={ribbonColor} stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" transform="rotate(18 96 -2)" />
                  <circle cx="78" cy="4" r="8" fill={ribbonColor} stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
                </g>
              )}
            </g>
          )}
        </svg>
      </div>

      <div className="day1-controls">
        <div className="chop-meter" aria-label={`Wrapping progress ${step} of ${TOTAL_STEPS}`}>
          <div className="chop-meter-fill" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
        </div>

        {!isDone ? (
          <button type="button" className="primary-btn" onClick={handleNext} autoFocus>
            Step {step + 1}/{TOTAL_STEPS}: {STEP_LABELS[step]}
          </button>
        ) : (
          <div className="day1-done-actions">
            <button type="button" className="primary-btn" onClick={handleSave} autoFocus>
              {existingState ? 'Update Wrapped Gifts' : 'Place Wrapped Gifts Under Tree'}
            </button>
            <button type="button" className="toolbar-btn" onClick={() => setStep(0)}>
              Wrap Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
