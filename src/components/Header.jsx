import React from 'react';
import '../styles/Header.css';

/**
 * Header — sticky top bar with brand, alias, Add Note, and Logout buttons.
 * Props:
 *   alias: string
 *   onAddNote: () => void
 *   onLogout: () => void
 */
function Header({ alias, onAddNote, onLogout }) {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="app-header__title">The Freedom Wall</span>
        <span className="app-header__user">
          writing as{' '}
          <span className="app-header__user-alias">{alias}</span>
        </span>
      </div>

      <div className="app-header__actions">
        <button className="app-header__logout-btn" onClick={onLogout} title="Switch alias">
          ↩ logout
        </button>
        <button className="app-header__add-btn" onClick={onAddNote}>
          <span className="plus-icon">+</span>
          Add Note
        </button>
      </div>
    </header>
  );
}

export default Header;
