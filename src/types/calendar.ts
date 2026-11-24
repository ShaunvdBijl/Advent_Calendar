export interface DayMeta {
  day: number;
  title: string;
  description: string;
  implemented: boolean;
}

export interface Day1State {
  choppedAt: string;
  treeVariant: 'spruce' | 'pine' | 'fir';
}

export interface Day2State {
  builtAt: string;
  standStyle: 'classic-red' | 'wooden-barrel' | 'gold-pot';
  heightScale: 'cozy' | 'tall';
}

export interface TreeOrnament {
  id: string;
  /** Normalized horizontal offset from tree center (-1..1 relative to max half-width) */
  nx: number;
  /** Normalized vertical position from tree apex (0) to base (1) */
  ny: number;
  color: string;
  kind: 'bauble' | 'candy-cane' | 'bell';
}

export interface Day3State {
  decoratedAt: string;
  garlandStyle: 'none' | 'gold-tinsel' | 'warm-lights' | 'red-ribbon';
  ornaments: TreeOrnament[];
}

export type PhotoTemplate = 'cabin' | 'wreath' | 'sleigh' | 'blank';

export interface PhotoStroke {
  id: string;
  points: string;
  width: number;
  color: string;
}

export interface Day4State {
  sketchedAt: string;
  template: PhotoTemplate;
  strokes: PhotoStroke[];
}

export interface Day5State {
  coloredAt: string;
  regionColors: Record<string, string>;
  colorStrokes: PhotoStroke[];
}

export interface Day6State {
  framedAt: string;
  frameStyle: 'rustic-wood' | 'ornate-gold';
  matColor: 'cream' | 'forest' | 'crimson';
}

export interface Day7State {
  litAt: string;
  intensity: 'cozy' | 'roaring';
}

export interface Day8State {
  startedAt: string;
  intensity: 'gentle' | 'flurry' | 'blizzard';
}

export interface Day9State {
  preppedAt: string;
  spiceBlend: 'classic-ginger' | 'dark-molasses' | 'honey-cinnamon';
}

export interface Day10State {
  builtAt: string;
  icingColor: 'snow-white' | 'mint-cream' | 'pink-frost';
  candyTheme: 'peppermint' | 'gumdrop-rainbow' | 'gold-dragees';
}

export interface Day11State {
  builtAt: string;
  stickArms: 'waving' | 'downward';
}

export interface Day12State {
  dressedAt: string;
  scarfColor: string;
  hatBandColor: string;
}

export interface CalendarProgress {
  completedDays: number[];
  day1?: Day1State;
  day2?: Day2State;
  day3?: Day3State;
  day4?: Day4State;
  day5?: Day5State;
  day6?: Day6State;
  day7?: Day7State;
  day8?: Day8State;
  day9?: Day9State;
  day10?: Day10State;
  day11?: Day11State;
  day12?: Day12State;
}
