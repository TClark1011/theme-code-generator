import useDebouncedValueOverlap from '$/hooks/useDebouncedValueOverlap';
import useInterval from '$/hooks/useInterval';
import usePreviousValue from '$/hooks/usePreviousValue';
import { Box, BoxProps, MantineTransition, Transition } from '@mantine/core';
import { flow, N } from '@mobily/ts-belt';
import { FC, useState } from 'react';

export type SlideShowProps = BoxProps<'div'> & {
  items: React.ReactNode[];
  transition: MantineTransition;
  exitTransition?: MantineTransition;
  displayDuration: number;
  startingIndex?: number;
  paused?: boolean;
  animationDuration?: number;
  ignoreAnimationOverlap?: boolean;
};
const SlideShow: FC<SlideShowProps> = ({
  transition,
  items,
  startingIndex = 0,
  paused = false,
  displayDuration,
  animationDuration = 200,
  ignoreAnimationOverlap = false,
  exitTransition = transition,
  ...boxProps
}) => {
  const [activeIndex, setActiveIndex] = useState(startingIndex);

  const mountedIndex = useDebouncedValueOverlap(
    activeIndex,
    animationDuration,
    (val, debouncedVal) => {
      if (ignoreAnimationOverlap) {
        return val;
      }
      return debouncedVal === val ? val : -1;
    }
  );
  const previousMountedIndex = usePreviousValue(mountedIndex);

  const selectNextItem = () => {
    const getNextIndex = flow(N.succ, N.modulo(items.length));
    setActiveIndex(getNextIndex);
  };

  useInterval(() => {
    if (!paused) {
      selectNextItem();
    }
  }, displayDuration + (ignoreAnimationOverlap ? 0 : animationDuration));

  const indexIsActive = (index: number) => index === mountedIndex;
  const indexWasUnmounted = (index: number) =>
    index === previousMountedIndex && !indexIsActive(index);

  const getTransitionForIndex = (index: number) =>
    indexWasUnmounted(index) ? exitTransition : transition;

  return (
    <Box {...boxProps}>
      {items.map((itemJsx, index) => (
        <Transition
          key={index}
          duration={animationDuration}
          mounted={indexIsActive(index)}
          transition={getTransitionForIndex(index)}
        >
          {(transitionStyles) => <Box style={transitionStyles}>{itemJsx}</Box>}
        </Transition>
      ))}
    </Box>
  );
};

export default SlideShow;
