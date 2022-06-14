import type { NextPage } from 'next';
import { Box, Container, Divider, Stack, Title } from '@mantine/core';
import { SpacingScaleSelection, SpacingVisualization } from '$spacing';
import { GeneratedCodePreview, ThemeScaleCodeForm } from '$code-generation';

const Home: NextPage = () => {
  return (
    <main>
      <Container pb={64}>
        <Stack spacing={64}>
          <Title order={1}>Theme Code Generator</Title>
          <Box>
            <SpacingVisualization />
            <SpacingScaleSelection />
          </Box>
          <Divider />
          <Box>
            <Title order={2}>Generate Code</Title>
            <ThemeScaleCodeForm />
          </Box>
          <GeneratedCodePreview />
        </Stack>
      </Container>
    </main>
  );
};

export default Home;
