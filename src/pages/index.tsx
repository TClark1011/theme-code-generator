import type { NextPage } from 'next';
import { Box, Container, Divider, Text, Title } from '@mantine/core';
import Head from 'next/head';
import { APP_TITLE } from '$/constants/branding';
import ThemeCodeGeneration from '$/components/ThemeCodeGeneration';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>
      </Head>
      <main>
        <Container pb={64}>
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
          <Divider my={32} />
          <ThemeCodeGeneration />
        </Container>
      </main>
    </>
  );
};

export default Home;
