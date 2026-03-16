import React, { useEffect } from 'react';
import '../styles/Modals.css';

/**
 * ViewNoteModal — full-screen pop-up to read a note.
 * Props:
 *   note: { alias, html, ts } | null
 *   onClose: () => void
 */
function ViewNoteModal({ note, onClose }) {
  if (!note) return null;

  const formatDate = (ts) =>
    new Date(ts).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="view-modal__paper">
        <div className="paper-texture" />
        <div className="paper-margin-line" />

        <button className="modal__close-btn" onClick={onClose}>✕</button>

        <div className="view-modal__body">
          <div className="view-modal__alias">— {note.alias}</div>
          <div className="view-modal__date">{formatDate(note.ts)}</div>
          <div
            className="view-modal__content"
            dangerouslySetInnerHTML={{ __html: note.html }}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewNoteModal;
