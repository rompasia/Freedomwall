import React, { useState } from 'react';
import Landing from './components/Landing';
import Header from './components/Header';
import Wall from './components/Wall';
import ViewNoteModal from './components/ViewNoteModal';
import CreateNoteModal from './components/CreateNoteModal';
import Toast from './components/Toast';
import useLocalStorage from './hooks/useLocalStorage';
import useToast from './hooks/useToast';
import './styles/global.css';

/**
 * App — root component.
 *
 * State:
 *   alias        — current user alias (persisted)
 *   notes        — array of note objects (persisted)
 *   hasEntered   — whether landing screen has been dismissed
 *   viewingNote  — note currently open in ViewNoteModal, or null
 *   creating     — whether CreateNoteModal is open
 */
function App() {
  const [alias, setAlias] = useLocalStorage('fw_alias', '');
  const [notes, setNotes] = useLocalStorage('fw_notes', []);
  const [hasEntered, setHasEntered] = useState(!!alias);
  const [viewingNote, setViewingNote] = useState(null);
  const [creating, setCreating] = useState(false);
  const { message: toastMsg, visible: toastVisible, showToast } = useToast();

  // ── HANDLERS ──

  const handleEnter = (name) => {
    setAlias(name);
    setHasEntered(true);
  };

  const handleAddNote = () => setCreating(true);

  const handlePost = ({ html, color }) => {
    const newNote = {
      id: Date.now(),
      alias,
      html,
      color,
      ts: Date.now(),
    };
    setNotes((prev) => [...prev, newNote]);
    setCreating(false);
    showToast('📌 Note pinned to the wall!');
  };

  return (
    <>
      {/* Landing screen — shown until user enters alias */}
      {!hasEntered && <Landing onEnter={handleEnter} />}

      {/* Main app */}
      {hasEntered && (
        <>
          <Header alias={alias} onAddNote={handleAddNote} />
          <Wall notes={notes} onNoteClick={setViewingNote} />
        </>
      )}

      {/* Modals */}
      {viewingNote && (
        <ViewNoteModal
          note={viewingNote}
          onClose={() => setViewingNote(null)}
        />
      )}
      {creating && (
        <CreateNoteModal
          onPost={handlePost}
          onClose={() => setCreating(false)}
        />
      )}

      {/* Toast */}
      <Toast message={toastMsg} visible={toastVisible} />
    </>
  );
}

export default App;
