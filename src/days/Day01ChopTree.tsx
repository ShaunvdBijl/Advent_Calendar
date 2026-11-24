import { useState } from 'react';
import type { Day1State } from '../types/calendar';

interface Day01ChopTreeProps {
  existingState?: Day1State;
  onComplete: (state: Day1State) => void;
}

const TOTAL_CHOPS = 5;

const TREE_VARIANTS: Record<
  Day1State['treeVariant'],
  { label: string; dark: string; light: string }
> = {
  spruce: { label: 'Blue Spruce', dark: '#1c4b47', light: '#2a6b65' },
  pine: { label: 'Scots Pine', dark: '#1e4932', light: '#2a6345' },
  fir: { label: 'Douglas Fir', dark: '#173d2e', light: '#215742' },
};

export function Day01ChopTree({ existingState, onComplete }: Day01ChopTreeProps) {
  const [variant, setVariant] = useState<Day1State['treeVariant']>(
    existingState?.treeVariant ?? 'spruce',
  );
  const [chops, setChops] = useState(existingState ? TOTAL_CHOPS : 0);
  const [swinging, setSwinging] = useState(false);

  const isFelled = chops >= TOTAL_CHOPS;
  const palette = TREE_VARIANTS[variant];

  const handleChop = () => {
    if (isFelled || swinging) return;
    setSwinging(true);
    const nextChops = chops + 1;
    setChops(nextChops);

    window.setTimeout(() => {
      setSwinging(false);
    }, 240);
  };

  const handleFinish = () => {
    onComplete({
      choppedAt: new Date().toISOString(),
      treeVariant: variant,
    });
  };

  const handleResetTree = () => {
    setChops(0);
  };

  const tiltDeg = isFelled ? 84 : chops * 2.5;

  return (
    <div className="day1-container">
      <p className="day-intro">
        Choose your favorite evergreen in the snowy woods and swing the axe{' '}
        <strong>{TOTAL_CHOPS} times</strong> to chop it down for the cabin!
      </p>

      <div className="variant-picker" role="group" aria-label="Choose tree species">
        {(Object.keys(TREE_VARIANTS) as Day1State['treeVariant'][]).map((key) => (
          <button
            key={key}
            type="button"
            className={`variant-btn${variant === key ? ' active' : ''}`}
            disabled={chops > 0 && !isFelled}
            onClick={() => setVariant(key)}
          >
            {TREE_VARIANTS[key].label}
          </button>
        ))}
      </div>

      <div className="day1-scene-wrap">
        <svg
          viewBox="0 0 420 260"
          className="day1-svg"
          role="img"
          aria-label={`Interactive snowy forest scene with a ${palette.label}`}
        >
          <defs>
            <linearGradient id="d1Sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d1b33" />
              <stop offset="100%" stopColor="#1d3557" />
            </linearGradient>
          </defs>

          <rect width="420" height="260" rx="12" fill="url(#d1Sky)" />
          {/* Snow ground */}
          <path d="M 0 210 Q 210 190 420 210 L 420 260 L 0 260 Z" fill="#dce9f7" />

          {/* Stump base */}
          <path d="M 196 225 L 200 194 L 220 194 L 224 225 Z" fill="#5c3a21" />
          {/* Chop notch */}
          {chops > 0 && (
            <polygon
              points={`200,203 ${200 + Math.min(chops * 3, 14)},207 200,211`}
              fill="#d9b482"
            />
          )}

          {/* Falling / standing tree */}
          <g
            style={{
              transformOrigin: '210px 198px',
              transform: `rotate(${tiltDeg}deg)`,
              transition: isFelled
                ? 'transform 0.65s cubic-bezier(0.32, 0, 0.78, 0.25)'
                : 'transform 0.18s ease-out',
            }}
          >
            <rect x="202" y="150" width="16" height="48" fill="#5c3a21" />
            <polygon points="210,32 158,118 262,118" fill={palette.dark} />
            <polygon points="210,66 146,154 274,154" fill={palette.light} />
            <polygon points="210,104 134,186 286,186" fill={palette.dark} />
          </g>

          {/* Animated Axe */}
          {!isFelled && (
            <g
              style={{
                transformOrigin: '165px 205px',
                transform: swinging ? 'rotate(38deg)' : 'rotate(-16deg)',
                transition: 'transform 0.14s ease-in-out',
              }}
            >
              <rect x="158" y="145" width="7" height="62" rx="3" fill="#8b5a2b" />
              <path d="M 164 146 L 186 138 L 186 160 L 164 156 Z" fill="#cbd5e1" />
              <path d="M 182 139 L 186 138 L 186 160 L 182 159 Z" fill="#f8fafc" />
            </g>
          )}

          {/* Flying woodchips on swing */}
          {swinging && (
            <g fill="#e6c38d">
              <circle cx="185" cy="196" r="3" />
              <circle cx="176" cy="186" r="2.5" />
              <circle cx="228" cy="192" r="2.5" />
            </g>
          )}
        </svg>
      </div>

      <div className="day1-controls">
        <div className="chop-meter" aria-label={`Chop progress ${chops} of ${TOTAL_CHOPS}`}>
          <div
            className="chop-meter-fill"
            style={{ width: `${(chops / TOTAL_CHOPS) * 100}%` }}
          />
        </div>

        {!isFelled ? (
          <button type="button" className="primary-btn" onClick={handleChop} autoFocus>
            Swing Axe ({chops}/{TOTAL_CHOPS})
          </button>
        ) : (
          <div className="day1-done-actions">
            <button type="button" className="primary-btn" onClick={handleFinish} autoFocus>
              {existingState ? 'Update Tree Choice' : 'Bring Tree to Cabin'}
            </button>
            <button type="button" className="toolbar-btn" onClick={handleResetTree}>
              Chop Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
