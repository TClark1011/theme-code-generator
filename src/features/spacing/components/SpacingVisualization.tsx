import { spacingSettingsAtom } from '$spacing';
import { A, F, flow, N, pipe } from '@mobily/ts-belt';
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
import { useAtomValue } from 'jotai';
import {  useThemeColor } from '$/hooks';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const useMemoisedValues = () => {
	const { maxIndex, selectedScale } = useAtomValue(spacingSettingsAtom);
	const values = useMemo(
		() =>
			pipe(
				maxIndex,
				A.makeWithIndex(flow(N.succ, selectedScale.generator)),
				F.toMutable
			),
		[maxIndex, selectedScale]
	);
	return values;
};

const SpacingVisualization: React.FC<BoxProps<'div'>> = (props) => {
	const values = useMemoisedValues();
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
					labels: values.map((_, index) => index + 1),
					datasets: [
						{
							data: values,
							backgroundColor: barColor,
						},
					],
				}}
			/>
		</Box>
	);
};

export default SpacingVisualization;
