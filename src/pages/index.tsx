import type { NextPage } from 'next';
import { Box } from '@mantine/core';
import { SpacingScaleSelection, SpacingVisualization } from '$spacing';
import { ThemeScaleCodeForm } from '$code-generation';

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
      <ThemeScaleCodeForm />
    </Box>
  );
};

export default Home;
