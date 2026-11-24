import { useState } from 'react';
import { SnowmanArt } from '../components/SnowmanArt';
import type { Day11State, Day12State } from '../types/calendar';

interface Day12DressSnowmanProps {
  stickArms?: Day11State['stickArms'];
  existingState?: Day12State;
  onComplete: (state: Day12State) => void;
}

const ACCESSORY_COLORS = [
  { id: '#c92a35', label: 'Crimson Red' },
  { id: '#215c3e', label: 'Forest Green' },
  { id: '#3b82f6', label: 'Frost Blue' },
  { id: '#f0c674', label: 'Royal Gold' },
];

export function Day12DressSnowman({
  stickArms = 'waving',
  existingState,
  onComplete,
}: Day12DressSnowmanProps) {
  const [hasScarf, setHasScarf] = useState<boolean>(Boolean(existingState));
  const [hasCarrotNose, setHasCarrotNose] = useState<boolean>(Boolean(existingState));
  const [hasButtons, setHasButtons] = useState<boolean>(Boolean(existingState));
  const [hasTopHat, setHasTopHat] = useState<boolean>(Boolean(existingState));
  const [scarfColor, setScarfColor] = useState<string>(
    existingState?.scarfColor ?? ACCESSORY_COLORS[0].id,
  );
  const [hatBandColor, setHatBandColor] = useState<string>(
    existingState?.hatBandColor ?? ACCESSORY_COLORS[0].id,
  );

  const count = [hasScarf, hasCarrotNose, hasButtons, hasTopHat].filter(Boolean).length;
  const isComplete = count === 4;

  const handleSave = () => {
    onComplete({
      dressedAt: new Date().toISOString(),
      scarfColor,
      hatBandColor,
    });
  };

  return (
    <div className="day9-container">
      <p className="day-intro">
        Dress your Day 11 snowman with a cozy <strong>scarf</strong>, <strong>carrot nose</strong>,{' '}
        <strong>coal buttons</strong>, and a classic <strong>top hat</strong> to update his
        permanent look in the yard!
      </p>

      <div className="day3-toolbar">
        <div className="variant-picker" role="group" aria-label="Toggle snowman accessories">
          <button
            type="button"
            className={`variant-btn${hasScarf ? ' active' : ''}`}
            onClick={() => setHasScarf((v) => !v)}
          >
            {hasScarf ? '✓ Scarf' : '+ Add Scarf'}
          </button>
          <button
            type="button"
            className={`variant-btn${hasCarrotNose ? ' active' : ''}`}
            onClick={() => setHasCarrotNose((v) => !v)}
          >
            {hasCarrotNose ? '✓ Carrot Nose' : '+ Carrot Nose'}
          </button>
          <button
            type="button"
            className={`variant-btn${hasButtons ? ' active' : ''}`}
            onClick={() => setHasButtons((v) => !v)}
          >
            {hasButtons ? '✓ Buttons' : '+ Coal Buttons'}
          </button>
          <button
            type="button"
            className={`variant-btn${hasTopHat ? ' active' : ''}`}
            onClick={() => setHasTopHat((v) => !v)}
          >
            {hasTopHat ? '✓ Top Hat' : '+ Top Hat'}
          </button>
        </div>

        <div className="day3-ornament-controls">
          <span className="day-intro" style={{ fontSize: '0.82rem' }}>
            Scarf &amp; Hat Ribbon Color:
          </span>
          <div className="color-swatches" role="group" aria-label="Scarf and hat band color">
            {ACCESSORY_COLORS.map((swatch) => (
              <button
                key={swatch.id}
                type="button"
                className={`color-swatch${scarfColor === swatch.id ? ' active' : ''}`}
                style={{ backgroundColor: swatch.id }}
                aria-label={swatch.label}
                title={swatch.label}
                onClick={() => {
                  setScarfColor(swatch.id);
                  setHatBandColor(swatch.id);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="day2-scene-wrap">
        <svg
          viewBox="0 0 420 250"
          className="day2-svg"
          role="img"
          aria-label={`Dressed snowman preview (${count} of 4 accessories added)`}
        >
          <defs>
            <linearGradient id="d12Sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d1b33" />
              <stop offset="100%" stopColor="#1d3557" />
            </linearGradient>
          </defs>

          <rect width="420" height="250" rx="12" fill="url(#d12Sky)" />
          <path d="M 0 206 Q 210 190 420 206 L 420 250 L 0 250 Z" fill="#dce9f7" />

          <g transform="translate(210, 212) scale(1.22)">
            <SnowmanArt
              stickArms={stickArms}
              scarfColor={hasScarf ? scarfColor : undefined}
              hasCarrotNose={hasCarrotNose}
              hasButtons={hasButtons}
              hasTopHat={hasTopHat}
              hatBandColor={hatBandColor}
            />
          </g>
        </svg>
      </div>

      <div className="day1-controls">
        <div className="chop-meter" aria-label={`Accessories equipped: ${count} of 4`}>
          <div className="chop-meter-fill" style={{ width: `${(count / 4) * 100}%` }} />
        </div>

        <button
          type="button"
          className="primary-btn"
          disabled={!isComplete}
          onClick={handleSave}
          autoFocus
        >
          {isComplete
            ? existingState
              ? 'Update Snowman Outfit'
              : 'Save Dressed Snowman to Yard'
            : `Add ${4 - count} More Accessor${4 - count === 1 ? 'y' : 'ies'}`}
        </button>
      </div>
    </div>
  );
}
