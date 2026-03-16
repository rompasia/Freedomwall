import { useState, useCallback } from 'react';

/**
 * useToast — manages toast notification state.
 * Returns { message, visible, showToast }
 */
function useToast(duration = 2500) {
  const [toast, setToast] = useState({ message: '', visible: false });

  const showToast = useCallback(
    (message) => {
      setToast({ message, visible: true });
      setTimeout(() => setToast((t) => ({ ...t, visible: false })), duration);
    },
    [duration]
  );

  return { ...toast, showToast };
}

export default useToast;
