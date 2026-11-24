import { useState } from 'react';
import { ChristmasPhotoArt } from '../components/ChristmasPhotoArt';
import type { Day4State, Day5State, Day6State } from '../types/calendar';

interface Day06FramePhotoProps {
  day4State?: Day4State;
  day5State?: Day5State;
  existingState?: Day6State;
  onComplete: (state: Day6State) => void;
}

const MAT_COLORS: Record<Day6State['matColor'], { label: string; hex: string }> = {
  cream: { label: 'Warm Cream', hex: '#f4ece0' },
  forest: { label: 'Forest Green', hex: '#1e4635' },
  crimson: { label: 'Holiday Crimson', hex: '#7a1f26' },
};

export function Day06FramePhoto({
  day4State,
  day5State,
  existingState,
  onComplete,
}: Day06FramePhotoProps) {
  const [frameStyle, setFrameStyle] = useState<Day6State['frameStyle']>(
    existingState?.frameStyle ?? 'ornate-gold',
  );
  const [matColor, setMatColor] = useState<Day6State['matColor']>(
    existingState?.matColor ?? 'cream',
  );
  const [isHung, setIsHung] = useState<boolean>(Boolean(existingState));

  const template = day4State?.template ?? 'cabin';
  const strokes = day4State?.strokes ?? [];
  const regionColors = day5State?.regionColors ?? {};
  const colorStrokes = day5State?.colorStrokes ?? [];

  const handleHang = () => {
    setIsHung(true);
  };

  const handleConfirm = () => {
    onComplete({
      framedAt: new Date().toISOString(),
      frameStyle,
      matColor,
    });
  };

  const isGold = frameStyle === 'ornate-gold';

  return (
    <div className="day6-container">
      <p className="day-intro">
        Choose a <strong>Rustic Wood</strong> or <strong>Ornate Gold</strong> frame and mat border
        for your Christmas artwork, then hang it above the fireplace mantle!
      </p>

      <div className="day2-options-row">
        <div className="variant-picker" role="group" aria-label="Frame style">
          <button
            type="button"
            className={`variant-btn${frameStyle === 'rustic-wood' ? ' active' : ''}`}
            onClick={() => setFrameStyle('rustic-wood')}
          >
            Rustic Wood Frame
          </button>
          <button
            type="button"
            className={`variant-btn${frameStyle === 'ornate-gold' ? ' active' : ''}`}
            onClick={() => setFrameStyle('ornate-gold')}
          >
            Ornate Gold Frame
          </button>
        </div>

        <div className="variant-picker" role="group" aria-label="Mat border color">
          {(Object.keys(MAT_COLORS) as Day6State['matColor'][]).map((key) => (
            <button
              key={key}
              type="button"
              className={`variant-btn${matColor === key ? ' active' : ''}`}
              onClick={() => setMatColor(key)}
            >
              {MAT_COLORS[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="day2-scene-wrap">
        <svg
          viewBox="0 0 420 270"
          className="day2-svg"
          role="img"
          aria-label={`Framed Christmas photo preview in ${isGold ? 'ornate gold' : 'rustic wood'} frame`}
        >
          <defs>
            <linearGradient id="d6Wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b2618" />
              <stop offset="100%" stopColor="#26170e" />
            </linearGradient>
            <linearGradient id="goldFrameGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f5d57a" />
              <stop offset="50%" stopColor="#c49234" />
              <stop offset="100%" stopColor="#8c621c" />
            </linearGradient>
            <linearGradient id="woodFrameGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8c5832" />
              <stop offset="50%" stopColor="#693e20" />
              <stop offset="100%" stopColor="#4a2a14" />
            </linearGradient>
          </defs>

          {/* Cabin Wall Background */}
          <rect width="420" height="270" rx="12" fill="url(#d6Wall)" />
          <g stroke="#22130b" strokeWidth="2" opacity="0.45">
            <line x1="0" y1="68" x2="420" y2="68" />
            <line x1="0" y1="136" x2="420" y2="136" />
            <line x1="0" y1="204" x2="420" y2="204" />
          </g>

          {/* Top edge of fireplace mantle */}
          <rect x="40" y="246" width="340" height="24" rx="4" fill="#7c4f31" />

          {/* Brass Wall Hook */}
          <circle cx="210" cy="30" r="5" fill="#e6be63" stroke="#7c5616" strokeWidth="1.5" />

          {/* Framed Photo Assembly */}
          <g
            className={isHung ? 'frame-hung' : 'frame-unhung'}
            style={{
              transformOrigin: '210px 30px',
            }}
          >
            {/* Hanging Cord */}
            <polyline
              points="135,64 210,30 285,64"
              fill="none"
              stroke="#d9b166"
              strokeWidth="2.5"
              opacity={isHung ? 0.9 : 0.35}
            />

            {/* Drop shadow */}
            <rect x="106" y="64" width="212" height="164" rx="5" fill="rgba(0,0,0,0.4)" />

            {/* Outer Frame */}
            <rect
              x="102"
              y="58"
              width="216"
              height="168"
              rx="4"
              fill={isGold ? 'url(#goldFrameGrad)' : 'url(#woodFrameGrad)'}
              stroke={isGold ? '#ffe394' : '#3d2210'}
              strokeWidth="2"
            />

            {/* Frame details */}
            {isGold ? (
              <g fill="none" stroke="#ffebad" strokeWidth="1.5" opacity="0.85">
                <rect x="108" y="64" width="204" height="156" rx="2" />
                <circle cx="111" cy="67" r="3" fill="#ffe394" />
                <circle cx="309" cy="67" r="3" fill="#ffe394" />
                <circle cx="111" cy="217" r="3" fill="#ffe394" />
                <circle cx="309" cy="217" r="3" fill="#ffe394" />
              </g>
            ) : (
              <g stroke="#3d2210" strokeWidth="1.5" opacity="0.65">
                <line x1="102" y1="58" x2="118" y2="74" />
                <line x1="318" y1="58" x2="302" y2="74" />
                <line x1="102" y1="226" x2="118" y2="210" />
                <line x1="318" y1="226" x2="302" y2="210" />
              </g>
            )}

            {/* Inner Mat */}
            <rect x="118" y="74" width="184" height="136" fill={MAT_COLORS[matColor].hex} />

            {/* Artwork from Days 4–5 */}
            <g transform="translate(130, 82) scale(0.5)">
              <ChristmasPhotoArt
                template={template}
                strokes={strokes}
                regionColors={regionColors}
                colorStrokes={colorStrokes}
              />
            </g>
          </g>
        </svg>
      </div>

      <div className="day1-controls">
        {!isHung ? (
          <button type="button" className="primary-btn" onClick={handleHang} autoFocus>
            Hang Framed Photo on Wall
          </button>
        ) : (
          <div className="day1-done-actions">
            <button type="button" className="primary-btn" onClick={handleConfirm} autoFocus>
              {existingState ? 'Update Wall Frame' : 'Save & Display on Wallpaper'}
            </button>
            <button type="button" className="toolbar-btn" onClick={() => setIsHung(false)}>
              Take Down
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
