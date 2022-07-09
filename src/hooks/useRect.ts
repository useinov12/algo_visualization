import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const useRect = () => {
  const ref = useRef<HTMLObjectElement>();
  const [rect, setRect] = useState({} as any);

  const set = () =>
  setRect(ref && ref.current ? ref.current.getBoundingClientRect() : {});

  useEffect(() => {
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  return [rect, ref];
};
 

export default useRect