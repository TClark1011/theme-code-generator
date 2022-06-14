import { Array } from '$/models/utilityTypes';
import { ColorSwatch, Stack } from '@mantine/core';

export type ColorRangeVisualizationProps = {
  colors: Array<string>;
};

const ColorRangeVisualization = ({ colors }: ColorRangeVisualizationProps) => {
  return (
    <Stack>
      {colors.map((color) => (
        <ColorSwatch
          radius="md"
          sx={{
            width: '100%',
          }}
          key={color}
          color={color}
        />
      ))}
    </Stack>
  );
};

export default ColorRangeVisualization;
