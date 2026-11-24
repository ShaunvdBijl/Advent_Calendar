import { useState } from 'react';
import { GingerbreadHouseArt } from '../components/GingerbreadHouseArt';
import type { Day10State, Day15State, Day9State } from '../types/calendar';

interface Day15DisplayGingerbreadProps {
  spiceBlend?: Day9State['spiceBlend'];
  day10State?: Day10State;
  existingState?: Day15State;
  onComplete: (state: Day15State) => void;
}

export function Day15DisplayGingerbread({
  spiceBlend = 'classic-ginger',
  day10State,
  existingState,
  onComplete,
}: Day15DisplayGingerbreadProps) {
  const [placement, setPlacement] = useState<Day15State['placement']>(
    existingState?.placement ?? 'windowsill',
  );
  const [windowsLit, setWindowsLit] = useState<boolean>(Boolean(existingState));

  const handleSave = () => {
    onComplete({
      displayedAt: new Date().toISOString(),
      placement,
    });
  };

  return (
    <div className="day9-container">
      <p className="day-intro">
        Move your completed Day 10 gingerbread house onto the{' '}
        <strong>Panoramic Windowsill</strong> or <strong>Centerpiece Table</strong>, and tuck a
        tiny warm tealight inside so its candy windows glow!
      </p>

      <div className="variant-picker" role="group" aria-label="Choose gingerbread display spot">
        <button
          type="button"
          className={`variant-btn${placement === 'windowsill' ? ' active' : ''}`}
          onClick={() => setPlacement('windowsill')}
        >
          Panoramic Windowsill
        </button>
        <button
          type="button"
          className={`variant-btn${placement === 'centerpiece-table' ? ' active' : ''}`}
          onClick={() => setPlacement('centerpiece-table')}
        >
          Centerpiece Side Table
        </button>
      </div>

      <div className="day2-scene-wrap">
        <svg
          viewBox="0 0 420 250"
          className="day2-svg"
          role="img"
          aria-label={`Gingerbread house displayed on ${placement === 'windowsill' ? 'windowsill' : 'centerpiece table'} with ${windowsLit ? 'glowing' : 'unlit'} candy windows`}
        >
          <defs>
            <linearGradient id="d15Night" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d1b33" />
              <stop offset="100%" stopColor="#1e385c" />
            </linearGradient>
            <linearGradient id="d15Cabin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b2618" />
              <stop offset="100%" stopColor="#26170e" />
            </linearGradient>
            <radialGradient id="d15CandyGlow" cx="50%" cy="55%" r="48%">
              <stop offset="0%" stopColor="#ffe07d" stopOpacity="0.52" />
              <stop offset="55%" stopColor="#ffb347" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#ffb347" stopOpacity="0" />
            </radialGradient>
          </defs>

          {placement === 'windowsill' ? (
            <>
              <rect width="420" height="200" rx="12" fill="url(#d15Night)" />
              {/* Distant snow & window mullions */}
              <path d="M 0 164 Q 210 144 420 164 L 420 200 L 0 200 Z" fill="#c8ddf2" />
              <line x1="210" y1="0" x2="210" y2="200" stroke="#6b442a" strokeWidth="10" />
              <line x1="0" y1="100" x2="420" y2="100" stroke="#6b442a" strokeWidth="10" />
              {/* Wooden windowsill ledge */}
              <rect x="0" y="196" width="420" height="54" fill="#7c4f31" />
              <rect x="0" y="196" width="420" height="8" fill="#996540" />
            </>
          ) : (
            <>
              <rect width="420" height="196" rx="12" fill="url(#d15Cabin)" />
              {/* Centerpiece table surface + festive runner */}
              <rect x="0" y="190" width="420" height="60" fill="#7c4f31" />
              <rect x="92" y="190" width="236" height="16" rx="4" fill="#8f242c" stroke="#f0c674" strokeWidth="2" />
            </>
          )}

          {/* Soft Warm Glow Around Candy Windows */}
          {windowsLit && (
            <circle cx="215" cy="130" r="110" fill="url(#d15CandyGlow)" className="fire-glow-pulse" />
          )}

          {/* Completed Gingerbread House */}
          <g transform="translate(100, 32) scale(1.12)">
            <GingerbreadHouseArt
              spiceBlend={spiceBlend}
              icingColor={day10State?.icingColor}
              candyTheme={day10State?.candyTheme}
              stage={4}
              glowingWindows={windowsLit}
            />
          </g>
        </svg>
      </div>

      <div className="day1-controls">
        {!windowsLit ? (
          <button
            type="button"
            className="primary-btn"
            onClick={() => setWindowsLit(true)}
            autoFocus
          >
            Light Tiny Candy Windows
          </button>
        ) : (
          <div className="day1-done-actions">
            <button type="button" className="primary-btn" onClick={handleSave} autoFocus>
              {existingState ? 'Update Display Placement' : 'Place Glowing House in Scene'}
            </button>
            <button type="button" className="toolbar-btn" onClick={() => setWindowsLit(false)}>
              Dim Light
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
