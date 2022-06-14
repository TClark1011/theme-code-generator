import { Array } from '$/models/utilityTypes';
import { Box, ColorSwatch } from '@mantine/core';

export type ColorRangeVisualizationProps = {
  colors: Array<string>;
};

const ColorRangeVisualization = ({ colors }: ColorRangeVisualizationProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      {colors.map((color) => (
        <ColorSwatch radius="md" size={64} key={color} color={color} />
      ))}
    </Box>
  );
};

export default ColorRangeVisualization;
