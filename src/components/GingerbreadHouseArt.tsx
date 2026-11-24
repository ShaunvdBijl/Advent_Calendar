import type { Day10State, Day9State } from '../types/calendar';

interface GingerbreadHouseArtProps {
  spiceBlend?: Day9State['spiceBlend'];
  icingColor?: Day10State['icingColor'];
  candyTheme?: Day10State['candyTheme'];
  /** 1 = walls, 2 = roof, 3 = icing, 4 = candies (default 4) */
  stage?: number;
  glowingWindows?: boolean;
}

const BISCUIT_COLORS: Record<Day9State['spiceBlend'], { wall: string; shade: string; edge: string }> = {
  'classic-ginger': { wall: '#9c5f2f', shade: '#804c23', edge: '#5c3416' },
  'dark-molasses': { wall: '#693a1b', shade: '#522c14', edge: '#381c0b' },
  'honey-cinnamon': { wall: '#b57638', shade: '#965f2a', edge: '#6e4319' },
};

const ICING_HEX: Record<Day10State['icingColor'], string> = {
  'snow-white': '#fffaf2',
  'mint-cream': '#d6f5e6',
  'pink-frost': '#ffd6e0',
};

const CANDY_PALETTES: Record<Day10State['candyTheme'], [string, string, string]> = {
  peppermint: ['#d63638', '#ffffff', '#215c3e'],
  'gumdrop-rainbow': ['#ef4444', '#f59e0b', '#22c55e'],
  'gold-dragees': ['#f0c674', '#fff3b0', '#cfa047'],
};

/**
 * Reusable Gingerbread House SVG artwork in a 200x160 local coordinate space.
 * Used in Day 10 builder, Day 10 table preview, and Day 15 glowing display.
 */
export function GingerbreadHouseArt({
  spiceBlend = 'classic-ginger',
  icingColor = 'snow-white',
  candyTheme = 'peppermint',
  stage = 4,
  glowingWindows = false,
}: GingerbreadHouseArtProps) {
  const biscuit = BISCUIT_COLORS[spiceBlend];
  const icing = ICING_HEX[icingColor];
  const [c1, c2, c3] = CANDY_PALETTES[candyTheme];
  const windowFill = glowingWindows ? '#ffe27a' : '#3d2518';

  return (
    <g>
      {/* Frosted Cookie Base Board */}
      <ellipse cx="100" cy="144" rx="88" ry="12" fill={icing} opacity="0.92" />

      {/* Stage 1+: Walls */}
      {stage >= 1 && (
        <g className="tree-part-enter">
          {/* Side Wall */}
          <polygon
            points="126,76 174,68 174,138 126,144"
            fill={biscuit.shade}
            stroke={biscuit.edge}
            strokeWidth="2"
          />
          {/* Front Gable Wall */}
          <polygon
            points="74,34 26,76 26,144 126,144 126,76"
            fill={biscuit.wall}
            stroke={biscuit.edge}
            strokeWidth="2"
          />
          {/* Door */}
          <path
            d="M 62 144 L 62 106 A 12 12 0 0 1 86 106 L 86 144 Z"
            fill="#522c14"
            stroke={biscuit.edge}
            strokeWidth="2"
          />
          {/* Front Round Attic Window */}
          <circle
            cx="74"
            cy="68"
            r="10"
            fill={windowFill}
            stroke={biscuit.edge}
            strokeWidth="2"
            className={glowingWindows ? 'twinkle-a' : undefined}
          />
          {/* Side Square Window */}
          <rect
            x="140"
            y="92"
            width="20"
            height="22"
            rx="2"
            fill={windowFill}
            stroke={biscuit.edge}
            strokeWidth="2"
            className={glowingWindows ? 'twinkle-b' : undefined}
          />
        </g>
      )}

      {/* Stage 2+: Sloped Roof & Chimney */}
      {stage >= 2 && (
        <g className="tree-part-enter">
          {/* Chimney */}
          <rect x="132" y="28" width="18" height="28" fill={biscuit.shade} stroke={biscuit.edge} strokeWidth="2" />
          {/* Right Roof Slope */}
          <polygon
            points="74,26 128,18 182,66 128,76"
            fill={biscuit.wall}
            stroke={biscuit.edge}
            strokeWidth="2.2"
          />
          {/* Front Roof Eave Trim */}
          <polyline
            points="18,80 74,26 132,78"
            fill="none"
            stroke={biscuit.edge}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {/* Stage 3+: Piped Snow-Drift Icing */}
      {stage >= 3 && (
        <g className="tree-part-enter" fill="none" stroke={icing} strokeLinecap="round" strokeLinejoin="round">
          {/* Roof Eaves & Ridge Icing */}
          <polyline points="18,80 74,26 132,78" strokeWidth="6" />
          <line x1="74" y1="26" x2="128" y2="18" strokeWidth="5.5" />
          {/* Scalloped Snow Drifts on Roof */}
          <path d="M 102 44 Q 116 54 130 42 Q 144 52 158 40" strokeWidth="4" />
          <path d="M 118 60 Q 134 70 150 58 Q 166 68 180 62" strokeWidth="4" />
          {/* Chimney Snow Cap */}
          <path d="M 129 28 Q 141 21 153 28" strokeWidth="6" />
          {/* Door & Window Piping */}
          <path d="M 60 143 L 60 106 A 14 14 0 0 1 88 106 L 88 143" strokeWidth="2.8" />
          <circle cx="74" cy="68" r="11.5" strokeWidth="2.2" />
          <rect x="139" y="91" width="22" height="24" rx="2" strokeWidth="2.2" />
        </g>
      )}

      {/* Stage 4: Gumdrops & Peppermint Candies */}
      {stage >= 4 && (
        <g className="tree-part-enter">
          {/* Front Gable Candies */}
          <circle cx="74" cy="36" r="4.5" fill={c1} stroke="#ffffff" strokeWidth="1.2" />
          <circle cx="48" cy="60" r="4" fill={c2} stroke={biscuit.edge} strokeWidth="0.8" />
          <circle cx="100" cy="60" r="4" fill={c3} stroke={biscuit.edge} strokeWidth="0.8" />
          <circle cx="34" cy="84" r="4.5" fill={c1} />
          <circle cx="116" cy="84" r="4.5" fill={c3} />
          {/* Door Gumdrop Path */}
          <circle cx="44" cy="136" r="4.5" fill={c1} />
          <circle cx="104" cy="136" r="4.5" fill={c3} />
          {/* Roof Candy Dots */}
          <circle cx="106" cy="34" r="4" fill={c1} />
          <circle cx="128" cy="32" r="4" fill={c3} />
          <circle cx="146" cy="48" r="4" fill={c2} />
          <circle cx="164" cy="58" r="4" fill={c1} />
        </g>
      )}
    </g>
  );
}
