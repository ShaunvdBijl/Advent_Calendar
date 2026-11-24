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

export interface CalendarProgress {
  completedDays: number[];
  day1?: Day1State;
}
