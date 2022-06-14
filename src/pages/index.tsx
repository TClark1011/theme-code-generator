import type { NextPage } from 'next';
import { Box, Container, Divider, Stack, Text, Title } from '@mantine/core';
import { GeneratedCodePreview, ThemeScaleCodeForm } from '$code-generation';
import ActiveVisualization from '$/components/ActiveVisualization';
import ActiveScaleSelection from '$/components/ActiveScaleSelection';
import ScaleSwitcher from '$/components/ScaleSwitcher';

const Home: NextPage = () => {
  return (
    <main>
      <Container pb={64}>
        <Stack spacing={64}>
          <Box>
            <Title order={1}>Theme Code Generator</Title>
            <Text>
              Ut excepteur non irure minim do sit mollit esse eu. Magna veniam nostrud consequat ex
              consequat sunt anim duis veniam officia. Eiusmod velit veniam ullamco consequat
              aliquip minim nisi voluptate non fugiat nulla nulla ea. Nulla commodo consectetur
              nulla sint excepteur nulla labore exercitation. Ex aute elit ut cupidatat consequat
              elit eu. Commodo esse adipisicing pariatur incididunt ad cillum nisi excepteur
              cupidatat excepteur cillum. Excepteur do eu ut quis voluptate pariatur dolore aliquip
              ad adipisicing eiusmod ea ea officia.
            </Text>
          </Box>
          <Stack>
            <ScaleSwitcher />
            <ActiveVisualization />
            <ActiveScaleSelection />
          </Stack>
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
