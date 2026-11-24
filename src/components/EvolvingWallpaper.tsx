import type { CalendarProgress } from '../types/calendar';
import { ChristmasPhotoArt } from './ChristmasPhotoArt';
import { GingerbreadHouseArt } from './GingerbreadHouseArt';
import { SnowmanArt } from './SnowmanArt';

interface EvolvingWallpaperProps {
  progress: CalendarProgress;
  onOpenWishLetter?: () => void;
  musicPlaying?: boolean;
  onToggleMusic?: () => void;
}

export function EvolvingWallpaper({
  progress,
  onOpenWishLetter,
  musicPlaying = false,
  onToggleMusic,
}: EvolvingWallpaperProps) {
  const hasDay1 = progress.completedDays.includes(1);
  const hasDay2 = progress.completedDays.includes(2);
  const hasDay3 = progress.completedDays.includes(3);
  const hasDay4 = progress.completedDays.includes(4);
  const hasDay5 = progress.completedDays.includes(5);
  const hasDay6 = progress.completedDays.includes(6);
  const hasDay7 = progress.completedDays.includes(7);
  const hasDay8 = progress.completedDays.includes(8);
  const hasDay9 = progress.completedDays.includes(9);
  const hasDay10 = progress.completedDays.includes(10);
  const hasDay11 = progress.completedDays.includes(11);
  const hasDay12 = progress.completedDays.includes(12);
  const hasDay13 = progress.completedDays.includes(13);
  const hasDay14 = progress.completedDays.includes(14);
  const hasDay15 = progress.completedDays.includes(15);
  const hasDay16 = progress.completedDays.includes(16);
  const hasDay17 = progress.completedDays.includes(17);
  const hasDay18 = progress.completedDays.includes(18);
  const hasDay19 = progress.completedDays.includes(19);
  const hasDay20 = progress.completedDays.includes(20);
  const hasDay21 = progress.completedDays.includes(21);
  const hasDay22 = progress.completedDays.includes(22);
  const hasDay23 = progress.completedDays.includes(23);
  const hasDay24 = progress.completedDays.includes(24);
  const treeColors =
    progress.day1?.treeVariant === 'spruce'
      ? { dark: '#18423e', mid: '#215853', light: '#2d756e' }
      : progress.day1?.treeVariant === 'fir'
        ? { dark: '#143628', mid: '#1d4c39', light: '#26634b' }
        : { dark: '#1a422c', mid: '#24593c', light: '#2f724d' };
  const standStyle = progress.day2?.standStyle ?? 'classic-red';
  const treeScaleY = progress.day2?.heightScale === 'cozy' ? 0.92 : 1.05;
  const garlandStyle = progress.day3?.garlandStyle ?? 'none';
  const ornaments = progress.day3?.ornaments ?? [];
  const frameStyle = progress.day6?.frameStyle ?? 'ornate-gold';
  const frameMatHex =
    progress.day6?.matColor === 'forest'
      ? '#1e4635'
      : progress.day6?.matColor === 'crimson'
        ? '#7a1f26'
        : '#f4ece0';
  const fireRoaring = progress.day7?.intensity === 'roaring';
  const snowIntensity = progress.day8?.intensity ?? 'flurry';
  const windowFlakeCount = snowIntensity === 'blizzard' ? 56 : snowIntensity === 'gentle' ? 22 : 36;
  const ambientFlakeCount = snowIntensity === 'blizzard' ? 30 : snowIntensity === 'gentle' ? 12 : 20;
  const gingerBakedColor =
    progress.day9?.spiceBlend === 'dark-molasses'
      ? '#693a1b'
      : progress.day9?.spiceBlend === 'honey-cinnamon'
        ? '#b57638'
        : '#9c5f2f';
  const outdoorLightColors =
    progress.day13?.palette === 'warm-white'
      ? ['#ffe79e', '#ffd166', '#fff3c4']
      : progress.day13?.palette === 'icicle-blue'
        ? ['#bae6fd', '#60a5fa', '#f8fafc']
        : ['#ef4444', '#facc15', '#22c55e', '#38bdf8'];
  const yardBirdColors =
    progress.day14?.birdKind === 'snow-cardinal'
      ? { body: '#c92a35', breast: '#e03131', wing: '#9b1c26', crest: true }
      : progress.day14?.birdKind === 'blue-jay'
        ? { body: '#3b82f6', breast: '#e2e8f0', wing: '#1d4ed8', crest: true }
        : { body: '#6b4c3b', breast: '#d94832', wing: '#4f372b', crest: false };
  const giftPaperFill =
    progress.day17?.paperStyle === 'pine-stars'
      ? '#1f5c3e'
      : progress.day17?.paperStyle === 'midnight-gold'
        ? '#1e3557'
        : '#b82830';
  const giftRibbonColor = progress.day17?.ribbonColor ?? '#f0c674';
  const sealHex =
    progress.day18?.sealColor === 'gold'
      ? '#d4a33c'
      : progress.day18?.sealColor === 'pine'
        ? '#1f5c3e'
        : '#b82830';
  const lanternGlow =
    progress.day21?.glowStyle === 'starlight-gold'
      ? { core: '#fff0a6', halo: '#f0c674' }
      : progress.day21?.glowStyle === 'frosted-teal'
        ? { core: '#99f6e4', halo: '#2dd4bf' }
        : { core: '#ffbe55', halo: '#ff922b' };
  const starStyle = progress.day24?.starStyle ?? 'classic-gold';
  const starColors =
    starStyle === 'bethlehem-burst'
      ? { fill: '#fff3b0', stroke: '#e0a938', halo: '#ffe07d' }
      : starStyle === 'crystal-silver'
        ? { fill: '#e0f2fe', stroke: '#60a5fa', halo: '#93c5fd' }
        : { fill: '#ffe169', stroke: '#d49a1a', halo: '#ffcf4d' };

  return (
    <div className="wallpaper-layer">
      <svg
        className="wallpaper-svg"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#091124" />
            <stop offset="55%" stopColor="#132544" />
            <stop offset="100%" stopColor="#1e385c" />
          </linearGradient>
          <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b2618" />
            <stop offset="100%" stopColor="#26170e" />
          </linearGradient>
          <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4f3320" />
            <stop offset="100%" stopColor="#2e1b10" />
          </linearGradient>
          <linearGradient id="snowGround" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dce9f7" />
            <stop offset="100%" stopColor="#a7c0dc" />
          </linearGradient>
          <linearGradient id="wpGoldFrame" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5d57a" />
            <stop offset="50%" stopColor="#c49234" />
            <stop offset="100%" stopColor="#8c621c" />
          </linearGradient>
          <linearGradient id="wpWoodFrame" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8c5832" />
            <stop offset="50%" stopColor="#693e20" />
            <stop offset="100%" stopColor="#4a2a14" />
          </linearGradient>
          <radialGradient id="wpHearthGlow" cx="475" cy="585" r="520" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff9a2e" stopOpacity={fireRoaring ? 0.36 : 0.25} />
            <stop offset="45%" stopColor="#ff7315" stopOpacity={fireRoaring ? 0.14 : 0.09} />
            <stop offset="100%" stopColor="#ff6a00" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="wpFlameOuter" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#d93814" />
            <stop offset="65%" stopColor="#ff7b1c" />
            <stop offset="100%" stopColor="#ffd166" />
          </linearGradient>
          <linearGradient id="wpFlameInner" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#ff9e1f" />
            <stop offset="100%" stopColor="#fff3b0" />
          </linearGradient>
          <radialGradient id="wpCandyGlow" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="#ffe07d" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#ffb347" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#ffb347" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="wpStarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={starColors.halo} stopOpacity="0.72" />
            <stop offset="50%" stopColor={starColors.halo} stopOpacity="0.22" />
            <stop offset="100%" stopColor={starColors.halo} stopOpacity="0" />
          </radialGradient>
          <clipPath id="windowSnowClip">
            <rect x="830" y="100" width="680" height="470" />
          </clipPath>
        </defs>

        {/* Outdoor Winter Sky (visible through panoramic cabin window) */}
        <rect x="820" y="90" width="700" height="500" fill="url(#skyGrad)" />

        {/* Stars in the night sky */}
        <g fill="#f7eed3" opacity="0.8">
          <circle cx="910" cy="145" r="2" />
          <circle cx="1020" cy="125" r="1.5" />
          <circle cx="1140" cy="165" r="2.2" />
          <circle cx="1290" cy="130" r="1.8" />
          <circle cx="1410" cy="180" r="2.4" />
          <circle cx="1465" cy="135" r="1.5" />
        </g>

        {/* Crescent Moon */}
        <circle cx="1395" cy="155" r="32" fill="#f7e7b4" />
        <circle cx="1408" cy="147" r="28" fill="#10203d" />

        {/* Distant Snowy Hills */}
        <path
          d="M 820 430 Q 1000 370 1190 420 T 1520 400 L 1520 590 L 820 590 Z"
          fill="#bdd1e8"
        />
        <path
          d="M 820 465 Q 1030 435 1230 475 T 1520 455 L 1520 590 L 820 590 Z"
          fill="url(#snowGround)"
        />

        {/* Background Pine Forest in Yard */}
        <g fill="#1c3d32">
          <polygon points="885,455 910,375 935,455" />
          <polygon points="945,460 975,365 1005,460" />
          <polygon points="1310,450 1340,360 1370,450" />
          <polygon points="1420,462 1455,355 1490,462" />
        </g>

        {/* Harvested Tree Spot / Stump in the Yard (Day 1 Evolution) */}
        {hasDay1 ? (
          <g id="day1-yard-stump">
            {/* Freshly cut tree stump with snow cap */}
            <path d="M 1110 515 L 1116 485 L 1144 485 L 1150 515 Z" fill="#5b3a24" />
            <ellipse cx="1130" cy="485" rx="14" ry="5" fill="#d9b482" />
            <ellipse cx="1130" cy="485" rx="9" ry="3" fill="#b88b55" />
            {/* Woodchips on snow */}
            <ellipse cx="1102" cy="516" rx="5" ry="2" fill="#d9b482" />
            <ellipse cx="1158" cy="514" rx="4" ry="2" fill="#c99b63" />
            {/* Cut pine tree resting on sled/porch until brought inside on Day 2 */}
            {!hasDay2 && (
              <g transform="translate(970, 505)">
                <rect x="0" y="14" width="120" height="8" rx="3" fill="#6b4226" />
                <polygon points="20,14 95,-12 95,40" fill={treeColors.dark} />
                <polygon points="55,14 130,-18 130,46" fill={treeColors.light} />
              </g>
            )}
          </g>
        ) : (
          <g id="day1-standing-tree">
            {/* Tall pine tree in yard waiting to be chopped on Day 1 */}
            <rect x="1122" y="475" width="16" height="40" fill="#4f311d" />
            <polygon points="1130,335 1085,435 1175,435" fill="#1e4937" />
            <polygon points="1130,380 1075,485 1185,485" fill="#235540" />
          </g>
        )}

        {/* Day 11–12 Evolution: Snowman Standing in the Snowy Yard */}
        {(hasDay11 || hasDay12) && (
          <g id="day11-yard-snowman" transform="translate(1265, 536) scale(0.95)">
            <SnowmanArt
              stickArms={progress.day11?.stickArms ?? 'waving'}
              scarfColor={hasDay12 ? (progress.day12?.scarfColor ?? '#c92a35') : undefined}
              hasCarrotNose={hasDay12}
              hasButtons={hasDay12}
              hasTopHat={hasDay12}
              hatBandColor={progress.day12?.hatBandColor ?? '#c92a35'}
            />
          </g>
        )}

        {/* Day 14 Evolution: Wooden Bird Feeder & Visiting Winter Bird in Snowy Yard */}
        {hasDay14 && (
          <g id="day14-yard-bird-feeder" transform="translate(888, 434) scale(0.75)">
            {/* Post & Tray */}
            <rect x="46" y="72" width="12" height="72" rx="2" fill="#6b4426" />
            <rect x="12" y="66" width="80" height="10" rx="3" fill="#8c5a34" />
            {/* Pillars & Roof */}
            <rect x="24" y="34" width="6" height="34" fill="#6b4426" />
            <rect x="74" y="34" width="6" height="34" fill="#6b4426" />
            <polygon points="4,38 52,8 100,38" fill="#7a4827" />
            <path d="M 4 38 L 52 8 L 100 38 L 93 41 L 52 15 L 11 41 Z" fill="#e6f1fc" />
            {/* Seeds */}
            <ellipse cx="36" cy="64" rx="3" ry="1.5" fill="#e6b85c" />
            <ellipse cx="52" cy="63" rx="3" ry="1.5" fill="#f0c674" />
            <ellipse cx="66" cy="64" rx="3" ry="1.5" fill="#c9933b" />
            {/* Visiting Bird */}
            <g transform="translate(52, 52)">
              <g className="yard-bird-bob">
                <polygon points="-10,3 -22,7 -19,-1" fill={yardBirdColors.wing} />
                <ellipse cx="0" cy="0" rx="12" ry="9" fill={yardBirdColors.body} />
                <ellipse cx="4" cy="2" rx="7.5" ry="6" fill={yardBirdColors.breast} />
                <circle cx="8" cy="-7" r="6.5" fill={yardBirdColors.body} />
                {yardBirdColors.crest && <polygon points="6,-12 10,-18 12,-10" fill={yardBirdColors.body} />}
                <circle cx="10.5" cy="-7.5" r="1.3" fill="#0f172a" />
                <polygon points="14,-7 20,-5.5 14,-4" fill="#f59e0b" />
              </g>
            </g>
          </g>
        )}

        {/* Day 21 Evolution: Lit Outdoor Pathway Lanterns & Distant Sleigh */}
        {hasDay21 && (
          <g id="day21-yard-lanterns" clipPath="url(#windowSnowClip)">
            {/* Distant guiding Santa sleigh in the starry sky */}
            <g transform="translate(1010, 178)" fill="#f0c674" opacity="0.82">
              <path d="M 0 10 L 22 10 Q 28 10 30 4 L 25 14 L -3 14 Z" />
              <line x1="28" y1="9" x2="62" y2="7" stroke="#f0c674" strokeWidth="1" />
              <circle cx="44" cy="7" r="2.6" />
              <circle cx="54" cy="6.5" r="2.6" />
              <circle cx="65" cy="5.5" r="2.8" fill="#ef4444" className="twinkle-a" />
            </g>

            {/* 4 Glowing Iron Pathway Lanterns Across Snowy Yard */}
            {[
              { x: 990, y: 540, s: 0.72 },
              { x: 1082, y: 548, s: 0.76 },
              { x: 1365, y: 536, s: 0.72 },
              { x: 1456, y: 526, s: 0.68 },
            ].map((spot, idx) => (
              <g key={idx} transform={`translate(${spot.x}, ${spot.y}) scale(${spot.s})`}>
                <circle cx="0" cy="-26" r="42" fill={lanternGlow.halo} opacity="0.22" className="fire-glow-pulse" />
                <ellipse cx="0" cy="4" rx="24" ry="7" fill={lanternGlow.halo} opacity="0.25" />
                <rect x="-2.5" y="-18" width="5" height="22" fill="#262c36" />
                <rect x="-10" y="-38" width="20" height="22" rx="3" fill={lanternGlow.core} stroke="#1e2430" strokeWidth="2.5" />
                <polygon points="-13,-38 0,-47 13,-38" fill="#1e2430" />
                <circle cx="0" cy="-27" r="4" fill="#ffffff" opacity="0.9" className={idx % 2 === 0 ? 'twinkle-a' : 'twinkle-b'} />
              </g>
            ))}
          </g>
        )}

        {/* Day 8 Evolution: Outdoor Snowfall Seen Through Cabin Window */}
        {hasDay8 && (
          <g id="day8-window-snow" clipPath="url(#windowSnowClip)" fill="#ffffff">
            {Array.from({ length: windowFlakeCount }, (_, i) => {
              const cx = 835 + ((i * 73 + 19) % 670);
              const r = 1.8 + (i % 4) * 0.9;
              const speedBase = snowIntensity === 'blizzard' ? 3.8 : snowIntensity === 'gentle' ? 7.2 : 5.4;
              const dur = (speedBase + (i % 5) * 0.85).toFixed(2);
              const delay = (-((i * 0.57) % 6)).toFixed(2);
              return (
                <circle
                  key={`ws-${i}`}
                  cx={cx}
                  cy={90}
                  r={r}
                  opacity={0.55 + (i % 4) * 0.11}
                  className="snow-flake-window"
                  style={{
                    animationDuration: `${dur}s`,
                    animationDelay: `${delay}s`,
                  }}
                />
              );
            })}
          </g>
        )}

        {/* Day 13 Evolution: Twinkling Outdoor Roofline Lights Along Upper Window Eave */}
        {hasDay13 && (
          <g id="day13-outdoor-lights" clipPath="url(#windowSnowClip)">
            <path
              d="M 830 112 Q 915 144 1000 112 T 1170 112 T 1340 112 T 1510 112"
              fill="none"
              stroke="#1f2937"
              strokeWidth="3.5"
            />
            {Array.from({ length: 17 }, (_, i) => {
              const bx = 850 + i * 40;
              const phase = (i % 4) / 4;
              const sag = Math.sin(phase * Math.PI) * 18;
              const by = 114 + sag;
              const color = outdoorLightColors[i % outdoorLightColors.length];
              return (
                <g key={`ol-${i}`}>
                  <circle
                    cx={bx}
                    cy={by}
                    r="13"
                    fill={color}
                    opacity="0.24"
                    className={i % 2 === 0 ? 'twinkle-a' : 'twinkle-b'}
                  />
                  <circle
                    cx={bx}
                    cy={by}
                    r="5"
                    fill={color}
                    className={i % 2 === 0 ? 'twinkle-a' : 'twinkle-b'}
                  />
                </g>
              );
            })}
          </g>
        )}

        {/* Cabin Interior Walls & Floor */}
        <path
          d="M 0 0 L 1600 0 L 1600 900 L 0 900 Z M 830 100 L 830 570 L 1510 570 L 1510 100 Z"
          fill="url(#wallGrad)"
          fillRule="evenodd"
        />
        <rect x="0" y="650" width="1600" height="250" fill="url(#floorGrad)" />

        {/* Subtle Wooden Wall Planks */}
        <g stroke="#22130b" strokeWidth="2" opacity="0.45">
          <line x1="0" y1="140" x2="830" y2="140" />
          <line x1="0" y1="280" x2="830" y2="280" />
          <line x1="0" y1="420" x2="830" y2="420" />
          <line x1="0" y1="560" x2="830" y2="560" />
        </g>

        {/* Window Frame & Mullions */}
        <rect
          x="830"
          y="100"
          width="680"
          height="470"
          fill="none"
          stroke="#6b442a"
          strokeWidth="22"
        />
        <line x1="1170" y1="100" x2="1170" y2="570" stroke="#6b442a" strokeWidth="14" />
        <line x1="830" y1="335" x2="1510" y2="335" stroke="#6b442a" strokeWidth="14" />
        <rect x="810" y="566" width="720" height="24" rx="4" fill="#7c4f31" />

        {/* Day 15 Evolution: Glowing Gingerbread House on Windowsill */}
        {hasDay15 && (progress.day15?.placement ?? 'windowsill') === 'windowsill' && (
          <g id="day15-windowsill-gingerbread">
            <circle cx="1392" cy="532" r="78" fill="url(#wpCandyGlow)" className="fire-glow-pulse" />
            <g transform="translate(1332, 484) scale(0.58)">
              <GingerbreadHouseArt
                spiceBlend={progress.day9?.spiceBlend}
                icingColor={progress.day10?.icingColor}
                candyTheme={progress.day10?.candyTheme}
                stage={4}
                glowingWindows
              />
            </g>
          </g>
        )}

        {/* Day 22 Evolution: Steaming Holiday Eggnog Mug on Windowsill */}
        {hasDay22 && (
          <g id="day22-eggnog-mug" transform="translate(882, 526) scale(0.42)">
            <path d="M 106 32 C 134 32, 134 84, 106 84" fill="none" stroke="#b82830" strokeWidth="12" strokeLinecap="round" />
            <ellipse cx="58" cy="24" rx="48" ry="11" fill="#f5dfad" />
            <ellipse cx="58" cy="21" rx="34" ry="8" fill="#fff8e8" />
            {(progress.day22?.topping ?? 'cinnamon-stick') === 'cinnamon-stick' && (
              <rect x="72" y="-18" width="9" height="46" rx="3" fill="#7c4120" transform="rotate(24 76 12)" />
            )}
            {progress.day22?.topping === 'whipped-nutmeg' && (
              <path d="M 32 24 Q 58 -4 84 24 Z" fill="#ffffff" />
            )}
            {progress.day22?.topping === 'caramel-drizzle' && (
              <path d="M 34 22 Q 46 15 58 22 T 84 20" fill="none" stroke="#c97a2b" strokeWidth="4" strokeLinecap="round" />
            )}
            <path d="M 8 24 L 8 92 C 8 110, 108 110, 108 92 L 108 24 C 108 36, 8 36, 8 24 Z" fill="#b82830" stroke="#7a181e" strokeWidth="3" />
            <g stroke="#f0c674" strokeWidth="3" strokeLinecap="round">
              <line x1="58" y1="54" x2="58" y2="82" />
              <line x1="44" y1="68" x2="72" y2="68" />
            </g>
            <g fill="none" stroke="#ffe7c2" strokeWidth="3.5" strokeLinecap="round" opacity="0.75">
              <path d="M 42 -6 Q 36 -24 44 -38" className="steam-rise" />
              <path d="M 68 -10 Q 62 -28 70 -42" className="steam-rise" style={{ animationDelay: '0.6s' }} />
            </g>
          </g>
        )}

        {/* Stone Fireplace & Mantle (Left-Center) */}
        <g id="fireplace-base">
          <rect x="330" y="340" width="290" height="310" rx="6" fill="#525866" />
          <rect x="365" y="425" width="220" height="225" rx="90" fill="#181416" />

          {/* Day 7 Evolution: Stacked Logs & Permanent Flickering Fire */}
          {hasDay7 && (
            <g id="day7-fireplace-fire">
              {/* Logs on grate */}
              <rect x="404" y="618" width="90" height="18" rx="8" fill="#5e371f" transform="rotate(-6 449 627)" />
              <rect x="456" y="618" width="90" height="18" rx="8" fill="#6c4024" transform="rotate(7 501 627)" />
              <rect x="424" y="604" width="102" height="17" rx="8" fill="#7b4929" />

              {/* Flickering flames */}
              <g
                transform={`translate(475 616) scale(${fireRoaring ? 1.15 : 0.98}) translate(-475 -616)`}
              >
                <path
                  d="M 426 616 C 418 566, 448 530, 475 488 C 502 530, 532 566, 524 616 Z"
                  fill="url(#wpFlameOuter)"
                  className="fire-flicker-outer"
                />
                <path
                  d="M 412 618 C 408 588, 428 570, 438 548 C 448 570, 454 594, 446 618 Z"
                  fill="url(#wpFlameOuter)"
                  className="fire-flicker-side"
                />
                <path
                  d="M 502 618 C 498 592, 508 568, 518 546 C 530 570, 542 590, 536 618 Z"
                  fill="url(#wpFlameOuter)"
                  className="fire-flicker-side"
                />
                <path
                  d="M 448 616 C 444 582, 460 558, 475 528 C 490 558, 506 582, 502 616 Z"
                  fill="url(#wpFlameInner)"
                  className="fire-flicker-inner"
                />
                <circle cx="454" cy="516" r="3" fill="#ffe08a" className="ember-rise-a" />
                <circle cx="496" cy="504" r="2.5" fill="#ffb74d" className="ember-rise-b" />
              </g>
            </g>
          )}

          {/* Mantle Shelf */}
          <rect x="305" y="325" width="340" height="28" rx="5" fill="#7c4f31" />

          {/* Day 19 Evolution: Customized Stockings Hung Along Fireplace Mantle */}
          {hasDay19 && (
            <g id="day19-mantle-stockings">
              {(progress.day19?.stockings ?? []).map((stocking, idx) => {
                const sx = 372 + idx * 102;
                return (
                  <g key={stocking.id} transform={`translate(${sx}, 352) scale(0.55)`}>
                    <circle cx="0" cy="-2" r="4.5" fill="#f0c674" />
                    <path
                      d="M -20 28 L 16 28 L 16 86 C 16 102, 24 114, 34 118 C 42 122, 40 138, 22 138 L -14 138 C -28 138, -28 120, -20 108 Z"
                      fill={stocking.color}
                      stroke="rgba(0,0,0,0.35)"
                      strokeWidth="2.5"
                    />
                    {stocking.pattern === 'stripes' && (
                      <g stroke="#f8fafc" strokeWidth="4.5" opacity="0.65">
                        <line x1="-19" y1="54" x2="15" y2="54" />
                        <line x1="-19" y1="74" x2="15" y2="74" />
                        <line x1="-19" y1="94" x2="17" y2="94" />
                      </g>
                    )}
                    {stocking.pattern === 'polka' && (
                      <g fill="#f8fafc" opacity="0.75">
                        <circle cx="-8" cy="54" r="3.8" />
                        <circle cx="6" cy="64" r="3.8" />
                        <circle cx="-10" cy="82" r="3.8" />
                        <circle cx="5" cy="96" r="3.8" />
                      </g>
                    )}
                    <rect x="-25" y="10" width="46" height="22" rx="7" fill="#faf3e3" stroke="#d4c5a9" strokeWidth="2" />
                    <text
                      x="-2"
                      y="26"
                      textAnchor="middle"
                      fill={stocking.color}
                      fontSize="15"
                      fontWeight="800"
                    >
                      {stocking.initial || '★'}
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* Day 20 Evolution: Brass Music Box Sitting on Left End of Mantlepiece */}
          {hasDay20 && (
            <g
              id="day20-mantle-music-box"
              transform="translate(318, 297)"
              className="mantle-envelope-btn"
              onClick={onToggleMusic}
              role="button"
              tabIndex={0}
              aria-label={musicPlaying ? 'Pause holiday music box' : 'Play holiday music box'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToggleMusic?.();
                }
              }}
            >
              <title>{musicPlaying ? 'Click to pause holiday chimes' : 'Click to play holiday chimes'}</title>
              <rect x="0" y="6" width="44" height="24" rx="4" fill="#5c3921" stroke="#e6be63" strokeWidth="2" />
              <path d="M 0 6 L 8 -4 L 48 -4 L 44 6 Z" fill="#7c4f31" stroke="#e6be63" strokeWidth="1.5" />
              <circle cx="22" cy="18" r="5" fill="#f0c674" />
              {musicPlaying && (
                <g fill="#ffe19c" fontSize="14" fontWeight="700">
                  <text x="10" y="-8" className="steam-rise">♪</text>
                  <text x="28" y="-14" className="steam-rise" style={{ animationDelay: '0.6s' }}>♫</text>
                </g>
              )}
            </g>
          )}

          {/* Day 18 Evolution: Clickable Wax-Sealed Wish Letter Tucked on Mantlepiece */}
          {hasDay18 && (
            <g
              id="day18-mantle-envelope"
              transform="translate(572, 294) rotate(-6)"
              className="mantle-envelope-btn"
              onClick={onOpenWishLetter}
              role="button"
              tabIndex={0}
              aria-label="Open and re-read your holiday wish letter"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenWishLetter?.();
                }
              }}
            >
              <title>Click to re-read your holiday wish letter</title>
              <rect x="0" y="0" width="56" height="36" rx="3" fill="#f5ead6" stroke="#b9a07a" strokeWidth="1.8" />
              <polygon points="0,0 28,21 56,0" fill="#ebdac0" stroke="#b9a07a" strokeWidth="1.5" />
              <circle cx="28" cy="20" r="6" fill={sealHex} />
            </g>
          )}

          {/* Picture Frame Hook on Wall Above Mantle */}
          <circle cx="475" cy="115" r="5" fill="#c9a459" />

          {/* Day 6 Evolution: Framed Christmas Photo Hung Above Fireplace */}
          {hasDay6 && (
            <g id="day6-framed-photo">
              {/* Hanging wire */}
              <polyline
                points="415,142 475,115 535,142"
                fill="none"
                stroke="#d9b166"
                strokeWidth="2.5"
              />
              {/* Shadow */}
              <rect x="383" y="146" width="192" height="150" rx="5" fill="rgba(0,0,0,0.42)" />
              {/* Outer Frame */}
              <rect
                x="379"
                y="140"
                width="192"
                height="150"
                rx="4"
                fill={frameStyle === 'ornate-gold' ? 'url(#wpGoldFrame)' : 'url(#wpWoodFrame)'}
                stroke={frameStyle === 'ornate-gold' ? '#ffe394' : '#3d2210'}
                strokeWidth="2.5"
              />
              {frameStyle === 'ornate-gold' ? (
                <g fill="none" stroke="#ffebad" strokeWidth="1.5" opacity="0.85">
                  <rect x="385" y="146" width="180" height="138" rx="2" />
                  <circle cx="388" cy="149" r="2.8" fill="#ffe394" />
                  <circle cx="562" cy="149" r="2.8" fill="#ffe394" />
                  <circle cx="388" cy="281" r="2.8" fill="#ffe394" />
                  <circle cx="562" cy="281" r="2.8" fill="#ffe394" />
                </g>
              ) : (
                <g stroke="#3d2210" strokeWidth="1.5" opacity="0.65">
                  <line x1="379" y1="140" x2="393" y2="154" />
                  <line x1="571" y1="140" x2="557" y2="154" />
                  <line x1="379" y1="290" x2="393" y2="276" />
                  <line x1="571" y1="290" x2="557" y2="276" />
                </g>
              )}
              {/* Inner Mat */}
              <rect x="393" y="154" width="164" height="122" fill={frameMatHex} />
              {/* Artwork from Days 4–5 */}
              <g transform="translate(403, 161) scale(0.45)">
                <ChristmasPhotoArt
                  template={progress.day4?.template ?? 'cabin'}
                  strokes={progress.day4?.strokes ?? []}
                  regionColors={progress.day5?.regionColors}
                  colorStrokes={progress.day5?.colorStrokes}
                />
              </g>
            </g>
          )}
        </g>

        {/* Side Table (Right of Fireplace) */}
        <g id="side-table">
          <rect x="675" y="575" width="125" height="16" rx="4" fill="#7c4f31" />
          <rect x="692" y="591" width="14" height="75" fill="#5c3822" />
          <rect x="769" y="591" width="14" height="75" fill="#5c3822" />

          {/* Day 4–5 Evolution: Sketchpad / colored artwork resting on side table until framed on Day 6 */}
          {(hasDay4 || hasDay5) && !hasDay6 && (
            <g id="day4-table-sketch" transform="translate(696, 514)">
              {/* Mini wooden tabletop easel / sketchpad backing */}
              <rect
                x="-3"
                y="-3"
                width="86"
                height="66"
                rx="3"
                fill="#e5dac3"
                stroke="#8b6f47"
                strokeWidth="2"
              />
              <g transform="scale(0.25)">
                <ChristmasPhotoArt
                  template={progress.day4?.template ?? 'cabin'}
                  strokes={progress.day4?.strokes ?? []}
                  regionColors={hasDay5 ? progress.day5?.regionColors : undefined}
                  colorStrokes={hasDay5 ? progress.day5?.colorStrokes : undefined}
                />
              </g>
              {hasDay5 ? (
                /* Tiny holiday paint palette on the table */
                <g transform="translate(64, 54)">
                  <ellipse cx="14" cy="7" rx="14" ry="7" fill="#d9b482" stroke="#7c4f31" strokeWidth="1" />
                  <circle cx="8" cy="6" r="2.2" fill="#c92a35" />
                  <circle cx="14" cy="4" r="2.2" fill="#215c3e" />
                  <circle cx="20" cy="7" r="2.2" fill="#f0c674" />
                </g>
              ) : (
                /* Tiny charcoal pencil resting on table */
                <line x1="68" y1="62" x2="96" y2="57" stroke="#23201c" strokeWidth="3" strokeLinecap="round" />
              )}
            </g>
          )}

          {/* Day 9 Evolution: Freshly Baked Gingerbread Panels Cooling on Side Table */}
          {hasDay9 && !hasDay10 && (
            <g id="day9-gingerbread-tray" transform="translate(686, 548)">
              {/* Cooling baking sheet */}
              <rect x="0" y="18" width="102" height="9" rx="3" fill="#4a5568" stroke="#94a3b8" strokeWidth="1.2" />
              {/* Stacked gingerbread panels */}
              <polygon points="24,4 8,18 40,18" fill={gingerBakedColor} stroke="#522c12" strokeWidth="1.2" />
              <rect x="44" y="8" width="24" height="10" rx="1.5" fill={gingerBakedColor} stroke="#522c12" strokeWidth="1.2" />
              <rect x="72" y="10" width="22" height="8" rx="1.5" fill={gingerBakedColor} stroke="#522c12" strokeWidth="1.2" />
              {/* Subtle warm baking steam */}
              <path d="M 28 2 Q 24 -6 30 -12" fill="none" stroke="#ffe7c2" strokeWidth="1.8" strokeLinecap="round" className="steam-rise" />
              <path d="M 68 4 Q 64 -4 70 -10" fill="none" stroke="#ffe7c2" strokeWidth="1.8" strokeLinecap="round" className="steam-rise" style={{ animationDelay: '0.7s' }} />
            </g>
          )}

          {/* Day 10 Evolution: Completed Gingerbread House on Side Table (until Day 15 glowing display) */}
          {hasDay10 && !hasDay15 && (
            <g id="day10-gingerbread-house" transform="translate(688, 502) scale(0.5)">
              <GingerbreadHouseArt
                spiceBlend={progress.day9?.spiceBlend}
                icingColor={progress.day10?.icingColor}
                candyTheme={progress.day10?.candyTheme}
                stage={4}
                glowingWindows={false}
              />
            </g>
          )}

          {/* Day 15 Evolution: Glowing Gingerbread House on Centerpiece Table */}
          {hasDay15 && progress.day15?.placement === 'centerpiece-table' && (
            <g id="day15-table-gingerbread">
              <rect x="682" y="572" width="111" height="7" rx="2" fill="#8f242c" stroke="#f0c674" strokeWidth="1.2" />
              <circle cx="738" cy="540" r="74" fill="url(#wpCandyGlow)" className="fire-glow-pulse" />
              <g transform="translate(684, 496) scale(0.54)">
                <GingerbreadHouseArt
                  spiceBlend={progress.day9?.spiceBlend}
                  icingColor={progress.day10?.icingColor}
                  candyTheme={progress.day10?.candyTheme}
                  stage={4}
                  glowingWindows
                />
              </g>
            </g>
          )}

          {/* Day 16 Evolution: Permanent Plate of Star & Tree Cookies on Table by the Hearth */}
          {hasDay16 && (
            <g id="day16-cookie-plate" transform="translate(684, 558)">
              {/* Ceramic Holiday Plate */}
              <ellipse cx="32" cy="14" rx="30" ry="7" fill="#f8fafc" stroke="#c92a35" strokeWidth="2" />
              <ellipse cx="32" cy="13" rx="22" ry="4.5" fill="none" stroke="#f0c674" strokeWidth="1" />
              {/* Mini Star Cookie */}
              <polygon
                points="20,1 23,7 30,7 24,11 26,17 20,13 14,17 16,11 10,7 17,7"
                fill={progress.day16?.starFrosting ?? '#f5c542'}
                stroke="#a87439"
                strokeWidth="1.2"
              />
              {/* Mini Tree Cookie */}
              <polygon
                points="44,0 35,14 53,14"
                fill={progress.day16?.treeFrosting ?? '#2d8659'}
                stroke="#a87439"
                strokeWidth="1.2"
              />
              {/* Tiny Sprinkles */}
              <circle cx="20" cy="8" r="1.2" fill="#ef4444" />
              <circle cx="44" cy="8" r="1.2" fill="#f0c674" />
              <circle cx="41" cy="11" r="1.1" fill="#ef4444" />
            </g>
          )}

          {/* Day 23 Evolution: Glass of Milk Next to the Day 16 Cookies by the Hearth */}
          {hasDay23 && (
            <g id="day23-milk-glass" transform="translate(758, 535) scale(0.35)">
              {progress.day23?.hasCandyStraw !== false && (
                <>
                  <line x1="48" y1="-22" x2="30" y2="108" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
                  <line
                    x1="48"
                    y1="-22"
                    x2="30"
                    y2="108"
                    stroke="#d63638"
                    strokeWidth="8"
                    strokeDasharray="7 7"
                    strokeLinecap="round"
                  />
                </>
              )}
              <polygon
                points="4,8 68,8 60,114 12,114"
                fill="rgba(226, 232, 240, 0.22)"
                stroke="rgba(255, 255, 255, 0.72)"
                strokeWidth="3.5"
              />
              <polygon
                points="8,32 64,32 58,112 14,112"
                fill={
                  progress.day23?.milkType === 'chocolate-milk'
                    ? '#8b5a3c'
                    : progress.day23?.milkType === 'warm-vanilla'
                      ? '#fcf3dc'
                      : '#f8fafc'
                }
              />
              <ellipse cx="36" cy="32" rx="28" ry="6" fill="#ffffff" opacity="0.7" />
              <ellipse cx="36" cy="8" rx="32" ry="6.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="3" />
            </g>
          )}
        </g>

        {/* Tree Rug / Corner Stand (Far Left) */}
        <ellipse cx="165" cy="705" rx="125" ry="34" fill="#7c262d" stroke="#d9b166" strokeWidth="4" />

        {/* Day 2 Evolution: Assembled Christmas Tree in Living Room */}
        {hasDay2 && (
          <g id="day2-indoor-tree">
            {/* Trunk */}
            <rect x="153" y="590" width="24" height="105" rx="4" fill="#5c3a21" />

            {/* Chosen Stand */}
            {standStyle === 'classic-red' && (
              <g>
                <path d="M 130 704 L 143 670 L 187 670 L 200 704 Z" fill="#a8262d" />
                <rect x="139" y="666" width="52" height="7" rx="2" fill="#e6b95c" />
              </g>
            )}
            {standStyle === 'wooden-barrel' && (
              <g>
                <path d="M 132 704 L 138 666 L 192 666 L 198 704 Z" fill="#7c4f31" />
                <line x1="136" y1="678" x2="194" y2="678" stroke="#3c2a1e" strokeWidth="4" />
                <line x1="134" y1="693" x2="196" y2="693" stroke="#3c2a1e" strokeWidth="4" />
              </g>
            )}
            {standStyle === 'gold-pot' && (
              <g>
                <path d="M 134 704 L 128 668 L 202 668 L 196 704 Z" fill="#cfa047" />
                <rect x="124" y="663" width="82" height="8" rx="3" fill="#f0c674" />
              </g>
            )}

            {/* Multi-tiered Evergreen Foliage */}
            <g transform={`translate(165 668) scale(1 ${treeScaleY}) translate(-165 -668)`}>
              <polygon points="165,470 46,668 284,668" fill={treeColors.dark} />
              <polygon points="165,380 68,575 262,575" fill={treeColors.mid} />
              <polygon points="165,295 92,472 238,472" fill={treeColors.light} />
              <polygon points="165,220 116,356 214,356" fill={treeColors.mid} />

              {/* Day 3 Evolution: Garland & Ornaments on Indoor Tree */}
              {hasDay3 && (
                <g id="day3-tree-decorations">
                  {garlandStyle === 'gold-tinsel' && (
                    <g fill="none" stroke="#f0c674" strokeWidth="6" strokeDasharray="8 5" opacity="0.9">
                      <path d="M 124 335 Q 165 362 206 338" />
                      <path d="M 98 446 Q 165 480 232 450" />
                      <path d="M 74 550 Q 165 592 256 554" />
                      <path d="M 56 644 Q 165 676 274 646" />
                    </g>
                  )}
                  {garlandStyle === 'red-ribbon' && (
                    <g fill="none" stroke="#c92a35" strokeWidth="7" strokeLinecap="round" opacity="0.92">
                      <path d="M 124 335 Q 165 364 206 338" />
                      <path d="M 98 446 Q 165 482 232 450" />
                      <path d="M 74 550 Q 165 594 256 554" />
                      <path d="M 56 644 Q 165 678 274 646" />
                    </g>
                  )}
                  {garlandStyle === 'warm-lights' && (
                    <g>
                      <g fill="none" stroke="#2c4536" strokeWidth="2" opacity="0.65">
                        <path d="M 124 335 Q 165 362 206 338" />
                        <path d="M 98 446 Q 165 480 232 450" />
                        <path d="M 74 550 Q 165 592 256 554" />
                        <path d="M 56 644 Q 165 676 274 646" />
                      </g>
                      {[
                        [134, 342], [156, 349], [178, 349], [198, 342],
                        [112, 454], [140, 464], [168, 467], [196, 463], [222, 455],
                        [90, 560], [124, 572], [165, 576], [206, 572], [240, 561],
                        [74, 650], [116, 661], [165, 664], [214, 661], [256, 650],
                      ].map(([lx, ly], idx) => (
                        <circle
                          key={`${lx}-${ly}`}
                          cx={lx}
                          cy={ly}
                          r="4.5"
                          fill={idx % 2 === 0 ? '#ffe79e' : '#ffbe55'}
                          className={idx % 2 === 0 ? 'twinkle-a' : 'twinkle-b'}
                        />
                      ))}
                    </g>
                  )}

                  {ornaments.map((orn) => {
                    const wx = 165 + orn.nx * 119;
                    const wy = 220 + orn.ny * 448;
                    return (
                      <g key={orn.id} transform={`translate(${wx}, ${wy})`}>
                        {orn.kind === 'bauble' && (
                          <>
                            <rect x="-3" y="-13" width="6" height="4" fill="#e6c373" />
                            <circle r="9.5" fill={orn.color} stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
                            <circle cx="-3" cy="-3" r="2.6" fill="rgba(255,255,255,0.55)" />
                          </>
                        )}
                        {orn.kind === 'bell' && (
                          <>
                            <path d="M -7 7 L -4 -7 Q 0 -11 4 -7 L 7 7 Z" fill="#f0c674" stroke="#9e7424" strokeWidth="1.5" />
                            <circle cx="0" cy="8.5" r="2.5" fill="#b4832b" />
                          </>
                        )}
                        {orn.kind === 'candy-cane' && (
                          <>
                            <path
                              d="M -3 10 L -3 -4 A 5 5 0 0 1 7 -4"
                              fill="none"
                              stroke="#ffffff"
                              strokeWidth="4.2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M -3 10 L -3 -4 A 5 5 0 0 1 7 -4"
                              fill="none"
                              stroke="#d63638"
                              strokeWidth="4.2"
                              strokeDasharray="3.5 3.5"
                              strokeLinecap="round"
                            />
                          </>
                        )}
                      </g>
                    );
                  })}
                </g>
              )}

              {/* Day 24 Finale Evolution: Glowing Tree Topper Star */}
              {hasDay24 && (
                <g id="day24-tree-star" transform="translate(165, 210)">
                  <circle r="72" fill="url(#wpStarGlow)" className="fire-glow-pulse" />
                  {starStyle === 'bethlehem-burst' ? (
                    <g>
                      <polygon
                        points="0,-32 7,-9 30,0 7,9 0,32 -7,9 -30,0 -7,-9"
                        fill={starColors.fill}
                        stroke={starColors.stroke}
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />
                      <polygon
                        points="0,-18 4.5,-4.5 18,0 4.5,4.5 0,18 -4.5,4.5 -18,0 -4.5,-4.5"
                        fill="#ffffff"
                        opacity="0.88"
                        transform="rotate(45)"
                      />
                    </g>
                  ) : (
                    <g>
                      <polygon
                        points="0,-30 8,-9 30,-8 13,6 18,27 0,14 -18,27 -13,6 -30,-8 -8,-9"
                        fill={starColors.fill}
                        stroke={starColors.stroke}
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />
                      {starStyle === 'crystal-silver' && (
                        <polygon points="0,-16 6,0 0,16 -6,0" fill="#ffffff" opacity="0.9" />
                      )}
                    </g>
                  )}
                  <text x="-44" y="-20" fill={starColors.fill} fontSize="14" className="twinkle-a">✦</text>
                  <text x="36" y="-22" fill={starColors.fill} fontSize="14" className="twinkle-b">✦</text>
                  <text x="44" y="16" fill={starColors.fill} fontSize="12" className="twinkle-a">✦</text>
                </g>
              )}
            </g>
          </g>
        )}
        {/* Day 17 Evolution: Wrapped Gift Boxes Beneath Christmas Tree */}
        {hasDay17 && (
          <g id="day17-tree-gifts">
            {/* Left Large Hero Gift (User's Paper & Ribbon) */}
            <g transform="translate(64, 666)">
              <rect x="0" y="8" width="66" height="44" rx="3" fill={giftPaperFill} stroke="#1a120d" strokeWidth="1.5" />
              <rect x="-3" y="2" width="72" height="11" rx="2" fill={giftPaperFill} stroke="#1a120d" strokeWidth="1.5" />
              <rect x="28" y="2" width="10" height="50" fill={giftRibbonColor} />
              <rect x="0" y="25" width="66" height="8" fill={giftRibbonColor} />
              <ellipse cx="26" cy="-1" rx="9" ry="5" fill={giftRibbonColor} transform="rotate(-18 26 -1)" />
              <ellipse cx="40" cy="-1" rx="9" ry="5" fill={giftRibbonColor} transform="rotate(18 40 -1)" />
            </g>

            {/* Right Tall Companion Gift */}
            <g transform="translate(208, 662)">
              <rect x="0" y="8" width="54" height="48" rx="3" fill="#1f5c3e" stroke="#133d28" strokeWidth="1.5" />
              <rect x="-2" y="2" width="58" height="10" rx="2" fill="#2c7a54" stroke="#133d28" strokeWidth="1.5" />
              <rect x="22" y="2" width="9" height="54" fill="#f0c674" />
              <ellipse cx="21" cy="-1" rx="8" ry="4.5" fill="#f0c674" transform="rotate(-16 21 -1)" />
              <ellipse cx="32" cy="-1" rx="8" ry="4.5" fill="#f0c674" transform="rotate(16 32 -1)" />
            </g>

            {/* Front Center Small Gift */}
            <g transform="translate(142, 684)">
              <rect x="0" y="6" width="52" height="32" rx="3" fill="#1e3557" stroke="#12223a" strokeWidth="1.5" />
              <rect x="-2" y="1" width="56" height="9" rx="2" fill="#2b4a78" stroke="#12223a" strokeWidth="1.5" />
              <rect x="22" y="1" width="8" height="37" fill="#e03131" />
              <ellipse cx="21" cy="-2" rx="7" ry="4" fill="#e03131" transform="rotate(-15 21 -2)" />
              <ellipse cx="31" cy="-2" rx="7" ry="4" fill="#e03131" transform="rotate(15 31 -2)" />
            </g>
          </g>
        )}

        {/* Day 7 Evolution: Warm Ambient Room Glow Cast Across Cabin */}
        {hasDay7 && (
          <rect
            x="0"
            y="0"
            width="1600"
            height="900"
            fill="url(#wpHearthGlow)"
            className="fire-glow-pulse"
            style={{ pointerEvents: 'none' }}
          />
        )}

        {/* Day 8 Evolution: Gentle Ambient Snow Drift Across Calendar */}
        {hasDay8 && (
          <g id="day8-ambient-snow" fill="#ffffff" style={{ pointerEvents: 'none' }}>
            {Array.from({ length: ambientFlakeCount }, (_, i) => {
              const cx = 40 + ((i * 137 + 29) % 1520);
              const r = 1.6 + (i % 3) * 0.85;
              const dur = (8.5 + (i % 5) * 1.4).toFixed(2);
              const delay = (-((i * 0.91) % 9)).toFixed(2);
              return (
                <circle
                  key={`as-${i}`}
                  cx={cx}
                  cy={-12}
                  r={r}
                  opacity={0.22 + (i % 3) * 0.09}
                  className="snow-flake-ambient"
                  style={{
                    animationDuration: `${dur}s`,
                    animationDelay: `${delay}s`,
                  }}
                />
              );
            })}
          </g>
        )}
      </svg>
    </div>
  );
}
