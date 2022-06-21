import { useDeferredValue, useEffect, useRef } from 'react';

const useDeferredEffect = <T>(effect: (p: T) => void, dep: T) => {
  const deferredDep = useDeferredValue(dep);

  useEffect(() => {
    effect(deferredDep);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredDep]);
};

export const useDeferredUpdateEffect: typeof useDeferredEffect = (effect, dep) => {
  const hasMountedRef = useRef(false);

  useDeferredEffect((dep) => {
    if (hasMountedRef.current) {
      effect(dep);
    } else {
      hasMountedRef.current = true;
    }
  }, dep);
};

export default useDeferredEffect;
