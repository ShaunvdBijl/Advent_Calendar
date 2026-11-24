import { useEffect, useState } from 'react';
import type { Day20State } from '../types/calendar';
import { startMusicBox, stopMusicBox } from '../utils/musicBoxAudio';

interface Day20MusicBoxProps {
  existingState?: Day20State;
  onComplete: (state: Day20State) => void;
}

type GearId = 'large' | 'medium' | 'small';

function GearShape({
  radius,
  teeth,
  fill,
}: {
  radius: number;
  teeth: number;
  fill: string;
}) {
  const spokes = Array.from({ length: teeth }, (_, i) => (i * 360) / teeth);
  return (
    <g>
      {spokes.map((angle) => (
        <rect
          key={angle}
          x={-4}
          y={-radius - 6}
          width={8}
          height={10}
          rx={2}
          fill={fill}
          stroke="#6b4e16"
          strokeWidth="1.2"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle r={radius} fill={fill} stroke="#6b4e16" strokeWidth="2.5" />
      <circle r={radius * 0.62} fill="none" stroke="#fff3c4" strokeWidth="1.8" opacity="0.55" />
      <circle r={radius * 0.24} fill="#3d2b12" stroke="#f0c674" strokeWidth="2" />
    </g>
  );
}

export function Day20MusicBox({ existingState, onComplete }: Day20MusicBoxProps) {
  const [mounted, setMounted] = useState<Record<GearId, boolean>>(
    existingState
      ? { large: true, medium: true, small: true }
      : { large: false, medium: false, small: false },
  );
  const [melody, setMelody] = useState<Day20State['melody']>(
    existingState?.melody ?? 'jingle-chimes',
  );
  const [previewPlaying, setPreviewPlaying] = useState(false);

  const mountedCount = Object.values(mounted).filter(Boolean).length;
  const allMounted = mountedCount === 3;

  useEffect(() => {
    return () => {
      stopMusicBox();
    };
  }, []);

  const handleMount = (id: GearId) => {
    setMounted((prev) => ({ ...prev, [id]: true }));
  };

  const handleTogglePreview = () => {
    if (previewPlaying) {
      stopMusicBox();
      setPreviewPlaying(false);
    } else {
      startMusicBox(melody);
      setPreviewPlaying(true);
    }
  };

  const handleMelodyChange = (next: Day20State['melody']) => {
    setMelody(next);
    if (previewPlaying) {
      startMusicBox(next);
    }
  };

  const handleSave = () => {
    stopMusicBox();
    setPreviewPlaying(false);
    onComplete({
      repairedAt: new Date().toISOString(),
      melody,
    });
  };

  return (
    <div className="day9-container">
      <p className="day-intro">
        Click each of the <strong>three brass gears</strong> below to mount them onto their
        interlocking spindles, repair the antique music box, and unlock holiday chimes on your home
        screen!
      </p>

      <div className="variant-picker" role="group" aria-label="Choose music box melody">
        <button
          type="button"
          className={`variant-btn${melody === 'jingle-chimes' ? ' active' : ''}`}
          onClick={() => handleMelodyChange('jingle-chimes')}
        >
          Jingle Chimes
        </button>
        <button
          type="button"
          className={`variant-btn${melody === 'silent-chimes' ? ' active' : ''}`}
          onClick={() => handleMelodyChange('silent-chimes')}
        >
          Silent Night Chimes
        </button>
      </div>

      <div className="day2-scene-wrap">
        <svg
          viewBox="0 0 420 250"
          className="day2-svg"
          role="img"
          aria-label={`Brass music box repair (${mountedCount} of 3 gears assembled)`}
        >
          <defs>
            <linearGradient id="d20Box" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5c3921" />
              <stop offset="100%" stopColor="#382112" />
            </linearGradient>
          </defs>

          {/* Mahogany Music Box Open Interior */}
          <rect width="420" height="250" rx="12" fill="#211610" />
          <rect x="28" y="20" width="364" height="148" rx="10" fill="url(#d20Box)" stroke="#d4a33c" strokeWidth="3" />
          <rect x="42" y="34" width="336" height="120" rx="6" fill="#2c1d15" stroke="#8c621c" strokeWidth="1.5" />

          {/* Steel Chime Comb on Right */}
          <g transform="translate(308, 52)">
            <rect x="0" y="0" width="54" height="82" rx="3" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
            {Array.from({ length: 8 }, (_, i) => (
              <line
                key={i}
                x1="4"
                y1={10 + i * 9}
                x2="38"
                y2={10 + i * 9}
                stroke="#1e293b"
                strokeWidth="2.5"
              />
            ))}
          </g>

          {/* 3 Empty Spindle Targets */}
          <g stroke="rgba(240, 198, 116, 0.55)" strokeWidth="2" strokeDasharray="4 4" fill="rgba(240,198,116,0.08)">
            {!mounted.large && <circle cx="122" cy="96" r="34" />}
            {!mounted.medium && <circle cx="196" cy="96" r="24" />}
            {!mounted.small && <circle cx="254" cy="96" r="18" />}
          </g>
          {/* Spindle Pins */}
          <circle cx="122" cy="96" r="5" fill="#e6be63" />
          <circle cx="196" cy="96" r="5" fill="#e6be63" />
          <circle cx="254" cy="96" r="5" fill="#e6be63" />

          {/* Mounted Interlocking Gears */}
          {mounted.large && (
            <g transform="translate(122, 96)">
              <g className={allMounted ? 'gear-spin-cw' : undefined}>
                <GearShape radius={34} teeth={12} fill="#e6b852" />
              </g>
            </g>
          )}
          {mounted.medium && (
            <g transform="translate(196, 96)">
              <g className={allMounted ? 'gear-spin-ccw' : undefined}>
                <GearShape radius={24} teeth={10} fill="#d4a038" />
              </g>
            </g>
          )}
          {mounted.small && (
            <g transform="translate(254, 96)">
              <g className={allMounted ? 'gear-spin-cw-fast' : undefined}>
                <GearShape radius={18} teeth={8} fill="#f0c96b" />
              </g>
            </g>
          )}

          {/* Loose Gears Tray at Bottom (Click to Mount) */}
          {!mounted.large && (
            <g
              transform="translate(108, 210) scale(0.72)"
              className="photo-region-clickable"
              onClick={() => handleMount('large')}
              role="button"
              tabIndex={0}
              aria-label="Mount large drive gear"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleMount('large');
                }
              }}
            >
              <GearShape radius={34} teeth={12} fill="#e6b852" />
            </g>
          )}
          {!mounted.medium && (
            <g
              transform="translate(210, 210) scale(0.8)"
              className="photo-region-clickable"
              onClick={() => handleMount('medium')}
              role="button"
              tabIndex={0}
              aria-label="Mount medium transfer gear"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleMount('medium');
                }
              }}
            >
              <GearShape radius={24} teeth={10} fill="#d4a038" />
            </g>
          )}
          {!mounted.small && (
            <g
              transform="translate(306, 210) scale(0.9)"
              className="photo-region-clickable"
              onClick={() => handleMount('small')}
              role="button"
              tabIndex={0}
              aria-label="Mount small chime gear"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleMount('small');
                }
              }}
            >
              <GearShape radius={18} teeth={8} fill="#f0c96b" />
            </g>
          )}

          {/* Floating Music Notes When All Gears Interlock */}
          {allMounted && (
            <g fill="#ffe19c" fontSize="18" fontWeight="700">
              <text x="292" y="216" className="steam-rise">♪</text>
              <text x="330" y="210" className="steam-rise" style={{ animationDelay: '0.6s' }}>♫</text>
              <text x="364" y="218" className="steam-rise" style={{ animationDelay: '1.2s' }}>♪</text>
            </g>
          )}
        </svg>
      </div>

      <div className="day1-controls">
        <div className="chop-meter" aria-label={`Gears assembled: ${mountedCount} of 3`}>
          <div className="chop-meter-fill" style={{ width: `${(mountedCount / 3) * 100}%` }} />
        </div>

        {!allMounted ? (
          <div className="day1-done-actions">
            {!mounted.large && (
              <button type="button" className="toolbar-btn" onClick={() => handleMount('large')}>
                Mount Large Gear
              </button>
            )}
            {!mounted.medium && (
              <button type="button" className="toolbar-btn" onClick={() => handleMount('medium')}>
                Mount Medium Gear
              </button>
            )}
            {!mounted.small && (
              <button type="button" className="toolbar-btn" onClick={() => handleMount('small')}>
                Mount Small Gear
              </button>
            )}
          </div>
        ) : (
          <div className="day1-done-actions">
            <button type="button" className="toolbar-btn" onClick={handleTogglePreview}>
              {previewPlaying ? '⏹ Stop Preview' : '♫ Test Melody'}
            </button>
            <button type="button" className="primary-btn" onClick={handleSave} autoFocus>
              {existingState ? 'Update Music Box' : 'Unlock Holiday Chimes on Home Screen'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
