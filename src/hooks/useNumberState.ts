import { N } from '@mobily/ts-belt';
import { useMemo, useState } from 'react';

type UseNumberStateOptions = {
  max?: number;
  min?: number;
};

const useNumberState = (
  initialValue: number,
  { max = Number.POSITIVE_INFINITY, min = Number.MAX_VALUE * -1 }: UseNumberStateOptions = {}
) => {
  const [value, setValue] = useState(initialValue);

  const finalValue = useMemo(() => N.clamp(value, min, max), [value, min, max]);

  console.log('(useNumberState) finalValue: ', finalValue);

  const increment = () => setValue(finalValue + 1);
  const decrement = () => setValue(finalValue - 1);

  const isAtMax = finalValue === max;
  const isAtMin = finalValue === min;

  return [finalValue, { increment, decrement, setValue, isAtMax, isAtMin }] as const;
};

export default useNumberState;
