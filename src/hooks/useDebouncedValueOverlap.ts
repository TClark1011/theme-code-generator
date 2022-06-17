import { useDebouncedValue } from '@mantine/hooks';
import { useMemo } from 'react';

type ExtraOptions = Parameters<typeof useDebouncedValue>[2];

// Debounce a value and compare it to the original
// to produce a new value.
const useDebouncedValueOverlap = <T, Return>(
  originalValue: T,
  time: number,
  overlapHandler: (original: T, debounced: T) => Return,
  options?: ExtraOptions
): Return => {
  const [debouncedValue] = useDebouncedValue(originalValue, time, options);

  const finalValue = useMemo(
    () => overlapHandler(originalValue, debouncedValue),
    [originalValue, debouncedValue, overlapHandler]
  );

  return finalValue;
};

export default useDebouncedValueOverlap;
