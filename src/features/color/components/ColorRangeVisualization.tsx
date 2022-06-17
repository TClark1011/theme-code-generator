import { Array } from '$/models/utilityTypes';
import SmartColorSwatch from '$color/components/SmartColorSwatch';
import { Box } from '@mantine/core';

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
        <SmartColorSwatch key={color} color={color} />
      ))}
    </Box>
  );
};

export default ColorRangeVisualization;
