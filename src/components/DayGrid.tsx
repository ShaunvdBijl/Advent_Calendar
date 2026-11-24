import { ADVENT_DAYS } from '../data/days';
import type { CalendarProgress, DayMeta } from '../types/calendar';

interface DayGridProps {
  progress: CalendarProgress;
  unlockAll: boolean;
  onSelectDay: (day: DayMeta) => void;
}

export function DayGrid({ progress, unlockAll, onSelectDay }: DayGridProps) {
  return (
    <div className="day-grid" role="list" aria-label="Advent calendar days 1 through 24">
      {ADVENT_DAYS.map((dayMeta) => {
        const isCompleted = progress.completedDays.includes(dayMeta.day);
        const previousDone = dayMeta.day === 1 || progress.completedDays.includes(dayMeta.day - 1);
        const isClickable = dayMeta.implemented && (unlockAll || previousDone || isCompleted);

        return (
          <button
            key={dayMeta.day}
            type="button"
            className={`day-tile${isCompleted ? ' completed' : ''}`}
            disabled={!isClickable}
            onClick={() => onSelectDay(dayMeta)}
            aria-label={`Day ${dayMeta.day}: ${dayMeta.title}${isCompleted ? ' (completed)' : ''}`}
          >
            {isCompleted && (
              <span className="day-badge done" aria-hidden="true">
                ✓
              </span>
            )}
            {!dayMeta.implemented && (
              <span className="day-badge soon" aria-hidden="true">
                Soon
              </span>
            )}
            <span className="day-number">{dayMeta.day}</span>
            <span className="day-title">{dayMeta.title}</span>
          </button>
        );
      })}
    </div>
  );
}
