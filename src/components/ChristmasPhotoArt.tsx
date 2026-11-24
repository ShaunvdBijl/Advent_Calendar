import type { PhotoStroke, PhotoTemplate } from '../types/calendar';

interface ChristmasPhotoArtProps {
  template: PhotoTemplate;
  strokes: PhotoStroke[];
  regionColors?: Record<string, string>;
  onRegionClick?: (regionId: string) => void;
}

const DEFAULT_PAPER = '#faf5ea';
const INK = '#23201c';

export function ChristmasPhotoArt({
  template,
  strokes,
  regionColors = {},
  onRegionClick,
}: ChristmasPhotoArtProps) {
  const fillOf = (id: string) => regionColors[id] ?? DEFAULT_PAPER;
  const clickableClass = onRegionClick ? 'photo-region-clickable' : undefined;

  return (
    <g>
      {/* Paper / Sky Background */}
      <rect
        x="0"
        y="0"
        width="320"
        height="240"
        fill={fillOf('sky')}
        className={clickableClass}
        onClick={() => onRegionClick?.('sky')}
      />

      {template === 'cabin' && (
        <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
          {/* Snowy ground */}
          <path
            d="M 0 178 Q 160 160 320 178 L 320 240 L 0 240 Z"
            fill={fillOf('snow')}
            className={clickableClass}
            onClick={() => onRegionClick?.('snow')}
          />
          {/* Moon */}
          <circle
            cx="54"
            cy="46"
            r="20"
            fill={fillOf('moon')}
            className={clickableClass}
            onClick={() => onRegionClick?.('moon')}
          />
          {/* Pine Tree */}
          <polygon
            points="255,68 214,180 296,180"
            fill={fillOf('tree')}
            className={clickableClass}
            onClick={() => onRegionClick?.('tree')}
          />
          {/* Cabin Wall */}
          <rect
            x="64"
            y="112"
            width="120"
            height="78"
            fill={fillOf('cabinWall')}
            className={clickableClass}
            onClick={() => onRegionClick?.('cabinWall')}
          />
          {/* Cabin Roof */}
          <polygon
            points="48,116 124,62 200,116"
            fill={fillOf('roof')}
            className={clickableClass}
            onClick={() => onRegionClick?.('roof')}
          />
          {/* Chimney */}
          <rect
            x="152"
            y="68"
            width="18"
            height="28"
            fill={fillOf('chimney')}
            className={clickableClass}
            onClick={() => onRegionClick?.('chimney')}
          />
          {/* Door */}
          <rect
            x="84"
            y="142"
            width="30"
            height="48"
            rx="3"
            fill={fillOf('door')}
            className={clickableClass}
            onClick={() => onRegionClick?.('door')}
          />
          {/* Window */}
          <rect
            x="130"
            y="134"
            width="36"
            height="30"
            rx="2"
            fill={fillOf('window')}
            className={clickableClass}
            onClick={() => onRegionClick?.('window')}
          />
          <line x1="148" y1="134" x2="148" y2="164" />
          <line x1="130" y1="149" x2="166" y2="149" />
        </g>
      )}

      {template === 'wreath' && (
        <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
          {/* Outer & Inner Wreath Ring */}
          <path
            d="M 160 40 A 80 80 0 1 0 160 200 A 80 80 0 1 0 160 40 Z M 160 76 A 44 44 0 1 1 160 164 A 44 44 0 1 1 160 76 Z"
            fillRule="evenodd"
            fill={fillOf('wreathRing')}
            className={clickableClass}
            onClick={() => onRegionClick?.('wreathRing')}
          />
          {/* Center Bell */}
          <path
            d="M 146 138 L 151 106 Q 160 98 169 106 L 174 138 Z"
            fill={fillOf('bell')}
            className={clickableClass}
            onClick={() => onRegionClick?.('bell')}
          />
          <circle cx="160" cy="142" r="5" fill={fillOf('bell')} />
          {/* Top Ribbon Bow */}
          <path
            d="M 160 46 L 130 26 L 126 56 Z M 160 46 L 190 26 L 194 56 Z M 152 50 L 140 78 L 156 72 Z M 168 50 L 180 78 L 164 72 Z"
            fill={fillOf('bow')}
            className={clickableClass}
            onClick={() => onRegionClick?.('bow')}
          />
          {/* Holly Berries */}
          <g
            fill={fillOf('berries')}
            className={clickableClass}
            onClick={() => onRegionClick?.('berries')}
          >
            <circle cx="102" cy="96" r="7" />
            <circle cx="218" cy="96" r="7" />
            <circle cx="106" cy="154" r="7" />
            <circle cx="214" cy="154" r="7" />
            <circle cx="160" cy="184" r="7" />
          </g>
        </g>
      )}

      {template === 'sleigh' && (
        <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
          {/* Snowy Hill */}
          <path
            d="M 0 184 Q 160 156 320 186 L 320 240 L 0 240 Z"
            fill={fillOf('snow')}
            className={clickableClass}
            onClick={() => onRegionClick?.('snow')}
          />
          {/* Big Moon */}
          <circle
            cx="248"
            cy="58"
            r="26"
            fill={fillOf('moon')}
            className={clickableClass}
            onClick={() => onRegionClick?.('moon')}
          />
          {/* Gift Sack */}
          <path
            d="M 86 130 Q 74 96 108 88 Q 140 94 134 130 Z"
            fill={fillOf('giftBag')}
            className={clickableClass}
            onClick={() => onRegionClick?.('giftBag')}
          />
          {/* Sleigh Body */}
          <path
            d="M 68 128 L 196 128 Q 222 128 228 104 Q 238 144 202 162 L 80 162 Q 66 150 68 128 Z"
            fill={fillOf('sleighBody')}
            className={clickableClass}
            onClick={() => onRegionClick?.('sleighBody')}
          />
          {/* Runners */}
          <path
            d="M 62 178 L 216 178 Q 238 178 242 162"
            fill="none"
            stroke={regionColors.runners ?? INK}
            strokeWidth="5"
            className={clickableClass}
            onClick={() => onRegionClick?.('runners')}
          />
          <line x1="94" y1="162" x2="94" y2="178" />
          <line x1="184" y1="162" x2="184" y2="178" />
        </g>
      )}

      {/* User Freehand Ink Strokes */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {strokes.map((stroke) => (
          <polyline
            key={stroke.id}
            points={stroke.points}
            stroke={stroke.color}
            strokeWidth={stroke.width}
          />
        ))}
      </g>
    </g>
  );
}
