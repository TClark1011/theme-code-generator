import { Box, Skeleton } from '@mantine/core';
import { A, F } from '@mobily/ts-belt';

const arr = A.makeWithIndex(10, F.identity);

const ColorRangeLoadingSkeleton: React.FC = () => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    {arr.map((num) => (
      <Skeleton key={num} width={64} height={64}/>	// eslint-disable-line
    ))}
  </Box>
);

export default ColorRangeLoadingSkeleton;
