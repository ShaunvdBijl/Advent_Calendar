import { useState } from 'react';
import { GingerbreadHouseArt } from '../components/GingerbreadHouseArt';
import type { Day10State, Day9State } from '../types/calendar';

interface Day10BuildGingerbreadHouseProps {
  spiceBlend?: Day9State['spiceBlend'];
  existingState?: Day10State;
  onComplete: (state: Day10State) => void;
}

const ICING_OPTIONS: { id: Day10State['icingColor']; label: string }[] = [
  { id: 'snow-white', label: 'Snow White' },
  { id: 'mint-cream', label: 'Mint Cream' },
  { id: 'pink-frost', label: 'Pink Frost' },
];

const CANDY_OPTIONS: { id: Day10State['candyTheme']; label: string }[] = [
  { id: 'peppermint', label: 'Peppermint' },
  { id: 'gumdrop-rainbow', label: 'Gumdrop Rainbow' },
  { id: 'gold-dragees', label: 'Gold Dragées' },
];

const TOTAL_STEPS = 4;
const STEP_LABELS = [
  'Stand & Glue Gingerbread Walls',
  'Attach Sloped Roof & Chimney',
  'Pipe Snow-Drift Icing',
  'Press Gumdrops & Candies',
];

export function Day10BuildGingerbreadHouse({
  spiceBlend = 'classic-ginger',
  existingState,
  onComplete,
}: Day10BuildGingerbreadHouseProps) {
  const [icingColor, setIcingColor] = useState<Day10State['icingColor']>(
    existingState?.icingColor ?? 'snow-white',
  );
  const [candyTheme, setCandyTheme] = useState<Day10State['candyTheme']>(
    existingState?.candyTheme ?? 'peppermint',
  );
  const [stage, setStage] = useState<number>(existingState ? TOTAL_STEPS : 0);

  const isDone = stage >= TOTAL_STEPS;

  const handleNext = () => {
    if (stage < TOTAL_STEPS) {
      setStage((s) => s + 1);
    }
  };

  const handleSave = () => {
    onComplete({
      builtAt: new Date().toISOString(),
      icingColor,
      candyTheme,
    });
  };

  return (
    <div className="day9-container">
      <p className="day-intro">
        Assemble your freshly baked Day 9 gingerbread panels, pipe sweet snow-drift icing, and
        decorate with holiday candies!
      </p>

      <div className="day2-options-row">
        <div className="variant-picker" role="group" aria-label="Icing color">
          {ICING_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`variant-btn${icingColor === opt.id ? ' active' : ''}`}
              onClick={() => setIcingColor(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="variant-picker" role="group" aria-label="Candy theme">
          {CANDY_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`variant-btn${candyTheme === opt.id ? ' active' : ''}`}
              onClick={() => setCandyTheme(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="day2-scene-wrap">
        <svg
          viewBox="0 0 420 250"
          className="day2-svg"
          role="img"
          aria-label={`Gingerbread house assembly step ${stage} of ${TOTAL_STEPS}`}
        >
          <defs>
            <linearGradient id="d10Bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2c221d" />
              <stop offset="100%" stopColor="#1b1411" />
            </linearGradient>
            <linearGradient id="d10Table" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#855a3c" />
              <stop offset="100%" stopColor="#5e3d26" />
            </linearGradient>
          </defs>

          <rect width="420" height="185" rx="12" fill="url(#d10Bg)" />
          <rect y="175" width="420" height="75" fill="url(#d10Table)" />

          {/* Wooden Cake Board */}
          <ellipse cx="210" cy="204" rx="128" ry="18" fill="#4f3320" stroke="#a67c52" strokeWidth="2" />

          {/* Centered Gingerbread House */}
          <g transform="translate(90, 26) scale(1.2)">
            <GingerbreadHouseArt
              spiceBlend={spiceBlend}
              icingColor={icingColor}
              candyTheme={candyTheme}
              stage={stage}
            />
          </g>
        </svg>
      </div>

      <div className="day1-controls">
        <div className="chop-meter" aria-label={`House build progress ${stage} of ${TOTAL_STEPS}`}>
          <div
            className="chop-meter-fill"
            style={{ width: `${(stage / TOTAL_STEPS) * 100}%` }}
          />
        </div>

        {!isDone ? (
          <button type="button" className="primary-btn" onClick={handleNext} autoFocus>
            Step {stage + 1}/{TOTAL_STEPS}: {STEP_LABELS[stage]}
          </button>
        ) : (
          <div className="day1-done-actions">
            <button type="button" className="primary-btn" onClick={handleSave} autoFocus>
              {existingState ? 'Update Gingerbread House' : 'Finish Gingerbread House'}
            </button>
            <button type="button" className="toolbar-btn" onClick={() => setStage(0)}>
              Rebuild
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
