import { useEffect, useMemo, useState, RefObject } from 'react';

const useIntersectionObserver = (ref: RefObject<Element|null>): boolean => {

  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  const observer = useMemo(() => {
    return new IntersectionObserver(([entry]) => {
      return setIntersecting(entry.isIntersecting)
    });
  }, []);

  useEffect(() => {
    if(ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    }
  }, []);

  return isIntersecting;
}

export default useIntersectionObserver;