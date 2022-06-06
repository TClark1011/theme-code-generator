import { SpacingScale } from '$spacing';
import { A, F } from '@mobily/ts-belt';

const goldenRatioGenerator: ((p:number) => number) = F.memoizeWithKey(String, (index:number)=> index > 1 ? goldenRatioGenerator(index - 1) * 1.61803398875 : 1);
const doubleGenerator: ((p:number) => number) = F.memoizeWithKey(String, (index:number)=> index > 1 ? doubleGenerator(index - 1) * 2 : 1);

const spacingScales: SpacingScale[] = [{
	id: 'grid4',
	name: 'Grid',
	values: A.makeWithIndex(25, (i) => ({
		label: `${i}`,
		value: i * 4,
		numericValueDeriver: F.identity
	}))
}];


export default spacingScales;