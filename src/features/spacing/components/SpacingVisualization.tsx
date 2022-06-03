import { SpacingScale } from '$spacing';
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

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export type SpacingVisualizationProps = {
  scale: SpacingScale
  maxIndex: number
}

const SpacingVisualization: React.FC<SpacingVisualizationProps> = ({
	scale,
	maxIndex,
}) => {
	const values = useMemo(
		() => pipe(maxIndex,  A.makeWithIndex(flow(N.succ, scale.generator)), F.toMutable),
		[maxIndex, scale]
	);

	console.log('(SpacingVisualization) values: ', values);

	return (
		<Bar
			options={{
				responsive: true
			}}
			data={{
				labels: values.map((_,index) => index + 1),
				datasets: [{
					data: values,
					backgroundColor: 'yellow'
				}],

			}}
		></Bar>
	);
};

export default SpacingVisualization;
