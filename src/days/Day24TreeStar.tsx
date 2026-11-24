import { useRef, useState, type PointerEvent } from 'react';
import type { Day1State, Day24State } from '../types/calendar';

interface Day24TreeStarProps {
  treeVariant?: Day1State['treeVariant'];
  existingState?: Day24State;
  onComplete: (state: Day24State) => void;
}

const STAR_STYLES: Record<
  Day24State['starStyle'],
  { label: string; fill: string; stroke: string; halo: string }
> = {
  'classic-gold': { label: 'Classic Gold Star', fill: '#ffe169', stroke: '#d49a1a', halo: '#ffcf4d' },
  'bethlehem-burst': { label: 'Star of Bethlehem', fill: '#fff3b0', stroke: '#e0a938', halo: '#ffe07d' },
  'crystal-silver': { label: 'Crystal Silver', fill: '#e0f2fe', stroke: '#60a5fa', halo: '#93c5fd' },
};

const TARGET = { x: 210, y: 66 };
const START = { x: 74, y: 206 };
const SNAP_RADIUS = 38;

function StarGraphic({ style }: { style: Day24State['starStyle'] }) {
  const palette = STAR_STYLES[style];
  if (style === 'bethlehem-burst') {
    return (
      <g>
        <polygon
          points="0,-28 6,-8 26,0 6,8 0,28 -6,8 -26,0 -6,-8"
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon
          points="0,-16 4,-4 16,0 4,4 0,16 -4,4 -16,0 -4,-4"
          fill="#ffffff"
          opacity="0.85"
          transform="rotate(45)"
        />
      </g>
    );
  }
  if (style === 'crystal-silver') {
    return (
      <g>
        <polygon
          points="0,-26 8,-7 26,-6 11,5 16,24 0,13 -16,24 -11,5 -26,-6 -8,-7"
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon points="0,-14 5,0 0,14 -5,0" fill="#ffffff" opacity="0.9" />
      </g>
    );
  }
  return (
    <polygon
      points="0,-26 7,-8 26,-7 11,5 16,23 0,12 -16,23 -11,5 -26,-7 -7,-8"
      fill={palette.fill}
      stroke={palette.stroke}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  );
}

export function Day24TreeStar({
  treeVariant = 'spruce',
  existingState,
  onComplete,
}: Day24TreeStarProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [starStyle, setStarStyle] = useState<Day24State['starStyle']>(
    existingState?.starStyle ?? 'classic-gold',
  );
  const [pos, setPos] = useState<{ x: number; y: number }>(existingState ? TARGET : START);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const [isCrowned, setIsCrowned] = useState<boolean>(Boolean(existingState));
  const isDraggingRef = useRef(false);

  const palette = STAR_STYLES[starStyle];
  const treeFill =
    treeVariant === 'spruce' ? '#215853' : treeVariant === 'fir' ? '#1d4c39' : '#24593c';

  const getSvgCoords = (event: PointerEvent<SVGSVGElement | SVGGElement>) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * 420,
      y: ((event.clientY - rect.top) / rect.height) * 260,
    };
  };

  const handleStarPointerDown = (event: PointerEvent<SVGGElement>) => {
    if (isCrowned) return;
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    isDraggingRef.current = true;
  };

  const handleSvgPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (!isDraggingRef.current || isCrowned) return;
    const pt = getSvgCoords(event);
    if (!pt) return;
    const clamped = {
      x: Math.max(26, Math.min(394, pt.x)),
      y: Math.max(26, Math.min(234, pt.y)),
    };
    setPos(clamped);
    setTrail((prev) => [...prev.slice(-14), clamped]);

    if (Math.hypot(clamped.x - TARGET.x, clamped.y - TARGET.y) <= SNAP_RADIUS) {
      isDraggingRef.current = false;
      setPos(TARGET);
      setIsCrowned(true);
    }
  };

  const handleSvgPointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (!isCrowned) {
      setPos(START);
      setTrail([]);
    }
  };

  const handleAutoGuide = () => {
    setPos(TARGET);
    setIsCrowned(true);
  };

  const handleSave = () => {
    onComplete({
      crownedAt: new Date().toISOString(),
      starStyle,
    });
  };

  return (
    <div className="day9-container">
      <p className="day-intro">
        <strong>Christmas Eve Finale!</strong> Choose your tree topper and{' '}
        <strong>drag the glowing star</strong> up to the very top of your Christmas tree to
        complete the 2026 Advent Calendar!
      </p>

      <div className="variant-picker" role="group" aria-label="Choose tree star style">
        {(Object.keys(STAR_STYLES) as Day24State['starStyle'][]).map((key) => (
          <button
            key={key}
            type="button"
            className={`variant-btn${starStyle === key ? ' active' : ''}`}
            onClick={() => setStarStyle(key)}
          >
            {STAR_STYLES[key].label}
          </button>
        ))}
      </div>

      <div className="day2-scene-wrap">
        <svg
          ref={svgRef}
          viewBox="0 0 420 260"
          className="day2-svg drag-canvas-svg"
          onPointerMove={handleSvgPointerMove}
          onPointerUp={handleSvgPointerUp}
          onPointerCancel={handleSvgPointerUp}
          role="img"
          aria-label={isCrowned ? 'Christmas tree crowned with glowing star!' : 'Drag the glowing star to the top of the tree'}
        >
          <defs>
            <linearGradient id="d24Bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#121c33" />
              <stop offset="100%" stopColor="#26170e" />
            </linearGradient>
            <radialGradient id="d24StarHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={palette.halo} stopOpacity="0.65" />
              <stop offset="55%" stopColor={palette.halo} stopOpacity="0.18" />
              <stop offset="100%" stopColor={palette.halo} stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="420" height="260" rx="12" fill="url(#d24Bg)" />

          {/* Upper Christmas Tree Silhouette */}
          <polygon points="210,74 114,260 306,260" fill={treeFill} />
          <polygon points="210,74 146,184 274,184" fill={treeFill} opacity="0.9" />
          {/* Twinkling tree lights */}
          {[
            [184, 140], [210, 148], [236, 140],
            [162, 194], [194, 204], [226, 204], [258, 194],
            [144, 240], [186, 248], [234, 248], [276, 240],
          ].map(([lx, ly], idx) => (
            <circle
              key={idx}
              cx={lx}
              cy={ly}
              r="3.5"
              fill={idx % 2 === 0 ? '#ffe79e' : '#ffbe55'}
              className={idx % 2 === 0 ? 'twinkle-a' : 'twinkle-b'}
            />
          ))}

          {/* Target Apex Ring */}
          {!isCrowned && (
            <g>
              <circle
                cx={TARGET.x}
                cy={TARGET.y}
                r="26"
                fill="rgba(255, 225, 105, 0.12)"
                stroke="#ffe169"
                strokeWidth="2"
                strokeDasharray="5 4"
                className="twinkle-a"
              />
              {/* Dotted guide path from start to apex */}
              <path
                d={`M ${START.x} ${START.y} Q 120 110 ${TARGET.x} ${TARGET.y}`}
                fill="none"
                stroke="rgba(255, 225, 105, 0.3)"
                strokeWidth="2"
                strokeDasharray="4 6"
              />
            </g>
          )}

          {/* Sparkle Trail while guiding star */}
          {trail.map((pt, idx) => (
            <circle
              key={idx}
              cx={pt.x}
              cy={pt.y}
              r={1.5 + (idx / trail.length) * 3}
              fill={palette.fill}
              opacity={(idx + 1) / (trail.length + 2)}
            />
          ))}

          {/* Radiant Celebration Burst Once Crowned */}
          {isCrowned && (
            <g>
              <circle cx={TARGET.x} cy={TARGET.y} r="84" fill="url(#d24StarHalo)" className="fire-glow-pulse" />
              {[
                [140, 44], [280, 44], [122, 92], [298, 92], [168, 28], [252, 28],
              ].map(([sx, sy], i) => (
                <text
                  key={i}
                  x={sx}
                  y={sy}
                  fill={palette.fill}
                  fontSize="14"
                  textAnchor="middle"
                  className={i % 2 === 0 ? 'twinkle-a' : 'twinkle-b'}
                >
                  ✦
                </text>
              ))}
              <text
                x="210"
                y="246"
                textAnchor="middle"
                fill="#ffe9a8"
                fontSize="16"
                fontWeight="800"
                letterSpacing="0.06em"
              >
                MERRY CHRISTMAS 2026!
              </text>
            </g>
          )}

          {/* Draggable Christmas Star */}
          <g
            transform={`translate(${pos.x}, ${pos.y})`}
            className={isCrowned ? undefined : 'draggable-part'}
            onPointerDown={handleStarPointerDown}
          >
            <circle r="34" fill="url(#d24StarHalo)" opacity="0.7" />
            <StarGraphic style={starStyle} />
          </g>
        </svg>
      </div>

      <div className="day1-controls">
        {!isCrowned ? (
          <button type="button" className="primary-btn" onClick={handleAutoGuide} autoFocus>
            Guide Star to Treetop
          </button>
        ) : (
          <div className="day1-done-actions">
            <button type="button" className="primary-btn" onClick={handleSave} autoFocus>
              {existingState ? 'Update Tree Topper Star' : 'Crown the Christmas Tree!'}
            </button>
            <button
              type="button"
              className="toolbar-btn"
              onClick={() => {
                setIsCrowned(false);
                setPos(START);
                setTrail([]);
              }}
            >
              Place Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
