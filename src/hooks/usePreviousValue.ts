import { useRef, useEffect } from 'react';

/**
 * Hook that returns the previous version of
 * a provided value.
 * NOTE: This hook is designed to be used to
 * track the previous value of a state item.
 * The value returned will only be guaranteed
 * to be correct if the value changing will
 * trigger a re-render. Eg; This hook may not
 * correctly track the previous value of a ref
 * because ref's do not trigger a re-render
 * when changed.
 *
 * @param value The value to return the
 * previous version of
 * @returns The previous version of the value.
 * If the version has not changed, returns
 * undefined.
 */
const usePreviousValue = <T>(value: T): T | undefined => {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    // At first glance it may seem like this will cause the ref
    // to have the current value instead of the previous value,
    // but it will actually output the previous value because of
    // the specific way in which React handles effects and how
    // the value is returned from the hook.
    // Basically the value gets returned from the hook *before*
    // the value gets updated, which causes the returned value
    // to always be 1 step behind the current value.
    ref.current = value;
  }, [value]);

  // We can just return `ref.current` since the value gets
  // updated in an effect, we know that whenever it gets
  // updated a re-render must have just happened. Because of
  // that, we don't need to use state to ensure we are
  // returning the correct value.
  return ref.current;
};

export default usePreviousValue;
