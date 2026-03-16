import React from 'react';
import NoteCard from './NoteCard';
import '../styles/Wall.css';

/**
 * Wall — displays all note cards in a masonry-style grid.
 * Props:
 *   notes: array
 *   onNoteClick: (note) => void
 */
function Wall({ notes, onNoteClick }) {
  // Show newest first
  const sorted = [...notes].reverse();

  return (
    <section className="wall">
      <div className="wall__header">
        <span className="wall__label">pinned thoughts</span>
        <span className="wall__count">{notes.length}</span>
      </div>

      <div className="notes-grid">
        {sorted.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state__icon">✏</span>
            <p className="empty-state__text">
              No notes yet. The wall is yours — start writing.
            </p>
          </div>
        ) : (
          sorted.map((note, i) => (
            <NoteCard
              key={note.id}
              note={note}
              index={i}
              onClick={onNoteClick}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Wall;
