import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';
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
 *   alias        — current user alias (persisted to localStorage)
 *   notes        — array of note objects (synced from Firestore)
 *   hasEntered   — whether landing screen has been dismissed
 *   loading      — true while initial Firestore fetch is in progress
 *   viewingNote  — note currently open in ViewNoteModal, or null
 *   creating     — whether CreateNoteModal is open
 */
function App() {
  const [alias, setAlias] = useLocalStorage('fw_alias', '');
  const [hasEntered, setHasEntered] = useState(!!alias);
  const [hasEverEntered, setHasEverEntered] = useState(!!alias);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingNote, setViewingNote] = useState(null);
  const [creating, setCreating] = useState(false);
  const { message: toastMsg, visible: toastVisible, showToast } = useToast();

  // ── FIRESTORE: real-time listener ──
  useEffect(() => {
    const q = query(collection(db, 'notes'), orderBy('ts', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(fetched);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // ── HANDLERS ──

  const handleEnter = (name) => {
    setAlias(name);
    setHasEntered(true);
    setHasEverEntered(true);
  };

  const handleLogout = () => {
    setAlias('');
    setHasEntered(false);
    setViewingNote(null);
    setCreating(false);
  };

  const handleAddNote = () => setCreating(true);

  const handlePost = async ({ html, color }) => {
    try {
      await addDoc(collection(db, 'notes'), {
        alias,
        html,
        color,
        ts: Date.now(),
      });
      setCreating(false);
      showToast('📌 Note pinned to the wall!');
    } catch (err) {
      console.error('Failed to save note:', err);
      showToast('⚠️ Could not save note. Check your connection.');
    }
  };

  return (
    <>
      {/* Landing screen — shown until user enters alias */}
      {!hasEntered && (
        <Landing onEnter={handleEnter} isReturning={hasEverEntered} />
      )}

      {/* Main app */}
      {hasEntered && (
        <>
          <Header alias={alias} onAddNote={handleAddNote} onLogout={handleLogout} />
          <Wall notes={notes} loading={loading} onNoteClick={setViewingNote} />
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
