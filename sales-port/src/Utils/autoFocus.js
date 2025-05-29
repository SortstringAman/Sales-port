// hooks/useAutoFocus.js
import { useEffect, useRef } from 'react';

const useAutoFocus = (shouldFocus) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldFocus]);

  return inputRef;
};

export default useAutoFocus;
