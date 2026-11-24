import { useRef, useState, type PointerEvent } from 'react';
import { ChristmasPhotoArt } from '../components/ChristmasPhotoArt';
import type { Day4State, Day5State, PhotoStroke, PhotoTemplate } from '../types/calendar';

interface Day05ColorPhotoProps {
  day4State?: Day4State;
  existingState?: Day5State;
  onComplete: (state: Day5State) => void;
}

const HOLIDAY_COLORS = [
  { id: '#1d3557', label: 'Midnight Sky' },
  { id: '#eaf4ff', label: 'Snow White' },
  { id: '#c92a35', label: 'Crimson Red' },
  { id: '#215c3e', label: 'Pine Green' },
  { id: '#f0c674', label: 'Warm Gold' },
  { id: '#8c5832', label: 'Cabin Wood' },
  { id: '#9e3c34', label: 'Chimney Brick' },
  { id: '#5eb5f7', label: 'Frost Blue' },
  { id: '#ffd97d', label: 'Window Glow' },
  { id: '#9b5de5', label: 'Berry Plum' },
];

const AUTO_PALETTES: Record<PhotoTemplate, Record<string, string>> = {
  cabin: {
    sky: '#1d3557',
    snow: '#eaf4ff',
    moon: '#ffd97d',
    tree: '#215c3e',
    cabinWall: '#8c5832',
    roof: '#c92a35',
    chimney: '#9e3c34',
    door: '#5a341c',
    window: '#ffd97d',
  },
  wreath: {
    sky: '#1d3557',
    wreathRing: '#215c3e',
    bow: '#c92a35',
    berries: '#c92a35',
    bell: '#f0c674',
  },
  sleigh: {
    sky: '#1d3557',
    snow: '#eaf4ff',
    moon: '#ffd97d',
    sleighBody: '#c92a35',
    runners: '#f0c674',
    giftBag: '#215c3e',
  },
  blank: {
    sky: '#1d3557',
  },
};

export function Day05ColorPhoto({
  day4State,
  existingState,
  onComplete,
}: Day05ColorPhotoProps) {
  const template: PhotoTemplate = day4State?.template ?? 'cabin';
  const inkStrokes: PhotoStroke[] = day4State?.strokes ?? [];

  const svgRef = useRef<SVGSVGElement>(null);
  const [tool, setTool] = useState<'fill' | 'brush'>(template === 'blank' ? 'brush' : 'fill');
  const [selectedColor, setSelectedColor] = useState<string>(HOLIDAY_COLORS[2].id);
  const [regionColors, setRegionColors] = useState<Record<string, string>>(
    existingState?.regionColors ?? {},
  );
  const [colorStrokes, setColorStrokes] = useState<PhotoStroke[]>(
    existingState?.colorStrokes ?? [],
  );
  const [activePoints, setActivePoints] = useState<string[]>([]);
  const isPaintingRef = useRef(false);

  const handleRegionClick = (regionId: string) => {
    if (tool !== 'fill') return;
    setRegionColors((prev) => ({
      ...prev,
      [regionId]: selectedColor,
    }));
  };

  const getSvgPoint = (event: PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 320;
    const y = ((event.clientY - rect.top) / rect.height) * 240;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  };

  const handlePointerDown = (event: PointerEvent<SVGSVGElement>) => {
    if (tool !== 'brush') return;
    const pt = getSvgPoint(event);
    if (!pt) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    isPaintingRef.current = true;
    setActivePoints([pt]);
  };

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (!isPaintingRef.current || tool !== 'brush') return;
    const pt = getSvgPoint(event);
    if (!pt) return;
    setActivePoints((prev) => [...prev, pt]);
  };

  const finishBrush = () => {
    if (!isPaintingRef.current) return;
    isPaintingRef.current = false;
    if (activePoints.length >= 2) {
      setColorStrokes((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          points: activePoints.join(' '),
          width: 11,
          color: selectedColor,
        },
      ]);
    }
    setActivePoints([]);
  };

  const handleAutoColor = () => {
    setRegionColors(AUTO_PALETTES[template]);
  };

  const handleClear = () => {
    setRegionColors({});
    setColorStrokes([]);
  };

  const coloredCount = Object.keys(regionColors).length + colorStrokes.length;
  const canSave = coloredCount >= 2 || colorStrokes.length >= 1;

  const handleSave = () => {
    onComplete({
      coloredAt: new Date().toISOString(),
      regionColors,
      colorStrokes,
    });
  };

  return (
    <div className="day4-container">
      <p className="day-intro">
        Bring your Day 4 Christmas sketch to life! Use <strong>Fill Bucket</strong> to tap shapes
        or switch to <strong>Paint Brush</strong> to paint freely.
      </p>

      <div className="day3-toolbar">
        <div className="day3-ornament-controls">
          <div className="variant-picker" role="group" aria-label="Coloring tool">
            <button
              type="button"
              className={`variant-btn${tool === 'fill' ? ' active' : ''}`}
              onClick={() => setTool('fill')}
            >
              Fill Bucket
            </button>
            <button
              type="button"
              className={`variant-btn${tool === 'brush' ? ' active' : ''}`}
              onClick={() => setTool('brush')}
            >
              Paint Brush
            </button>
          </div>

          <div className="variant-picker">
            <button type="button" className="toolbar-btn" onClick={handleAutoColor}>
              Auto-Color
            </button>
            <button
              type="button"
              className="toolbar-btn"
              disabled={colorStrokes.length === 0}
              onClick={() => setColorStrokes((prev) => prev.slice(0, -1))}
            >
              Undo Brush
            </button>
            <button
              type="button"
              className="toolbar-btn"
              disabled={coloredCount === 0}
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="color-swatches color-swatches-wrap" role="group" aria-label="Holiday color palette">
          {HOLIDAY_COLORS.map((swatch) => (
            <button
              key={swatch.id}
              type="button"
              className={`color-swatch${selectedColor === swatch.id ? ' active' : ''}`}
              style={{ backgroundColor: swatch.id }}
              aria-label={swatch.label}
              title={swatch.label}
              onClick={() => setSelectedColor(swatch.id)}
            />
          ))}
        </div>
      </div>

      <div className="sketchpad-wrap">
        <svg
          ref={svgRef}
          viewBox="0 0 320 240"
          className={`sketchpad-svg${tool === 'fill' ? ' fill-cursor' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishBrush}
          onPointerCancel={finishBrush}
          role="img"
          aria-label="Christmas photo coloring canvas"
        >
          <ChristmasPhotoArt
            template={template}
            strokes={inkStrokes}
            regionColors={regionColors}
            colorStrokes={colorStrokes}
            onRegionClick={tool === 'fill' ? handleRegionClick : undefined}
          />
          {activePoints.length > 1 && (
            <polyline
              points={activePoints.join(' ')}
              fill="none"
              stroke={selectedColor}
              strokeWidth={11}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.88"
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
          {existingState ? 'Update Colored Photo' : 'Save Colored Photo'}
        </button>
      </div>
    </div>
  );
}
