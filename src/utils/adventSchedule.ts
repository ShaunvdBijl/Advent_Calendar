import type { Temporal as TemporalNamespace } from 'temporal-polyfill';

export const ADVENT_YEAR = 2026;
export const ADVENT_MONTH = 12;
export const ADVENT_TIME_ZONE = 'Africa/Johannesburg';
export const ADVENT_UNLOCK_TIME = '00:01:00';

type TemporalAPI = typeof TemporalNamespace;

declare global {
  interface Window {
    Temporal?: TemporalAPI;
  }
}

let cachedTemporal: TemporalAPI | null = null;

/**
 * Uses native Temporal when supported, otherwise conditionally loads temporal-polyfill.
 */
export async function ensureTemporal(): Promise<TemporalAPI> {
  if (cachedTemporal) return cachedTemporal;
  const nativeTemporal = (globalThis as unknown as { Temporal?: TemporalAPI }).Temporal;
  if (typeof nativeTemporal !== 'undefined') {
    cachedTemporal = nativeTemporal;
    return nativeTemporal;
  }
  const mod = await import('temporal-polyfill');
  (globalThis as unknown as { Temporal: TemporalAPI }).Temporal = mod.Temporal;
  cachedTemporal = mod.Temporal;
  return mod.Temporal;
}

export interface ScheduleSnapshot {
  unlockedDays: Set<number>;
  nextUnlockDay: number | null;
  nextUnlockCountdown: string | null;
  unlockLabels: Record<number, string>;
}

function getDayUnlockZdt(T: TemporalAPI, day: number) {
  return T.PlainDate.from({ year: ADVENT_YEAR, month: ADVENT_MONTH, day }).toZonedDateTime({
    timeZone: ADVENT_TIME_ZONE,
    plainTime: ADVENT_UNLOCK_TIME,
  });
}

export function computeScheduleSnapshot(T: TemporalAPI): ScheduleSnapshot {
  const now = T.Now.zonedDateTimeISO(ADVENT_TIME_ZONE);
  const unlockedDays = new Set<number>();
  const unlockLabels: Record<number, string> = {};
  let nextUnlockDay: number | null = null;
  let nextUnlockCountdown: string | null = null;

  for (let day = 1; day <= 24; day += 1) {
    const unlockAt = getDayUnlockZdt(T, day);
    unlockLabels[day] = `${unlockAt.toLocaleString('en-ZA', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })} SAST`;

    const isUnlocked = T.ZonedDateTime.compare(now, unlockAt) >= 0;
    if (isUnlocked) {
      unlockedDays.add(day);
    } else if (nextUnlockDay === null) {
      nextUnlockDay = day;
      const remaining = now.until(unlockAt, {
        largestUnit: 'day',
        smallestUnit: 'minute',
      });
      nextUnlockCountdown = remaining.toLocaleString('en-ZA', { style: 'short' });
    }
  }

  return {
    unlockedDays,
    nextUnlockDay,
    nextUnlockCountdown,
    unlockLabels,
  };
}
