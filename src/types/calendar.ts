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

export interface CalendarProgress {
  completedDays: number[];
  day1?: Day1State;
  day2?: Day2State;
  day3?: Day3State;
}
