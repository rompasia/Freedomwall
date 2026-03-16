import React from 'react';
import '../styles/Modals.css';

/**
 * Toast — brief notification at bottom of screen.
 * Props:
 *   message: string
 *   visible: boolean
 */
function Toast({ message, visible }) {
  return (
    <div className={`toast${visible ? ' toast--visible' : ''}`}>
      {message}
    </div>
  );
}

export default Toast;
