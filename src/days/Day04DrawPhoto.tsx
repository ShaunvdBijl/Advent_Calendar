import { useRef, useState, type PointerEvent } from 'react';
import { ChristmasPhotoArt } from '../components/ChristmasPhotoArt';
import type { Day4State, PhotoStroke, PhotoTemplate } from '../types/calendar';

interface Day04DrawPhotoProps {
  existingState?: Day4State;
  onComplete: (state: Day4State) => void;
}

const TEMPLATE_OPTIONS: { id: PhotoTemplate; label: string }[] = [
  { id: 'cabin', label: 'Cozy Cabin' },
  { id: 'wreath', label: 'Holiday Wreath' },
  { id: 'sleigh', label: 'Starry Sleigh' },
  { id: 'blank', label: 'Freehand Blank' },
];

const PEN_SIZES = [
  { size: 2, label: 'Fine' },
  { size: 3.5, label: 'Medium' },
  { size: 6, label: 'Bold' },
];

export function Day04DrawPhoto({ existingState, onComplete }: Day04DrawPhotoProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [template, setTemplate] = useState<PhotoTemplate>(existingState?.template ?? 'cabin');
  const [strokes, setStrokes] = useState<PhotoStroke[]>(existingState?.strokes ?? []);
  const [activePoints, setActivePoints] = useState<string[]>([]);
  const [penWidth, setPenWidth] = useState<number>(3.5);
  const isDrawingRef = useRef(false);

  const getSvgPoint = (event: PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 320;
    const y = ((event.clientY - rect.top) / rect.height) * 240;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  };

  const handlePointerDown = (event: PointerEvent<SVGSVGElement>) => {
    const pt = getSvgPoint(event);
    if (!pt) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    isDrawingRef.current = true;
    setActivePoints([pt]);
  };

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (!isDrawingRef.current) return;
    const pt = getSvgPoint(event);
    if (!pt) return;
    setActivePoints((prev) => [...prev, pt]);
  };

  const finishStroke = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    if (activePoints.length >= 2) {
      const nextStroke: PhotoStroke = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        points: activePoints.join(' '),
        width: penWidth,
        color: '#23201c',
      };
      setStrokes((prev) => [...prev, nextStroke]);
    }
    setActivePoints([]);
  };

  const canSave = template !== 'blank' || strokes.length >= 1;

  const handleSave = () => {
    onComplete({
      sketchedAt: new Date().toISOString(),
      template,
      strokes,
    });
  };

  return (
    <div className="day4-container">
      <p className="day-intro">
        Pick a holiday sketch outline or choose a blank page, then draw your own festive ink
        details! Tomorrow (Day 5) you&apos;ll color it in.
      </p>

      <div className="day3-toolbar">
        <div className="variant-picker" role="group" aria-label="Choose sketch template">
          {TEMPLATE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`variant-btn${template === opt.id ? ' active' : ''}`}
              onClick={() => setTemplate(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="day3-ornament-controls">
          <div className="variant-picker" role="group" aria-label="Pen thickness">
            {PEN_SIZES.map((pen) => (
              <button
                key={pen.label}
                type="button"
                className={`variant-btn${penWidth === pen.size ? ' active' : ''}`}
                onClick={() => setPenWidth(pen.size)}
              >
                {pen.label} Pen
              </button>
            ))}
          </div>

          <div className="variant-picker">
            <button
              type="button"
              className="toolbar-btn"
              disabled={strokes.length === 0}
              onClick={() => setStrokes((prev) => prev.slice(0, -1))}
            >
              Undo
            </button>
            <button
              type="button"
              className="toolbar-btn"
              disabled={strokes.length === 0}
              onClick={() => setStrokes([])}
            >
              Clear Ink
            </button>
          </div>
        </div>
      </div>

      <div className="sketchpad-wrap">
        <svg
          ref={svgRef}
          viewBox="0 0 320 240"
          className="sketchpad-svg"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishStroke}
          onPointerCancel={finishStroke}
          role="img"
          aria-label="Christmas photo drawing canvas"
        >
          <ChristmasPhotoArt template={template} strokes={strokes} />
          {activePoints.length > 1 && (
            <polyline
              points={activePoints.join(' ')}
              fill="none"
              stroke="#23201c"
              strokeWidth={penWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </div>

      <div className="day1-controls">
        <button
          type="button"
          className="primary-btn"
          disabled={!canSave}
          onClick={handleSave}
          autoFocus
        >
          {existingState ? 'Update Christmas Sketch' : 'Save Sketch to Table'}
        </button>
      </div>
    </div>
  );
}
