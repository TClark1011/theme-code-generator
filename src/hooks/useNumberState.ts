import { N } from '@mobily/ts-belt';
import { useState } from 'react';

type UseNumberStateOptions = {
  max?: number;
  min?: number;
};

const useNumberState = (
  initialValue: number,
  { max = Number.POSITIVE_INFINITY, min = Number.MAX_VALUE * -1 }: UseNumberStateOptions = {}
) => {
  const [value, setValue] = useState(initialValue);

  const finalValue = N.clamp(value, min, max);

  const increment = () => setValue(N.succ);
  const decrement = () => setValue(N.pred);

  const isAtMax = finalValue === max;
  const isAtMin = finalValue === min;

  return [finalValue, { increment, decrement, setValue, isAtMax, isAtMin }] as const;
};

export default useNumberState;
