import { useEffect, RefObject } from 'react';
import {toast} from 'react-toastify';

export const useOnClick = (
  ref: RefObject<HTMLElement>,
  cbOnElement: () => void,
  cbOutside: () => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        cbOnElement();
        return;
      }
      toast('click-hook');
      cbOutside();
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, cbOutside, cbOnElement]);
};
