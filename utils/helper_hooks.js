import { useEffect, useRef } from 'react';

export function useIsMount() {
  const isMount = useRef(true);
  useEffect(() => {
    isMount.current = false;
  }, []);
  return isMount.current;
}
