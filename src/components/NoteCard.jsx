import React from 'react';
import '../styles/Wall.css';

const ROTATIONS = [-2.5, -1.5, 0, 1, 2, -1, 1.5, -0.5, 2.5, -2];

/**
 * NoteCard — a single sticky note on the wall.
 * Props:
 *   note: { id, alias, html, color, ts }
 *   index: number  — used to pick rotation + animation delay
 *   onClick: (note) => void
 */
function NoteCard({ note, index, onClick }) {
  const rot = ROTATIONS[index % ROTATIONS.length];
  const delay = `${index * 0.04}s`;
  const colorClass = `note-card--${note.color || 'y'}`;

  const formatDate = (ts) =>
    new Date(ts).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <div
      className={`note-card ${colorClass}`}
      style={{
        '--rot': `${rot}deg`,
        transform: `rotate(${rot}deg)`,
        animationDelay: delay,
      }}
      onClick={() => onClick(note)}
    >
      <div className="note-card__alias">— {note.alias}</div>
      <div
        className="note-card__preview"
        dangerouslySetInnerHTML={{ __html: note.html }}
      />
      <div className="note-card__date">{formatDate(note.ts)}</div>
    </div>
  );
}

export default NoteCard;
