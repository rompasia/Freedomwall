import React, { useState, useEffect } from 'react';
import '../styles/Landing.css';

/**
 * Landing — front page / alias creation screen.
 * Props:
 *   onEnter(alias: string) — called when user clicks continue
 *   isReturning: bool      — true when user logged out to switch alias
 */
function Landing({ onEnter, isReturning = false }) {
  const [alias, setAlias] = useState('');
  const [exiting, setExiting] = useState(false);

  const handleEnter = () => {
    const name = alias.trim() || 'anonymous';
    setExiting(true);
    setTimeout(() => onEnter(name), 620);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleEnter();
  };

  return (
    <div className={`landing-overlay${exiting ? ' fade-out' : ''}`}>
      <div className="landing-paper">
        {/* decorative elements */}
        <div className="landing-paper__margin-line" />
        <div className="landing-paper__ruled-lines" />
        <div className="landing-paper__stamp">PERSONAL</div>

        {/* content */}
        <h1 className="landing-paper__title">The Freedom Wall</h1>
        <p className="landing-paper__subtitle">
          {isReturning
            ? 'switching aliases — who are you writing as today?'
            : 'a quiet corner of the internet, just for thoughts.'}
        </p>

        <div className="landing-paper__divider" />

        {!isReturning && (
          <p className="landing-paper__disclaimer">
            <strong>What is this?</strong>
            <br />
            A digital corkboard — a dumping ground for thoughts, letters,
            reminders, rants, or whatever needs to get out of your head. Notes
            are saved locally on this device.
            <br />
            <br />
            <strong>Disclaimer:</strong>
            <br />
            This is a personal space. Write freely. Nothing here is shared,
            judged, or graded. Treat it like your most honest notebook.
          </p>
        )}

        {isReturning && (
          <p className="landing-paper__disclaimer">
            Your notes stay on the wall — only your alias changes. Pick a new
            name or re-enter your old one to continue.
          </p>
        )}

        <label className="landing-paper__username-label">
          Your alias / nickname
        </label>
        <input
          className="landing-paper__username-input"
          type="text"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. night owl, wanderer..."
          maxLength={30}
          autoComplete="off"
          autoFocus
        />
        <button className="landing-paper__continue-btn" onClick={handleEnter}>
          {isReturning ? '✓ Switch alias' : '✓ I agree — take me to the wall'}
        </button>
      </div>
    </div>
  );
}

export default Landing;
