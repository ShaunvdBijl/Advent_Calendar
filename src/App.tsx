import { useEffect, useState } from 'react';
import { DayGrid } from './components/DayGrid';
import { DayModal } from './components/DayModal';
import { EvolvingWallpaper } from './components/EvolvingWallpaper';
import { Day01ChopTree } from './days/Day01ChopTree';
import { Day02BuildTree } from './days/Day02BuildTree';
import { Day03DecorateTree } from './days/Day03DecorateTree';
import { Day04DrawPhoto } from './days/Day04DrawPhoto';
import { Day05ColorPhoto } from './days/Day05ColorPhoto';
import { Day06FramePhoto } from './days/Day06FramePhoto';
import { Day07Fireplace } from './days/Day07Fireplace';
import { Day08SnowMachine } from './days/Day08SnowMachine';
import { Day09PrepGingerbread } from './days/Day09PrepGingerbread';
import { Day10BuildGingerbreadHouse } from './days/Day10BuildGingerbreadHouse';
import { Day11BuildSnowman } from './days/Day11BuildSnowman';
import type {
  CalendarProgress,
  Day1State,
  Day2State,
  Day3State,
  Day4State,
  Day5State,
  Day6State,
  Day7State,
  Day8State,
  Day9State,
  Day10State,
  Day11State,
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

  const completeDay5 = (day5State: Day5State) => {
    setProgress((prev) => ({
      ...prev,
      completedDays: prev.completedDays.includes(5)
        ? prev.completedDays
        : [...prev.completedDays, 5].sort((a, b) => a - b),
      day5: day5State,
    }));
    setActiveDay(null);
  };

  const completeDay6 = (day6State: Day6State) => {
    setProgress((prev) => ({
      ...prev,
      completedDays: prev.completedDays.includes(6)
        ? prev.completedDays
        : [...prev.completedDays, 6].sort((a, b) => a - b),
      day6: day6State,
    }));
    setActiveDay(null);
  };

  const completeDay7 = (day7State: Day7State) => {
    setProgress((prev) => ({
      ...prev,
      completedDays: prev.completedDays.includes(7)
        ? prev.completedDays
        : [...prev.completedDays, 7].sort((a, b) => a - b),
      day7: day7State,
    }));
    setActiveDay(null);
  };

  const completeDay8 = (day8State: Day8State) => {
    setProgress((prev) => ({
      ...prev,
      completedDays: prev.completedDays.includes(8)
        ? prev.completedDays
        : [...prev.completedDays, 8].sort((a, b) => a - b),
      day8: day8State,
    }));
    setActiveDay(null);
  };

  const completeDay9 = (day9State: Day9State) => {
    setProgress((prev) => ({
      ...prev,
      completedDays: prev.completedDays.includes(9)
        ? prev.completedDays
        : [...prev.completedDays, 9].sort((a, b) => a - b),
      day9: day9State,
    }));
    setActiveDay(null);
  };

  const completeDay10 = (day10State: Day10State) => {
    setProgress((prev) => ({
      ...prev,
      completedDays: prev.completedDays.includes(10)
        ? prev.completedDays
        : [...prev.completedDays, 10].sort((a, b) => a - b),
      day10: day10State,
    }));
    setActiveDay(null);
  };

  const completeDay11 = (day11State: Day11State) => {
    setProgress((prev) => ({
      ...prev,
      completedDays: prev.completedDays.includes(11)
        ? prev.completedDays
        : [...prev.completedDays, 11].sort((a, b) => a - b),
      day11: day11State,
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
        ) : activeDay?.day === 5 ? (
          <Day05ColorPhoto
            day4State={progress.day4}
            existingState={progress.day5}
            onComplete={completeDay5}
          />
        ) : activeDay?.day === 6 ? (
          <Day06FramePhoto
            day4State={progress.day4}
            day5State={progress.day5}
            existingState={progress.day6}
            onComplete={completeDay6}
          />
        ) : activeDay?.day === 7 ? (
          <Day07Fireplace
            existingState={progress.day7}
            onComplete={completeDay7}
          />
        ) : activeDay?.day === 8 ? (
          <Day08SnowMachine
            existingState={progress.day8}
            onComplete={completeDay8}
          />
        ) : activeDay?.day === 9 ? (
          <Day09PrepGingerbread
            existingState={progress.day9}
            onComplete={completeDay9}
          />
        ) : activeDay?.day === 10 ? (
          <Day10BuildGingerbreadHouse
            spiceBlend={progress.day9?.spiceBlend}
            existingState={progress.day10}
            onComplete={completeDay10}
          />
        ) : activeDay?.day === 11 ? (
          <Day11BuildSnowman
            existingState={progress.day11}
            onComplete={completeDay11}
          />
        ) : (
          activeDay && <p>{activeDay.description}</p>
        )}
      </DayModal>
    </div>
  );
}

export default App;
