import React from 'react';
import '../styles/Header.css';

/**
 * Header — sticky top bar with brand, alias, and Add Note button.
 * Props:
 *   alias: string
 *   onAddNote: () => void
 */
function Header({ alias, onAddNote }) {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="app-header__title">The Freedom Wall</span>
        <span className="app-header__user">
          writing as{' '}
          <span className="app-header__user-alias">{alias}</span>
        </span>
      </div>

      <button className="app-header__add-btn" onClick={onAddNote}>
        <span className="plus-icon">+</span>
        Add Note
      </button>
    </header>
  );
}

export default Header;
