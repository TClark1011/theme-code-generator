import type { NextPage } from 'next';
import { Box, Button } from '@mantine/core';
import { SpacingScaleSelection, SpacingVisualization } from '$spacing';
import { CodeGenerationModal, setCodeGenerationModalIsOpen } from '$code-generation';
import { useStoreDispatch } from '$/store';

const Home: NextPage = () => {
  const dispatch = useStoreDispatch();
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
      <Button onClick={() => dispatch(setCodeGenerationModalIsOpen(true))}>Generate Code</Button>
      <CodeGenerationModal />
    </Box>
  );
};

export default Home;
