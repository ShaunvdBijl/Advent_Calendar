interface SnowmanArtProps {
  stickArms?: 'waving' | 'downward';
  scarfColor?: string;
  hasCarrotNose?: boolean;
  hasButtons?: boolean;
  hasTopHat?: boolean;
  hatBandColor?: string;
}

/**
 * Reusable Snowman SVG in local coordinates centered at x = 0, base y = 0 (height ~135).
 */
export function SnowmanArt({
  stickArms = 'waving',
  scarfColor,
  hasCarrotNose = false,
  hasButtons = false,
  hasTopHat = false,
  hatBandColor = '#c92a35',
}: SnowmanArtProps) {
  return (
    <g>
      {/* Ground shadow */}
      <ellipse cx="0" cy="4" rx="34" ry="7" fill="rgba(26, 52, 82, 0.28)" />

      {/* Stick Arms */}
      <g stroke="#6b4423" strokeWidth="3.5" strokeLinecap="round" fill="none">
        {stickArms === 'waving' ? (
          <>
            <path d="M -22 -64 L -50 -84 M -42 -78 L -48 -90 M -44 -79 L -56 -78" />
            <path d="M 22 -64 L 50 -84 M 42 -78 L 48 -90 M 44 -79 L 56 -78" />
          </>
        ) : (
          <>
            <path d="M -22 -64 L -48 -46 M -40 -52 L -46 -40" />
            <path d="M 22 -64 L 48 -46 M 40 -52 L 46 -40" />
          </>
        )}
      </g>

      {/* Base Snowball */}
      <circle cx="0" cy="-24" r="30" fill="#f1f7fd" stroke="#b9d0e8" strokeWidth="2" />
      {/* Torso Snowball */}
      <circle cx="0" cy="-64" r="22" fill="#f5f9fe" stroke="#b9d0e8" strokeWidth="2" />
      {/* Head Snowball */}
      <circle cx="0" cy="-96" r="15" fill="#ffffff" stroke="#b9d0e8" strokeWidth="2" />

      {/* Coal Eyes */}
      <circle cx="-5.5" cy="-99" r="2" fill="#1e293b" />
      <circle cx="5.5" cy="-99" r="2" fill="#1e293b" />

      {/* Coal Smile */}
      <g fill="#1e293b">
        <circle cx="-6" cy="-90" r="1.2" />
        <circle cx="-2.5" cy="-88.5" r="1.2" />
        <circle cx="2.5" cy="-88.5" r="1.2" />
        <circle cx="6" cy="-90" r="1.2" />
      </g>

      {/* Day 12 Accessories */}
      {hasButtons && (
        <g fill="#1e293b">
          <circle cx="0" cy="-71" r="2.6" />
          <circle cx="0" cy="-61" r="2.6" />
          <circle cx="0" cy="-51" r="2.6" />
        </g>
      )}

      {scarfColor && (
        <g>
          <rect x="-15" y="-85" width="30" height="7" rx="3.5" fill={scarfColor} />
          <path d="M 5 -80 L 14 -58 L 22 -62 L 13 -82 Z" fill={scarfColor} />
        </g>
      )}

      {hasCarrotNose && (
        <polygon points="0,-96 16,-93 0,-91" fill="#f97316" stroke="#c2410c" strokeWidth="0.8" />
      )}

      {hasTopHat && (
        <g>
          <rect x="-18" y="-111" width="36" height="4.5" rx="2" fill="#1e2430" />
          <rect x="-12" y="-132" width="24" height="22" rx="2" fill="#1e2430" />
          <rect x="-12" y="-116" width="24" height="4.5" fill={hatBandColor} />
        </g>
      )}
    </g>
  );
}
