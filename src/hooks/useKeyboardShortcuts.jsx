// hooks/useKeyboardShortcuts.js
import { useEffect } from 'react';

//For the ease of the user I have added a keyboard shortcut to run the query

const useKeyboardShortcuts = (runHandler) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        runHandler();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [runHandler]);
};

export default useKeyboardShortcuts;