import { Box } from '@mantine/core';
import { Prism } from '@mantine/prism';
import Image from 'next/image';
import { FC } from 'react';
import withDefaultProps from '$/utils/withDefaultProps';
import SlideShow from '$SlideShow';
import codeDisplayExamples from '$/constants/codeDisplayExamples';

const IMAGE_WIDTH = 600;

/* #region  Calculations to set all other dimensions based on width */
const IMAGE_BASE_HEIGHT = 401.98;
const IMAGE_BASE_WIDTH = 298.24;

const CODE_HEIGHT_FACTOR = 0.81;
const CODE_WIDTH_FACTOR = 1.19;

const IMAGE_HEIGHT_FACTOR = IMAGE_BASE_WIDTH / IMAGE_BASE_HEIGHT;

const IMAGE_HEIGHT = IMAGE_WIDTH * IMAGE_HEIGHT_FACTOR;

const CODE_BASE_LEFT = -69;
const CODE_BASE_TOP = 80;
const CODE_TOP_FACTOR = CODE_BASE_TOP / IMAGE_BASE_WIDTH;
const CODE_LEFT_FACTOR = CODE_BASE_LEFT / IMAGE_BASE_WIDTH;

const CODE_HEIGHT = IMAGE_HEIGHT * CODE_HEIGHT_FACTOR;
const CODE_WIDTH = IMAGE_WIDTH * CODE_WIDTH_FACTOR;
const CODE_TOP = IMAGE_HEIGHT * CODE_TOP_FACTOR;
const CODE_LEFT = IMAGE_WIDTH * CODE_LEFT_FACTOR;
/* #endregion */

const CodeBlock = withDefaultProps(Prism, {
  noCopy: true,
  sx: {
    width: CODE_WIDTH,
    borderRadius: '4px',
  },
  styles: {
    code: {
      height: CODE_HEIGHT,
      overflow: 'hidden',
      fontSize: '0.8rem',
      backgroundColor: '#201D38 !important',
      '&, *': {
        pointerEvents: 'none',
        userSelect: 'none',
      },
    },
  },
});

const ExamplesDisplay: FC = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Image
        src="/icons/programming.svg"
        alt="programming-icon"
        height={IMAGE_WIDTH}
        width={IMAGE_HEIGHT}
      />
      <SlideShow
        sx={{
          position: 'absolute',
          top: CODE_TOP,
          left: CODE_LEFT,
          transform: 'rotateX(-25deg) rotateY(-53.8deg)',
          width: CODE_WIDTH,
          backgroundColor: '#201D38',
          overflow: 'hidden',
        }}
        items={codeDisplayExamples.map(({ code, language }, index) => (
          <CodeBlock language={language} key={index}>
            {code}
          </CodeBlock>
        ))}
        displayDuration={3000}
        animationDuration={600}
        transition="slide-up"
        exitTransition="slide-down"
      />
    </Box>
  );
};

export default ExamplesDisplay;
