import { Skeleton, Stack } from '@mantine/core';
import { A, F } from '@mobily/ts-belt';

const arr = A.makeWithIndex(10, F.identity);

const ColorRangeLoadingSkeleton: React.FC = () => (
  <Stack>
    {arr.map((num) => (
      <Skeleton key={num} height={32} width="100%" />	// eslint-disable-line
    ))}
  </Stack>
);

export default ColorRangeLoadingSkeleton;
