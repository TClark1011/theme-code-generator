import type { NextPage } from 'next';
import { Box } from '@mantine/core';
import { SpacingScaleSelection, SpacingVisualization } from '$spacing';

const Home: NextPage = () => {
  return (
    <Box
      component="main"
      sx={{
        paddingLeft: '2rem',
        paddingRight: '2rem',
      }}
    >
      <SpacingVisualization />
      <SpacingScaleSelection />
    </Box>
  );
};

export default Home;
