import { useState } from 'react';
import type { Day7State } from '../types/calendar';

interface Day07FireplaceProps {
  existingState?: Day7State;
  onComplete: (state: Day7State) => void;
}

const TOTAL_LOGS = 3;

export function Day07Fireplace({ existingState, onComplete }: Day07FireplaceProps) {
  const [logsStacked, setLogsStacked] = useState<number>(existingState ? TOTAL_LOGS : 0);
  const [isLit, setIsLit] = useState<boolean>(Boolean(existingState));
  const [striking, setStriking] = useState<boolean>(false);
  const [intensity, setIntensity] = useState<Day7State['intensity']>(
    existingState?.intensity ?? 'cozy',
  );

  const allLogsPlaced = logsStacked >= TOTAL_LOGS;

  const handleStackLog = () => {
    if (logsStacked < TOTAL_LOGS) {
      setLogsStacked((n) => n + 1);
    }
  };

  const handleStrikeMatch = () => {
    if (!allLogsPlaced || isLit || striking) return;
    setStriking(true);
    window.setTimeout(() => {
      setStriking(false);
      setIsLit(true);
    }, 450);
  };

  const handleSave = () => {
    onComplete({
      litAt: new Date().toISOString(),
      intensity,
    });
  };

  const flameScale = intensity === 'roaring' ? 1.18 : 0.96;

  return (
    <div className="day7-container">
      <p className="day-intro">
        Stack <strong>{TOTAL_LOGS} firewood logs</strong> onto the grate, then strike a match to
        ignite a permanent flickering fire that warms the entire cabin!
      </p>

      {isLit && (
        <div className="variant-picker" role="group" aria-label="Fire intensity">
          <button
            type="button"
            className={`variant-btn${intensity === 'cozy' ? ' active' : ''}`}
            onClick={() => setIntensity('cozy')}
          >
            Cozy Ember
          </button>
          <button
            type="button"
            className={`variant-btn${intensity === 'roaring' ? ' active' : ''}`}
            onClick={() => setIntensity('roaring')}
          >
            Roaring Blaze
          </button>
        </div>
      )}

      <div className="day2-scene-wrap">
        <svg
          viewBox="0 0 420 260"
          className="day2-svg"
          role="img"
          aria-label={isLit ? 'Flickering fire burning inside the hearth' : `Hearth with ${logsStacked} of ${TOTAL_LOGS} logs stacked`}
        >
          <defs>
            <radialGradient id="d7FireGlow" cx="50%" cy="72%" r="55%">
              <stop offset="0%" stopColor="#ff9b26" stopOpacity={intensity === 'roaring' ? 0.55 : 0.38} />
              <stop offset="55%" stopColor="#ff6a00" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ff6a00" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="d7FlameOuter" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#d93814" />
              <stop offset="65%" stopColor="#ff7b1c" />
              <stop offset="100%" stopColor="#ffd166" />
            </linearGradient>
            <linearGradient id="d7FlameInner" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#ff9e1f" />
              <stop offset="100%" stopColor="#fff3b0" />
            </linearGradient>
          </defs>

          {/* Stone Fireplace Surround */}
          <rect width="420" height="260" rx="12" fill="#4b5260" />
          {/* Stone brick texture lines */}
          <g stroke="#343a46" strokeWidth="2" opacity="0.55">
            <line x1="0" y1="52" x2="420" y2="52" />
            <line x1="0" y1="104" x2="420" y2="104" />
            <line x1="0" y1="156" x2="420" y2="156" />
            <line x1="0" y1="208" x2="420" y2="208" />
          </g>

          {/* Hearth Arch Opening */}
          <path d="M 75 240 L 75 130 A 135 100 0 0 1 345 130 L 345 240 Z" fill="#171316" />

          {/* Warm Glow Inside Hearth */}
          {isLit && (
            <rect
              width="420"
              height="260"
              fill="url(#d7FireGlow)"
              className="fire-glow-pulse"
            />
          )}

          {/* Iron Grate */}
          <g stroke="#3c4048" strokeWidth="5" strokeLinecap="round">
            <line x1="115" y1="224" x2="305" y2="224" />
            <line x1="138" y1="224" x2="138" y2="238" />
            <line x1="282" y1="224" x2="282" y2="238" />
          </g>

          {/* Log 1 (Left Base) */}
          {logsStacked >= 1 && (
            <g className="tree-part-enter">
              <rect
                x="130"
                y="200"
                width="102"
                height="22"
                rx="10"
                fill="#5e371f"
                stroke="#3d2212"
                strokeWidth="2"
                transform="rotate(-7 180 211)"
              />
              <ellipse cx="132" cy="216" rx="6" ry="10" fill="#a8794c" />
            </g>
          )}

          {/* Log 2 (Right Base) */}
          {logsStacked >= 2 && (
            <g className="tree-part-enter">
              <rect
                x="188"
                y="200"
                width="102"
                height="22"
                rx="10"
                fill="#6c4024"
                stroke="#3d2212"
                strokeWidth="2"
                transform="rotate(8 238 211)"
              />
              <ellipse cx="288" cy="217" rx="6" ry="10" fill="#b88856" />
            </g>
          )}

          {/* Log 3 (Top Crossed Log + Kindling) */}
          {logsStacked >= 3 && (
            <g className="tree-part-enter">
              <rect
                x="154"
                y="184"
                width="112"
                height="20"
                rx="9"
                fill="#7b4929"
                stroke="#3d2212"
                strokeWidth="2"
                transform="rotate(-2 210 194)"
              />
              <ellipse cx="264" cy="193" rx="5" ry="9" fill="#c79763" />
            </g>
          )}

          {/* Striking Match Animation */}
          {striking && (
            <g className="match-strike-anim">
              <line x1="255" y1="162" x2="214" y2="188" stroke="#d9b482" strokeWidth="4" strokeLinecap="round" />
              <circle cx="212" cy="189" r="5" fill="#d63638" />
              <circle cx="210" cy="187" r="11" fill="#ffe17d" opacity="0.9" />
            </g>
          )}

          {/* Animated Flickering SVG Fire */}
          {isLit && (
            <g transform={`translate(210 198) scale(${flameScale}) translate(-210 -198)`}>
              {/* Outer Flame */}
              <path
                d="M 164 198 C 156 154, 186 122, 210 86 C 234 122, 264 154, 256 198 Z"
                fill="url(#d7FlameOuter)"
                className="fire-flicker-outer"
              />
              {/* Side Licks */}
              <path
                d="M 152 200 C 148 172, 166 156, 176 136 C 186 156, 192 178, 184 200 Z"
                fill="url(#d7FlameOuter)"
                className="fire-flicker-side"
              />
              <path
                d="M 234 200 C 230 176, 240 154, 248 134 C 260 156, 272 174, 266 200 Z"
                fill="url(#d7FlameOuter)"
                className="fire-flicker-side"
              />
              {/* Inner Bright Core */}
              <path
                d="M 184 198 C 180 168, 196 146, 210 120 C 224 146, 240 168, 236 198 Z"
                fill="url(#d7FlameInner)"
                className="fire-flicker-inner"
              />
              {/* Rising Embers */}
              <circle cx="192" cy="112" r="2.5" fill="#ffe08a" className="ember-rise-a" />
              <circle cx="226" cy="102" r="2" fill="#ffb74d" className="ember-rise-b" />
            </g>
          )}
        </svg>
      </div>

      <div className="day1-controls">
        <div className="chop-meter" aria-label={`Fireplace setup ${isLit ? 4 : logsStacked} of 4`}>
          <div
            className="chop-meter-fill"
            style={{ width: `${((isLit ? 4 : logsStacked) / 4) * 100}%` }}
          />
        </div>

        {!allLogsPlaced ? (
          <button type="button" className="primary-btn" onClick={handleStackLog} autoFocus>
            Stack Firewood Log ({logsStacked}/{TOTAL_LOGS})
          </button>
        ) : !isLit ? (
          <button
            type="button"
            className="primary-btn"
            disabled={striking}
            onClick={handleStrikeMatch}
            autoFocus
          >
            {striking ? 'Striking Match...' : 'Strike Match & Ignite Fire'}
          </button>
        ) : (
          <div className="day1-done-actions">
            <button type="button" className="primary-btn" onClick={handleSave} autoFocus>
              {existingState ? 'Update Fireplace' : 'Keep Fire Burning'}
            </button>
            <button
              type="button"
              className="toolbar-btn"
              onClick={() => {
                setIsLit(false);
                setLogsStacked(0);
              }}
            >
              Rebuild Fire
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
