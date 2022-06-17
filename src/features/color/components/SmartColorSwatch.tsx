import CopyActionIcon from '$/components/CopyActionIcon';
import { Box, ColorSwatch, Tooltip } from '@mantine/core';
import { pipe } from '@mobily/ts-belt';
import { transparentize } from 'polished';
import { FC, useState } from 'react';

export type SmartColorSwatchProps = {
  color: string;
};

const SmartColorSwatch: FC<SmartColorSwatchProps> = ({ color }) => {
  const [wasRecentlyCopied, setWasRecentlyCopied] = useState(false);

  return (
    <Tooltip
      position="bottom"
      label={
        <Box sx={{ width: 60, display: 'flex', justifyContent: 'center' }}>
          {wasRecentlyCopied ? 'Copied!' : color}
        </Box>
      }
      withArrow
    >
      <ColorSwatch
        radius="md"
        size={64}
        key={color}
        color={color}
        sx={{
          '&:hover': {
            '--hover-opacity': '1',
          },
        }}
      >
        <CopyActionIcon
          onCopyStatusChange={setWasRecentlyCopied}
          text={color}
          sx={(t) => ({
            height: 64,
            width: 64,
            position: 'absolute',
            opacity: 'var(--hover-opacity, 0)',
            transition: 'opacity 0.2s ease-in-out',
            zIndex: 100,
            '&:hover': {
              background: pipe(t.colors.dark[8], transparentize(0.2)),
            },
          })}
        />
      </ColorSwatch>
    </Tooltip>
  );
};

export default SmartColorSwatch;
