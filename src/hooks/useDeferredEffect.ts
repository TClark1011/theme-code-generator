import { useDeferredValue, useEffect } from 'react';

const useDeferredEffect = <T>(effect: (p: T) => void, dep: T) => {
  const deferredDep = useDeferredValue(dep);

  useEffect(() => {
    effect(deferredDep);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredDep]);
};

export default useDeferredEffect;
