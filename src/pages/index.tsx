import type { NextPage } from 'next';
import { Box, Button } from '@mantine/core';
import { SpacingScaleSelection, SpacingVisualization } from '$spacing';
import { CodeGenerationModal } from '$code-generation';
import { useStoreDispatch } from '$/logic';

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
      <Button onClick={() => dispatch.codeGeneration.setCodeGenerationModalIsOpen(true)}>
        Generate Code
      </Button>
      <CodeGenerationModal />
    </Box>
  );
};

export default Home;
