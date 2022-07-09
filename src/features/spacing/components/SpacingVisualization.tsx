import { D, flow } from '@mobily/ts-belt';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Box, BoxProps } from '@mantine/core';
import { createSelector } from '@reduxjs/toolkit';
import { useStoreSelector } from '$/store/storeHooks';
import { StoreState } from '$/store/store';
import useThemeColor from '$/hooks/useThemeColor';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const visualizationValuesSelector = createSelector(
  (state: StoreState) => state.spacing.selectedScale.values,
  (values) => ({
    numericValues: (values ?? []).map(flow(D.getUnsafe('value'), Number)),
    labels: (values ?? []).map(D.getUnsafe('key')),
  })
);

const SpacingVisualization: React.FC<BoxProps<'div'>> = (props) => {
  const { numericValues, labels } = useStoreSelector(visualizationValuesSelector);
  const barColor = useThemeColor('primary');
  const gridColor = useThemeColor('gray', 8);

  return (
    <Box {...props}>
      <Bar
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            xAxes: {
              grid: {
                color: gridColor,
              },
            },
            yAxes: {
              grid: {
                color: gridColor,
              },
            },
          },
        }}
        data={{
          labels: labels,
          datasets: [
            {
              data: numericValues,
              backgroundColor: barColor,
            },
          ],
        }}
      />
    </Box>
  );
};

export default SpacingVisualization;
