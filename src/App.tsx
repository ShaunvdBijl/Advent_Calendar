import { useEffect, useState } from 'react';
import { DayGrid } from './components/DayGrid';
import { DayModal } from './components/DayModal';
import { EvolvingWallpaper } from './components/EvolvingWallpaper';
import { Day01ChopTree } from './days/Day01ChopTree';
import { Day02BuildTree } from './days/Day02BuildTree';
import { Day03DecorateTree } from './days/Day03DecorateTree';
import { Day04DrawPhoto } from './days/Day04DrawPhoto';
import type {
  CalendarProgress,
  Day1State,
  Day2State,
  Day3State,
  Day4State,
  DayMeta,
} from './types/calendar';

const STORAGE_KEY = 'advent-calendar-2026-progress';

const DEFAULT_PROGRESS: CalendarProgress = {
  completedDays: [],
};

function loadProgress(): CalendarProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as CalendarProgress;
    return Array.isArray(parsed.completedDays) ? parsed : DEFAULT_PROGRESS;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function App() {
  const [progress, setProgress] = useState<CalendarProgress>(loadProgress);
  const [activeDay, setActiveDay] = useState<DayMeta | null>(null);
  const [hideGrid, setHideGrid] = useState(false);
  const [unlockAll, setUnlockAll] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  const handleReset = () => {
    setProgress(DEFAULT_PROGRESS);
    setActiveDay(null);
  };

  const completeDay1 = (day1State: Day1State) => {
    setProgress((prev) => ({
      ...prev,
      completedDays: prev.completedDays.includes(1)
        ? prev.completedDays
        : [...prev.completedDays, 1].sort((a, b) => a - b),
      day1: day1State,
    }));
    setActiveDay(null);
  };

  const completeDay2 = (day2State: Day2State) => {
    setProgress((prev) => ({
      ...prev,
      completedDays: prev.completedDays.includes(2)
        ? prev.completedDays
        : [...prev.completedDays, 2].sort((a, b) => a - b),
      day2: day2State,
    }));
    setActiveDay(null);
  };

  const completeDay3 = (day3State: Day3State) => {
    setProgress((prev) => ({
      ...prev,
      completedDays: prev.completedDays.includes(3)
        ? prev.completedDays
        : [...prev.completedDays, 3].sort((a, b) => a - b),
      day3: day3State,
    }));
    setActiveDay(null);
  };

  const completeDay4 = (day4State: Day4State) => {
    setProgress((prev) => ({
      ...prev,
      completedDays: prev.completedDays.includes(4)
        ? prev.completedDays
        : [...prev.completedDays, 4].sort((a, b) => a - b),
      day4: day4State,
    }));
    setActiveDay(null);
  };

  return (
    <div className="app-shell">
      <EvolvingWallpaper progress={progress} />

      <header className="top-bar">
        <div className="brand">
          <h1>2026 Advent Calendar</h1>
          <span className="progress-pill">
            {progress.completedDays.length} / 24 Days Complete
          </span>
        </div>

        <div className="toolbar-actions">
          <button
            type="button"
            className="toolbar-btn"
            aria-pressed={hideGrid}
            onClick={() => setHideGrid((v) => !v)}
          >
            {hideGrid ? 'Show Calendar' : 'View Wallpaper'}
          </button>
          <button
            type="button"
            className="toolbar-btn"
            aria-pressed={unlockAll}
            onClick={() => setUnlockAll((v) => !v)}
          >
            {unlockAll ? 'Sequential Mode' : 'Unlock All'}
          </button>
          <button type="button" className="toolbar-btn" onClick={handleReset}>
            Reset Progress
          </button>
        </div>
      </header>

      <main className={`calendar-stage${hideGrid ? ' hidden-grid' : ''}`}>
        <DayGrid
          progress={progress}
          unlockAll={unlockAll}
          onSelectDay={setActiveDay}
        />
      </main>

      <DayModal day={activeDay} onClose={() => setActiveDay(null)}>
        {activeDay?.day === 1 ? (
          <Day01ChopTree existingState={progress.day1} onComplete={completeDay1} />
        ) : activeDay?.day === 2 ? (
          <Day02BuildTree
            treeVariant={progress.day1?.treeVariant}
            existingState={progress.day2}
            onComplete={completeDay2}
          />
        ) : activeDay?.day === 3 ? (
          <Day03DecorateTree
            treeVariant={progress.day1?.treeVariant}
            standStyle={progress.day2?.standStyle}
            existingState={progress.day3}
            onComplete={completeDay3}
          />
        ) : activeDay?.day === 4 ? (
          <Day04DrawPhoto
            existingState={progress.day4}
            onComplete={completeDay4}
          />
        ) : (
          activeDay && <p>{activeDay.description}</p>
        )}
      </DayModal>
    </div>
  );
}

export default App;
