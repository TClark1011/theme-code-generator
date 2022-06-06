import { useEffect } from 'react';

const useMountEffect = (effect: () => void) => {
  useEffect(() => {
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMountEffect;
