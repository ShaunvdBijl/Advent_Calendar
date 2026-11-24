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

export interface CalendarProgress {
  completedDays: number[];
  day1?: Day1State;
  day2?: Day2State;
}
