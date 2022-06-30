import { APP_DESCRIPTION, APP_TITLE } from '$/constants/branding';
import { CORE_CONTENT_ID } from '$/constants/ids';
import { Box, Button, Center, Text, Title } from '@mantine/core';
import Image from 'next/image';
import { FC } from 'react';

const IMAGE_SIZE = 600;

const LandingPage: FC = () => {
  return (
    <Center component="section" sx={{ width: '100%', height: '100vh' }} px={128}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Center sx={{ flex: 1 }}>
          <Box sx={{ minWidth: 400, maxWidth: '30vw' }}>
            <Title order={1} sx={{ fontSize: 70, lineHeight: '100%' }} mb={16}>
              {APP_TITLE}
            </Title>
            <Text component="p" size="lg" sx={{ lineHeight: '2rem' }} mb={16}>
              {APP_DESCRIPTION}
            </Text>
            <Center sx={{ width: '100%' }}>
              <Button size="md" px={64} component="a" href={`#${CORE_CONTENT_ID}`}>
                Get Started
              </Button>
            </Center>
          </Box>
        </Center>
        <Center sx={{ flexGrow: 1, minWidth: 400 }}>
          <Box>
            <Image
              src="/icons/programming.svg"
              alt="programming-icon"
              height={IMAGE_SIZE}
              width={IMAGE_SIZE}
            />
          </Box>
        </Center>
      </Box>
    </Center>
  );
};

export default LandingPage;
