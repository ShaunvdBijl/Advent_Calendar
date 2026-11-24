import type { CalendarProgress } from '../types/calendar';

interface EvolvingWallpaperProps {
  progress: CalendarProgress;
}

export function EvolvingWallpaper({ progress }: EvolvingWallpaperProps) {
  const hasDay1 = progress.completedDays.includes(1);
  const hasDay2 = progress.completedDays.includes(2);
  const hasDay3 = progress.completedDays.includes(3);
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

  return (
    <div className="wallpaper-layer" aria-hidden="true">
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

        {/* Stone Fireplace & Mantle (Left-Center) */}
        <g id="fireplace-base">
          <rect x="330" y="340" width="290" height="310" rx="6" fill="#525866" />
          <rect x="365" y="425" width="220" height="225" rx="90" fill="#181416" />
          {/* Mantle Shelf */}
          <rect x="305" y="325" width="340" height="28" rx="5" fill="#7c4f31" />
          {/* Picture Frame Hook on Wall */}
          <circle cx="205" cy="210" r="5" fill="#c9a459" />
        </g>

        {/* Side Table (Right of Fireplace) */}
        <g id="side-table">
          <rect x="675" y="575" width="125" height="16" rx="4" fill="#7c4f31" />
          <rect x="692" y="591" width="14" height="75" fill="#5c3822" />
          <rect x="769" y="591" width="14" height="75" fill="#5c3822" />
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
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
