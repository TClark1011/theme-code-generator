import { Box, Center, Text, Title } from '@mantine/core';
import Image from 'next/image';
import { FC } from 'react';

const IMAGE_SIZE = 800;

const LandingPage: FC = () => {
  return (
    <Center sx={{ width: '100%', height: '100vh' }} px={128}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Center sx={{ flex: 1 }}>
          <Box sx={{ minWidth: 400, maxWidth: '30vw' }}>
            <Title order={1} sx={{ fontSize: 70, lineHeight: '100%' }} mb={16}>
              Theme Code Generator
            </Title>
            <Text size="lg" sx={{ lineHeight: '2rem' }}>
              Ut excepteur non irure minim do sit mollit esse eu. Magna veniam nostrud consequat ex
              consequat sunt anim duis veniam officia. Eiusmod velit veniam ullamco consequat
              aliquip minim nisi voluptate non fugiat nulla nulla ea. Nulla commodo consectetur
              nulla sint excepteur nulla labore exercitation. Ex aute elit ut cupidatat consequat
              elit eu. Commodo esse adipisicing pariatur incididunt ad cillum nisi excepteur
              cupidatat excepteur cillum. Excepteur do eu ut quis voluptate pariatur dolore aliquip
              ad adipisicing eiusmod ea ea officia.
            </Text>
          </Box>
        </Center>
        <Center sx={{ flex: 1 }}>
          <Image
            src="/icons/programming.svg"
            alt="programming-icon"
            height={IMAGE_SIZE}
            width={IMAGE_SIZE}
          />
        </Center>
      </Box>
    </Center>
  );
};

export default LandingPage;
