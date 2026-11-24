import { useState } from 'react';
import type { Day8State } from '../types/calendar';

interface Day08SnowMachineProps {
  existingState?: Day8State;
  onComplete: (state: Day8State) => void;
}

const INTENSITIES: { id: Day8State['intensity']; label: string; count: number }[] = [
  { id: 'gentle', label: 'Gentle Drift', count: 14 },
  { id: 'flurry', label: 'Cozy Flurry', count: 24 },
  { id: 'blizzard', label: 'Winter Blizzard', count: 36 },
];

export function Day08SnowMachine({ existingState, onComplete }: Day08SnowMachineProps) {
  const [isRunning, setIsRunning] = useState<boolean>(Boolean(existingState));
  const [intensity, setIntensity] = useState<Day8State['intensity']>(
    existingState?.intensity ?? 'flurry',
  );

  const activeConfig = INTENSITIES.find((i) => i.id === intensity) ?? INTENSITIES[1];

  const handleSave = () => {
    onComplete({
      startedAt: new Date().toISOString(),
      intensity,
    });
  };

  return (
    <div className="day8-container">
      <p className="day-intro">
        Press the big red button on the cabin&apos;s vintage <strong>Snow Machine</strong> to start
        a permanent winter snowfall across your advent calendar!
      </p>

      <div className="variant-picker" role="group" aria-label="Snowfall intensity">
        {INTENSITIES.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`variant-btn${intensity === opt.id ? ' active' : ''}`}
            onClick={() => setIntensity(opt.id)}
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
          aria-label={isRunning ? 'Snow machine running and blowing snowflakes' : 'Snow machine idle, ready to start'}
        >
          <defs>
            <linearGradient id="d8Sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0c1930" />
              <stop offset="100%" stopColor="#1b3559" />
            </linearGradient>
          </defs>

          <rect width="420" height="250" rx="12" fill="url(#d8Sky)" />
          {/* Snow ground */}
          <path d="M 0 212 Q 210 196 420 212 L 420 250 L 0 250 Z" fill="#dce9f7" />

          {/* Preview Falling Snowflakes when running */}
          {isRunning && (
            <g fill="#ffffff">
              {Array.from({ length: activeConfig.count }, (_, i) => {
                const cx = ((i * 47 + 23) % 390) + 15;
                const r = 1.6 + (i % 3) * 0.9;
                const dur = (3.4 + (i % 5) * 0.65).toFixed(2);
                const delay = (-((i * 0.43) % 4)).toFixed(2);
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={-10}
                    r={r}
                    opacity={0.55 + (i % 4) * 0.12}
                    className="snow-flake-preview"
                    style={{
                      animationDuration: `${dur}s`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              })}
            </g>
          )}

          {/* Vintage Snow Machine Body */}
          <g transform="translate(86, 108)">
            {/* Base legs */}
            <rect x="18" y="94" width="14" height="20" rx="2" fill="#3a4556" />
            <rect x="152" y="94" width="14" height="20" rx="2" fill="#3a4556" />

            {/* Machine Housing */}
            <rect x="12" y="20" width="160" height="78" rx="12" fill="#2f5278" stroke="#8cb6df" strokeWidth="2.5" />
            {/* Brass trim */}
            <rect x="24" y="32" width="66" height="54" rx="8" fill="#1b2d44" stroke="#d9b166" strokeWidth="2" />

            {/* Spinning Turbine Fan */}
            <g
              className={isRunning ? 'turbine-spin' : undefined}
              style={{ transformOrigin: '57px 59px' }}
            >
              <circle cx="57" cy="59" r="20" fill="#122133" stroke="#7da3c9" strokeWidth="2" />
              <line x1="57" y1="41" x2="57" y2="77" stroke="#d9b166" strokeWidth="4" strokeLinecap="round" />
              <line x1="39" y1="59" x2="75" y2="59" stroke="#d9b166" strokeWidth="4" strokeLinecap="round" />
              <circle cx="57" cy="59" r="5" fill="#f0c674" />
            </g>

            {/* Status Indicator Light */}
            <circle
              cx="114"
              cy="44"
              r="7"
              fill={isRunning ? '#5eead4' : '#475569'}
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
            <text x="126" y="48" fill="#e2e8f0" fontSize="10" fontWeight="700">
              {isRunning ? 'ON' : 'OFF'}
            </text>

            {/* Snow Nozzle */}
            <path d="M 172 34 L 216 14 L 222 68 L 172 64 Z" fill="#466b94" stroke="#8cb6df" strokeWidth="2" />
            {isRunning && (
              <g fill="#ffffff" opacity="0.85">
                <circle cx="232" cy="26" r="4" className="twinkle-a" />
                <circle cx="246" cy="40" r="3" className="twinkle-b" />
                <circle cx="236" cy="54" r="3.5" className="twinkle-a" />
                <circle cx="258" cy="22" r="2.5" className="twinkle-b" />
              </g>
            )}

            {/* Big Clickable Red Start Button on Top */}
            <g
              className="snow-button-svg"
              onClick={() => setIsRunning((r) => !r)}
              role="button"
              tabIndex={0}
              aria-label="Toggle snow machine power"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsRunning((r) => !r);
                }
              }}
            >
              <rect x="108" y="8" width="44" height="12" rx="4" fill="#64748b" />
              <rect
                x="114"
                y={isRunning ? 2 : -4}
                width="32"
                height="12"
                rx="6"
                fill="#dc2626"
                stroke="#fca5a5"
                strokeWidth="1.5"
              />
            </g>
          </g>
        </svg>
      </div>

      <div className="day1-controls">
        {!isRunning ? (
          <button
            type="button"
            className="primary-btn"
            onClick={() => setIsRunning(true)}
            autoFocus
          >
            Press Button to Start Snow Machine
          </button>
        ) : (
          <div className="day1-done-actions">
            <button type="button" className="primary-btn" onClick={handleSave} autoFocus>
              {existingState ? 'Update Snowfall' : 'Keep Snow Falling Permanently'}
            </button>
            <button type="button" className="toolbar-btn" onClick={() => setIsRunning(false)}>
              Pause Machine
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
