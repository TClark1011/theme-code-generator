import { SpacingScaleSelection, spacingSettingsAtom } from '$spacing';
import { A, F, flow, N, pipe } from '@mobily/ts-belt';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Stack } from '@mantine/core';
import { useAtomValue } from 'jotai';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SpacingVisualization: React.FC = () => {
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

	return (
		<Stack>
			<Bar
				options={{
					responsive: true,
				}}
				data={{
					labels: values.map((_, index) => index + 1),
					datasets: [
						{
							data: values,
							backgroundColor: 'yellow',
						},
					],
				}}
			/>
			<SpacingScaleSelection />
		</Stack>
	);
};

export default SpacingVisualization;
