import React, { useRef, useState, useEffect } from 'react';
import '../styles/Modals.css';

const NOTE_COLORS = [
  { key: 'y', hex: '#fef08a', label: 'Yellow' },
  { key: 'g', hex: '#bbf7d0', label: 'Green'  },
  { key: 'p', hex: '#e9d5ff', label: 'Purple' },
  { key: 'r', hex: '#fecaca', label: 'Red'    },
  { key: 'o', hex: '#fed7aa', label: 'Orange' },
];

/**
 * CreateNoteModal — rich-text note editor pop-up.
 * Props:
 *   onPost: (noteData: { html, color }) => void
 *   onClose: () => void
 */
function CreateNoteModal({ onPost, onClose }) {
  const editorRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState('y');

  // Focus editor on mount
  useEffect(() => {
    editorRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // execCommand wrapper (keeps editor focused)
  const fmt = (command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  };

  const handlePost = () => {
    const html = editorRef.current?.innerHTML?.trim() || '';
    const text = editorRef.current?.textContent?.trim() || '';
    if (!text) {
      // shake the editor slightly — handled via a CSS class
      editorRef.current?.classList.add('shake');
      setTimeout(() => editorRef.current?.classList.remove('shake'), 400);
      return;
    }
    onPost({ html, color: selectedColor });
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="create-modal__paper">
        <div className="paper-texture" />
        <div className="paper-margin-line" />

        {/* Header */}
        <div className="create-modal__header">
          <span className="create-modal__title">New Note</span>
          <button className="modal__close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          {/* Style */}
          <div className="toolbar__group">
            <button className="toolbar__btn" title="Bold"          onClick={() => fmt('bold')}>          <b>B</b></button>
            <button className="toolbar__btn" title="Italic"        onClick={() => fmt('italic')}>        <i>I</i></button>
            <button className="toolbar__btn" title="Underline"     onClick={() => fmt('underline')}>     <u>U</u></button>
            <button className="toolbar__btn" title="Strikethrough" onClick={() => fmt('strikeThrough')}> <s>S</s></button>
          </div>

          {/* Font size */}
          <div className="toolbar__group">
            <select
              className="toolbar__select"
              title="Font size"
              defaultValue="3"
              onChange={(e) => fmt('fontSize', e.target.value)}
            >
              <option value="1">Small</option>
              <option value="3">Normal</option>
              <option value="5">Large</option>
              <option value="7">Huge</option>
            </select>
          </div>

          {/* Alignment */}
          <div className="toolbar__group">
            <button className="toolbar__btn" title="Align left"   onClick={() => fmt('justifyLeft')}>   ⬅</button>
            <button className="toolbar__btn" title="Center"       onClick={() => fmt('justifyCenter')}> ↔</button>
            <button className="toolbar__btn" title="Align right"  onClick={() => fmt('justifyRight')}>  ➡</button>
          </div>

          {/* Lists */}
          <div className="toolbar__group">
            <button className="toolbar__btn" title="Bullet list"   onClick={() => fmt('insertUnorderedList')}>• list</button>
            <button className="toolbar__btn" title="Numbered list" onClick={() => fmt('insertOrderedList')}>  1. list</button>
          </div>

          {/* Note color */}
          <div className="toolbar__group" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="toolbar__color-label">Color:</span>
            {NOTE_COLORS.map((c) => (
              <button
                key={c.key}
                className={`toolbar__color-swatch${selectedColor === c.key ? ' toolbar__color-swatch--selected' : ''}`}
                style={{ background: c.hex }}
                title={c.label}
                onClick={() => setSelectedColor(c.key)}
              />
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="create-modal__editor-wrap">
          <div
            ref={editorRef}
            className="create-modal__editor"
            contentEditable
            suppressContentEditableWarning
            data-placeholder="What's on your mind?"
          />
        </div>

        {/* Footer */}
        <div className="create-modal__footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-done"   onClick={handlePost}>📌 Pin it to the wall</button>
        </div>
      </div>
    </div>
  );
}

export default CreateNoteModal;
