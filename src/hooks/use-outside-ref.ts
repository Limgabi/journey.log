import { useEffect, useRef, useState } from 'react';

export function useOutsideRef() {
  const ref = useRef<HTMLDivElement>(null);
  const [isShowOptions, setIsShowOptions] = useState(false);

  const toggleOptions = () => {
    setIsShowOptions(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isShowOptions && ref.current && !ref.current.contains(e.target as Node)) {
        toggleOptions();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShowOptions]);

  return { ref, isShowOptions, setIsShowOptions, toggleOptions };
}
