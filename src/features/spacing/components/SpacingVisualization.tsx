import { A, D } from '@mobily/ts-belt';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
} from 'chart.js';
import { Box, BoxProps } from '@mantine/core';
import {  useThemeColor } from '$/hooks';
import { deriveNumberForComplexLabelValuePair } from '$/models';
import { useStoreSelector } from '$/logic';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const useValues = () => {
	const selectedScale = useStoreSelector(s => s.spacing.selectedScale);

	const values = useMemo(() =>  ({
		numericValues: (A.tail(selectedScale.values) ?? []).map(deriveNumberForComplexLabelValuePair),
		labels: (A.tail(selectedScale.values) ?? []).map(D.getUnsafe('label')),
	}), [selectedScale]);

	return values;
};

const SpacingVisualization: React.FC<BoxProps<'div'>> = (props) => {
	const {numericValues, labels} = useValues();
	const barColor = useThemeColor('primary');

	return (
		<Box {...props}>
			<Bar
				options={{
					plugins: {
						legend: {
							display: false,
						}
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
