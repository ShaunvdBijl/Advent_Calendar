import { useRef, useState, type PointerEvent } from 'react';
import type { Day11State } from '../types/calendar';

interface Day11BuildSnowmanProps {
  existingState?: Day11State;
  onComplete: (state: Day11State) => void;
}

type PartId = 'base' | 'torso' | 'head' | 'leftArm' | 'rightArm';

interface PartDef {
  id: PartId;
  label: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
}

const PARTS: PartDef[] = [
  { id: 'base', label: 'Base Snowball', startX: 72, startY: 196, targetX: 210, targetY: 196 },
  { id: 'torso', label: 'Torso Snowball', startX: 72, startY: 120, targetX: 210, targetY: 148 },
  { id: 'head', label: 'Head Snowball', startX: 72, startY: 58, targetX: 210, targetY: 108 },
  { id: 'leftArm', label: 'Left Stick Arm', startX: 348, startY: 112, targetX: 168, targetY: 142 },
  { id: 'rightArm', label: 'Right Stick Arm', startX: 348, startY: 166, targetX: 252, targetY: 142 },
];

const SNAP_DISTANCE = 48;

export function Day11BuildSnowman({ existingState, onComplete }: Day11BuildSnowmanProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [placed, setPlaced] = useState<Record<PartId, boolean>>(
    existingState
      ? { base: true, torso: true, head: true, leftArm: true, rightArm: true }
      : { base: false, torso: false, head: false, leftArm: false, rightArm: false },
  );
  const [positions, setPositions] = useState<Record<PartId, { x: number; y: number }>>(() => {
    const map = {} as Record<PartId, { x: number; y: number }>;
    for (const part of PARTS) {
      map[part.id] = existingState
        ? { x: part.targetX, y: part.targetY }
        : { x: part.startX, y: part.startY };
    }
    return map;
  });
  const [dragging, setDragging] = useState<PartId | null>(null);
  const [stickArms, setStickArms] = useState<Day11State['stickArms']>(
    existingState?.stickArms ?? 'waving',
  );

  const placedCount = Object.values(placed).filter(Boolean).length;
  const isComplete = placedCount === PARTS.length;

  const getSvgCoords = (event: PointerEvent<SVGSVGElement | SVGGElement>) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * 420,
      y: ((event.clientY - rect.top) / rect.height) * 260,
    };
  };

  const handlePartPointerDown = (partId: PartId, event: PointerEvent<SVGGElement>) => {
    if (placed[partId]) return;
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(partId);
  };

  const handleSvgPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (!dragging) return;
    const pt = getSvgCoords(event);
    if (!pt) return;
    setPositions((prev) => ({
      ...prev,
      [dragging]: {
        x: Math.max(24, Math.min(396, pt.x)),
        y: Math.max(24, Math.min(236, pt.y)),
      },
    }));
  };

  const handleSvgPointerUp = () => {
    if (!dragging) return;
    const def = PARTS.find((p) => p.id === dragging);
    const cur = positions[dragging];
    if (def && cur) {
      const dist = Math.hypot(cur.x - def.targetX, cur.y - def.targetY);
      if (dist <= SNAP_DISTANCE) {
        setPlaced((prev) => ({ ...prev, [dragging]: true }));
        setPositions((prev) => ({
          ...prev,
          [dragging]: { x: def.targetX, y: def.targetY },
        }));
      } else {
        setPositions((prev) => ({
          ...prev,
          [dragging]: { x: def.startX, y: def.startY },
        }));
      }
    }
    setDragging(null);
  };

  const handleSnapNext = () => {
    const next = PARTS.find((p) => !placed[p.id]);
    if (!next) return;
    setPlaced((prev) => ({ ...prev, [next.id]: true }));
    setPositions((prev) => ({
      ...prev,
      [next.id]: { x: next.targetX, y: next.targetY },
    }));
  };

  const handleReset = () => {
    setPlaced({ base: false, torso: false, head: false, leftArm: false, rightArm: false });
    const resetPos = {} as Record<PartId, { x: number; y: number }>;
    for (const part of PARTS) {
      resetPos[part.id] = { x: part.startX, y: part.startY };
    }
    setPositions(resetPos);
  };

  const handleSave = () => {
    onComplete({
      builtAt: new Date().toISOString(),
      stickArms,
    });
  };

  return (
    <div className="day9-container">
      <p className="day-intro">
        <strong>Drag each snowball and stick arm</strong> onto the glowing target spots in the
        center of the snowy yard to assemble your snowman!
      </p>

      {isComplete && (
        <div className="variant-picker" role="group" aria-label="Snowman arm pose">
          <button
            type="button"
            className={`variant-btn${stickArms === 'waving' ? ' active' : ''}`}
            onClick={() => setStickArms('waving')}
          >
            Cheerful Waving Arms
          </button>
          <button
            type="button"
            className={`variant-btn${stickArms === 'downward' ? ' active' : ''}`}
            onClick={() => setStickArms('downward')}
          >
            Relaxed Arms
          </button>
        </div>
      )}

      <div className="day2-scene-wrap">
        <svg
          ref={svgRef}
          viewBox="0 0 420 260"
          className="day2-svg drag-canvas-svg"
          onPointerMove={handleSvgPointerMove}
          onPointerUp={handleSvgPointerUp}
          onPointerCancel={handleSvgPointerUp}
          role="img"
          aria-label={`Draggable snowman builder (${placedCount} of ${PARTS.length} parts placed)`}
        >
          <defs>
            <linearGradient id="d11Sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d1b33" />
              <stop offset="100%" stopColor="#1d3557" />
            </linearGradient>
          </defs>

          <rect width="420" height="260" rx="12" fill="url(#d11Sky)" />
          <path d="M 0 212 Q 210 194 420 212 L 420 260 L 0 260 Z" fill="#dce9f7" />

          {/* Target drop silhouettes */}
          <g
            fill="rgba(240, 198, 116, 0.08)"
            stroke="rgba(240, 198, 116, 0.55)"
            strokeWidth="2"
            strokeDasharray="5 4"
          >
            {!placed.base && <circle cx="210" cy="196" r="34" />}
            {!placed.torso && <circle cx="210" cy="148" r="24" />}
            {!placed.head && <circle cx="210" cy="108" r="17" />}
            {!placed.leftArm && <circle cx="168" cy="142" r="14" />}
            {!placed.rightArm && <circle cx="252" cy="142" r="14" />}
          </g>

          {/* Left Stick Arm */}
          <g
            transform={`translate(${positions.leftArm.x}, ${positions.leftArm.y})`}
            className={placed.leftArm ? undefined : 'draggable-part'}
            onPointerDown={(e) => handlePartPointerDown('leftArm', e)}
          >
            <path
              d={
                placed.leftArm && stickArms === 'downward'
                  ? 'M 20 6 L -12 24 M -4 18 L -10 30'
                  : 'M 20 6 L -14 -14 M -6 -8 L -12 -20 M -8 -9 L -20 -8'
              }
              stroke="#6b4423"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Right Stick Arm */}
          <g
            transform={`translate(${positions.rightArm.x}, ${positions.rightArm.y})`}
            className={placed.rightArm ? undefined : 'draggable-part'}
            onPointerDown={(e) => handlePartPointerDown('rightArm', e)}
          >
            <path
              d={
                placed.rightArm && stickArms === 'downward'
                  ? 'M -20 6 L 12 24 M 4 18 L 10 30'
                  : 'M -20 6 L 14 -14 M 6 -8 L 12 -20 M 8 -9 L 20 -8'
              }
              stroke="#6b4423"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Base Snowball */}
          <g
            transform={`translate(${positions.base.x}, ${positions.base.y})`}
            className={placed.base ? undefined : 'draggable-part'}
            onPointerDown={(e) => handlePartPointerDown('base', e)}
          >
            <circle r="34" fill="#f1f7fd" stroke="#b9d0e8" strokeWidth="2.5" />
          </g>

          {/* Torso Snowball */}
          <g
            transform={`translate(${positions.torso.x}, ${positions.torso.y})`}
            className={placed.torso ? undefined : 'draggable-part'}
            onPointerDown={(e) => handlePartPointerDown('torso', e)}
          >
            <circle r="24" fill="#f5f9fe" stroke="#b9d0e8" strokeWidth="2.5" />
          </g>

          {/* Head Snowball */}
          <g
            transform={`translate(${positions.head.x}, ${positions.head.y})`}
            className={placed.head ? undefined : 'draggable-part'}
            onPointerDown={(e) => handlePartPointerDown('head', e)}
          >
            <circle r="17" fill="#ffffff" stroke="#b9d0e8" strokeWidth="2.5" />
            <circle cx="-6" cy="-3" r="2.2" fill="#1e293b" />
            <circle cx="6" cy="-3" r="2.2" fill="#1e293b" />
            <circle cx="-5" cy="6" r="1.2" fill="#1e293b" />
            <circle cx="0" cy="7.5" r="1.2" fill="#1e293b" />
            <circle cx="5" cy="6" r="1.2" fill="#1e293b" />
          </g>
        </svg>
      </div>

      <div className="day1-controls">
        <div className="chop-meter" aria-label={`Snowman parts placed: ${placedCount} of ${PARTS.length}`}>
          <div
            className="chop-meter-fill"
            style={{ width: `${(placedCount / PARTS.length) * 100}%` }}
          />
        </div>

        {!isComplete ? (
          <div className="day1-done-actions">
            <button type="button" className="toolbar-btn" onClick={handleSnapNext}>
              Snap Next Part ({placedCount}/{PARTS.length})
            </button>
          </div>
        ) : (
          <div className="day1-done-actions">
            <button type="button" className="primary-btn" onClick={handleSave} autoFocus>
              {existingState ? 'Update Yard Snowman' : 'Place Snowman in Snowy Yard'}
            </button>
            <button type="button" className="toolbar-btn" onClick={handleReset}>
              Rebuild
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
