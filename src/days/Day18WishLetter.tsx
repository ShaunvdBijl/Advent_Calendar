import { useState } from 'react';
import type { Day18State } from '../types/calendar';

interface Day18WishLetterProps {
  existingState?: Day18State;
  onComplete: (state: Day18State) => void;
}

const SEAL_COLORS: Record<Day18State['sealColor'], { label: string; hex: string }> = {
  crimson: { label: 'Crimson Wax', hex: '#b82830' },
  gold: { label: 'Royal Gold', hex: '#d4a33c' },
  pine: { label: 'Pine Wax', hex: '#1f5c3e' },
};

export function Day18WishLetter({ existingState, onComplete }: Day18WishLetterProps) {
  const [recipient, setRecipient] = useState<string>(existingState?.recipient ?? 'Dear Santa,');
  const [message, setMessage] = useState<string>(existingState?.message ?? '');
  const [sealColor, setSealColor] = useState<Day18State['sealColor']>(
    existingState?.sealColor ?? 'crimson',
  );
  const [phase, setPhase] = useState<'write' | 'folded' | 'read'>(
    existingState ? 'read' : 'write',
  );

  const sealHex = SEAL_COLORS[sealColor].hex;
  const canFold = message.trim().length >= 3;

  const handleSave = () => {
    onComplete({
      writtenAt: new Date().toISOString(),
      recipient: recipient.trim() || 'Dear Santa,',
      message: message.trim(),
      sealColor,
    });
  };

  if (phase === 'read' && existingState) {
    return (
      <div className="day9-container">
        <p className="day-intro">
          Your sealed holiday wish letter tucked on the fireplace mantle:
        </p>

        <div className="parchment-card">
          <p className="parchment-greeting">{existingState.recipient}</p>
          <p className="parchment-body">{existingState.message}</p>
          <div className="parchment-footer">
            <span className="wax-seal-dot" style={{ backgroundColor: SEAL_COLORS[existingState.sealColor].hex }} />
            <span>Tucked on the mantelpiece</span>
          </div>
        </div>

        <div className="day1-done-actions">
          <button type="button" className="toolbar-btn" onClick={() => setPhase('write')}>
            Edit Wish Letter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="day9-container">
      <p className="day-intro">
        Write a short holiday message or wish list, fold it into a wax-sealed envelope, and tuck it
        onto the mantelpiece (clickable anytime to re-read!).
      </p>

      {phase === 'write' ? (
        <>
          <div className="variant-picker" role="group" aria-label="Choose wax seal color">
            {(Object.keys(SEAL_COLORS) as Day18State['sealColor'][]).map((key) => (
              <button
                key={key}
                type="button"
                className={`variant-btn${sealColor === key ? ' active' : ''}`}
                onClick={() => setSealColor(key)}
              >
                {SEAL_COLORS[key].label}
              </button>
            ))}
          </div>

          <div className="letter-form">
            <label className="letter-label">
              Greeting
              <input
                type="text"
                className="letter-input"
                maxLength={40}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Dear Santa,"
              />
            </label>
            <label className="letter-label">
              Your Holiday Message or Wish List
              <textarea
                className="letter-textarea"
                rows={4}
                maxLength={360}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Wishing for warm cocoa, snowy mornings, and joyful moments..."
                autoFocus
              />
            </label>
          </div>

          <div className="day1-controls">
            <button
              type="button"
              className="primary-btn"
              disabled={!canFold}
              onClick={() => setPhase('folded')}
            >
              Fold into Envelope &amp; Stamp Wax Seal
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="day2-scene-wrap">
            <svg
              viewBox="0 0 420 220"
              className="day2-svg"
              role="img"
              aria-label="Folded holiday envelope stamped with wax seal"
            >
              <rect width="420" height="220" rx="12" fill="#2c1d13" />
              {/* Mantle surface */}
              <rect x="0" y="168" width="420" height="52" fill="#7c4f31" />

              {/* Folded Envelope */}
              <g transform="translate(95, 36)" className="tree-part-enter">
                <rect x="6" y="8" width="230" height="142" rx="6" fill="rgba(0,0,0,0.35)" />
                <rect x="0" y="0" width="230" height="142" rx="6" fill="#f5ead6" stroke="#c8b28e" strokeWidth="2.5" />
                {/* Bottom & side envelope folds */}
                <polyline points="0,142 115,74 230,142" fill="none" stroke="#d5c09e" strokeWidth="2" />
                {/* Top triangular flap */}
                <polygon points="0,0 115,82 230,0" fill="#efe0c4" stroke="#c8b28e" strokeWidth="2.5" />
                {/* Wax Seal */}
                <circle cx="115" cy="82" r="18" fill={sealHex} stroke="rgba(255,255,255,0.28)" strokeWidth="2" />
                <text x="115" y="87" textAnchor="middle" fill="#fff5e0" fontSize="14" fontWeight="700">
                  ★
                </text>
              </g>
            </svg>
          </div>

          <div className="day1-done-actions">
            <button type="button" className="primary-btn" onClick={handleSave} autoFocus>
              Tuck Envelope onto Mantlepiece
            </button>
            <button type="button" className="toolbar-btn" onClick={() => setPhase('write')}>
              Unfold &amp; Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
