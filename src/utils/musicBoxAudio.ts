import type { Day20State } from '../types/calendar';

type NoteStep = { freq: number; beats: number };

const MELODIES: Record<Day20State['melody'], { tempoMs: number; notes: NoteStep[] }> = {
  'jingle-chimes': {
    tempoMs: 360,
    notes: [
      { freq: 659.25, beats: 1 }, // E5
      { freq: 659.25, beats: 1 }, // E5
      { freq: 659.25, beats: 2 }, // E5
      { freq: 659.25, beats: 1 }, // E5
      { freq: 659.25, beats: 1 }, // E5
      { freq: 659.25, beats: 2 }, // E5
      { freq: 659.25, beats: 1 }, // E5
      { freq: 783.99, beats: 1 }, // G5
      { freq: 523.25, beats: 1.5 }, // C5
      { freq: 587.33, beats: 0.5 }, // D5
      { freq: 659.25, beats: 3 }, // E5
      { freq: 0, beats: 1 },
    ],
  },
  'silent-chimes': {
    tempoMs: 460,
    notes: [
      { freq: 587.33, beats: 1.5 }, // D5
      { freq: 659.25, beats: 0.5 }, // E5
      { freq: 587.33, beats: 1 }, // D5
      { freq: 493.88, beats: 3 }, // B4
      { freq: 587.33, beats: 1.5 }, // D5
      { freq: 659.25, beats: 0.5 }, // E5
      { freq: 587.33, beats: 1 }, // D5
      { freq: 493.88, beats: 3 }, // B4
      { freq: 880.0, beats: 2 }, // A5
      { freq: 880.0, beats: 1 }, // A5
      { freq: 739.99, beats: 3 }, // F#5
      { freq: 0, beats: 1 },
    ],
  },
};

let audioCtx: AudioContext | null = null;
let timerId: number | null = null;

function playChimeNote(ctx: AudioContext, freq: number) {
  if (freq <= 0) return;
  const now = ctx.currentTime;

  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, now);

  // Subtle brass music-box overtone
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(freq * 2, now);

  const overtoneGain = ctx.createGain();
  overtoneGain.gain.setValueAtTime(0.035, now);
  overtoneGain.gain.exponentialRampToValueAtTime(0.0008, now + 0.35);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.11, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.05);

  osc1.connect(gain);
  osc2.connect(overtoneGain);
  overtoneGain.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 1.1);
  osc2.stop(now + 1.1);
}

export function stopMusicBox() {
  if (timerId !== null) {
    window.clearTimeout(timerId);
    timerId = null;
  }
}

export function startMusicBox(melody: Day20State['melody']) {
  stopMusicBox();
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return;

  if (!audioCtx) {
    audioCtx = new AudioCtx();
  }
  if (audioCtx.state === 'suspended') {
    void audioCtx.resume();
  }

  const song = MELODIES[melody];
  let stepIndex = 0;

  const scheduleNext = () => {
    if (!audioCtx) return;
    const step = song.notes[stepIndex % song.notes.length];
    playChimeNote(audioCtx, step.freq);
    stepIndex += 1;
    timerId = window.setTimeout(scheduleNext, step.beats * song.tempoMs);
  };

  scheduleNext();
}
