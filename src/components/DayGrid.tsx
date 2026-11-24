import { ADVENT_DAYS } from '../data/days';
import type { CalendarProgress, DayMeta } from '../types/calendar';
import type { ScheduleSnapshot } from '../utils/adventSchedule';

interface DayGridProps {
  progress: CalendarProgress;
  schedule: ScheduleSnapshot | null;
  onSelectDay: (day: DayMeta) => void;
}

export function DayGrid({ progress, schedule, onSelectDay }: DayGridProps) {
  return (
    <div className="day-grid" role="list" aria-label="Advent calendar days 1 through 24">
      {ADVENT_DAYS.map((dayMeta) => {
        const isCompleted = progress.completedDays.includes(dayMeta.day);
        const isDateUnlocked = schedule ? schedule.unlockedDays.has(dayMeta.day) : false;
        const previousDone = dayMeta.day === 1 || progress.completedDays.includes(dayMeta.day - 1);
        const isClickable =
          dayMeta.implemented &&
          (isCompleted || (isDateUnlocked && previousDone));
        const unlockLabel = schedule?.unlockLabels[dayMeta.day];
        const lockedByDate = !isDateUnlocked && !isCompleted;

        return (
          <button
            key={dayMeta.day}
            type="button"
            className={`day-tile${isCompleted ? ' completed' : ''}${lockedByDate ? ' date-locked' : ''}`}
            disabled={!isClickable}
            onClick={() => onSelectDay(dayMeta)}
            title={
              lockedByDate && unlockLabel
                ? `Unlocks ${unlockLabel}`
                : !isClickable && !previousDone
                  ? `Complete Day ${dayMeta.day - 1} first`
                  : dayMeta.title
            }
            aria-label={`Day ${dayMeta.day}: ${dayMeta.title}${
              isCompleted
                ? ' (completed)'
                : lockedByDate && unlockLabel
                  ? ` (unlocks ${unlockLabel})`
                  : ''
            }`}
          >
            {isCompleted && (
              <span className="day-badge done" aria-hidden="true">
                ✓
              </span>
            )}
            {lockedByDate && (
              <span className="day-badge lock" aria-hidden="true">
                Dec {dayMeta.day}
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
