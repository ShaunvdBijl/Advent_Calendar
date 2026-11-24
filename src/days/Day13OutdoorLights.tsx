import { useRef, useState, type PointerEvent } from 'react';
import type { Day13State } from '../types/calendar';

interface Day13OutdoorLightsProps {
  existingState?: Day13State;
  onComplete: (state: Day13State) => void;
}

const LIGHT_PALETTES: Record<Day13State['palette'], { label: string; colors: string[] }> = {
  'warm-white': { label: 'Warm White', colors: ['#ffe79e', '#ffd166', '#fff3c4'] },
  'classic-multicolor': {
    label: 'Classic Multicolor',
    colors: ['#ef4444', '#facc15', '#22c55e', '#38bdf8'],
  },
  'icicle-blue': { label: 'Icicle Blue', colors: ['#bae6fd', '#60a5fa', '#f8fafc'] },
};

const HOOKS: { x: number; y: number }[] = [
  { x: 42, y: 122 },
  { x: 112, y: 84 },
  { x: 184, y: 54 },
  { x: 236, y: 54 },
  { x: 308, y: 84 },
  { x: 378, y: 122 },
];

export function Day13OutdoorLights({ existingState, onComplete }: Day13OutdoorLightsProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [palette, setPalette] = useState<Day13State['palette']>(
    existingState?.palette ?? 'classic-multicolor',
  );
  const [connectedCount, setConnectedCount] = useState<number>(
    existingState ? HOOKS.length : 1,
  );
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);

  const isComplete = connectedCount >= HOOKS.length;
  const colors = LIGHT_PALETTES[palette].colors;

  const getSvgCoords = (event: PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * 420,
      y: ((event.clientY - rect.top) / rect.height) * 240,
    };
  };

  const tryConnectNextHook = (pt: { x: number; y: number }) => {
    setConnectedCount((current) => {
      if (current >= HOOKS.length) return current;
      const nextHook = HOOKS[current];
      const dist = Math.hypot(pt.x - nextHook.x, pt.y - nextHook.y);
      if (dist <= 30) {
        return current + 1;
      }
      return current;
    });
  };

  const handlePointerDown = (event: PointerEvent<SVGSVGElement>) => {
    if (isComplete) return;
    const pt = getSvgCoords(event);
    if (!pt) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    isDraggingRef.current = true;
    setDragPos(pt);
    tryConnectNextHook(pt);
  };

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (!isDraggingRef.current || isComplete) return;
    const pt = getSvgCoords(event);
    if (!pt) return;
    setDragPos(pt);
    tryConnectNextHook(pt);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setDragPos(null);
  };

  const handleSave = () => {
    onComplete({
      strungAt: new Date().toISOString(),
      palette,
    });
  };

  const lastConnected = HOOKS[connectedCount - 1];

  return (
    <div className="day9-container">
      <p className="day-intro">
        <strong>Click and drag</strong> across the glowing brass hooks along the cabin roofline from
        left to right to string your outdoor holiday lights!
      </p>

      <div className="variant-picker" role="group" aria-label="Choose outdoor light palette">
        {(Object.keys(LIGHT_PALETTES) as Day13State['palette'][]).map((key) => (
          <button
            key={key}
            type="button"
            className={`variant-btn${palette === key ? ' active' : ''}`}
            onClick={() => setPalette(key)}
          >
            {LIGHT_PALETTES[key].label}
          </button>
        ))}
      </div>

      <div className="day2-scene-wrap">
        <svg
          ref={svgRef}
          viewBox="0 0 420 240"
          className="day2-svg drag-canvas-svg"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          role="img"
          aria-label={`Cabin roofline with ${connectedCount} of ${HOOKS.length} light hooks connected`}
        >
          <defs>
            <linearGradient id="d13Sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#091124" />
              <stop offset="100%" stopColor="#1b3559" />
            </linearGradient>
          </defs>

          <rect width="420" height="240" rx="12" fill="url(#d13Sky)" />

          {/* Cabin Silhouette & Snowy Roof */}
          <rect x="66" y="118" width="288" height="122" fill="#3b2618" stroke="#22130b" strokeWidth="2" />
          {/* Warm cabin windows */}
          <rect x="108" y="152" width="54" height="44" rx="3" fill="#ffd97d" opacity="0.82" />
          <rect x="258" y="152" width="54" height="44" rx="3" fill="#ffd97d" opacity="0.82" />
          {/* Roofline */}
          <polygon points="28,124 210,36 392,124" fill="#5e3a24" stroke="#2e1b10" strokeWidth="3" />
          {/* Snow cap on roof */}
          <path
            d="M 28 124 L 210 36 L 392 124 L 376 130 L 210 50 L 44 130 Z"
            fill="#e2eefc"
          />

          {/* Connected Light Cord Spans & Bulbs */}
          {HOOKS.slice(0, connectedCount - 1).map((from, idx) => {
            const to = HOOKS[idx + 1];
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2 + 12;
            const b1x = (from.x + midX) / 2;
            const b1y = (from.y + midY) / 2 + 3;
            const b2x = (midX + to.x) / 2;
            const b2y = (midY + to.y) / 2 + 3;
            return (
              <g key={`span-${idx}`}>
                <path
                  d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="2.5"
                />
                {[
                  [b1x, b1y, idx * 3],
                  [midX, midY - 3, idx * 3 + 1],
                  [b2x, b2y, idx * 3 + 2],
                ].map(([bx, by, cIdx]) => {
                  const color = colors[cIdx % colors.length];
                  return (
                    <g key={`bulb-${cIdx}`}>
                      {isComplete && (
                        <circle
                          cx={bx}
                          cy={by}
                          r="9"
                          fill={color}
                          opacity="0.26"
                          className={cIdx % 2 === 0 ? 'twinkle-a' : 'twinkle-b'}
                        />
                      )}
                      <circle
                        cx={bx}
                        cy={by}
                        r="4.2"
                        fill={color}
                        className={isComplete ? (cIdx % 2 === 0 ? 'twinkle-a' : 'twinkle-b') : undefined}
                      />
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Active Dragging Cord */}
          {dragPos && !isComplete && (
            <line
              x1={lastConnected.x}
              y1={lastConnected.y}
              x2={dragPos.x}
              y2={dragPos.y}
              stroke="#f0c674"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
          )}

          {/* Brass Roof Hooks */}
          {HOOKS.map((hook, idx) => {
            const isConnected = idx < connectedCount;
            const isNext = idx === connectedCount;
            return (
              <g key={`hook-${idx}`}>
                {isNext && (
                  <circle
                    cx={hook.x}
                    cy={hook.y}
                    r="13"
                    fill="rgba(240, 198, 116, 0.2)"
                    stroke="#f0c674"
                    strokeWidth="2"
                    className="twinkle-a"
                  />
                )}
                <circle
                  cx={hook.x}
                  cy={hook.y}
                  r="5"
                  fill={isConnected ? '#7ee787' : isNext ? '#f0c674' : '#94a3b8'}
                  stroke="#1e293b"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="day1-controls">
        <div className="chop-meter" aria-label={`Roofline lights connected: ${connectedCount} of ${HOOKS.length}`}>
          <div
            className="chop-meter-fill"
            style={{ width: `${(connectedCount / HOOKS.length) * 100}%` }}
          />
        </div>

        {!isComplete ? (
          <div className="day1-done-actions">
            <button
              type="button"
              className="toolbar-btn"
              onClick={() => setConnectedCount((c) => Math.min(c + 1, HOOKS.length))}
            >
              Connect Next Hook ({connectedCount}/{HOOKS.length})
            </button>
          </div>
        ) : (
          <div className="day1-done-actions">
            <button type="button" className="primary-btn" onClick={handleSave} autoFocus>
              {existingState ? 'Update Roofline Lights' : 'Plug In Roofline Lights'}
            </button>
            <button type="button" className="toolbar-btn" onClick={() => setConnectedCount(1)}>
              Re-String
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
