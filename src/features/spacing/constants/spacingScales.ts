import { SpacingScale } from '$spacing';
import { F, N } from '@mobily/ts-belt';

const goldenRatioGenerator: ((p:number) => number) = F.memoizeWithKey(String, (index:number)=> index > 1 ? goldenRatioGenerator(index - 1) * 1.61803398875 : 1);
const doubleGenerator: ((p:number) => number) = F.memoizeWithKey(String, (index:number)=> index > 1 ? doubleGenerator(index - 1) * 2 : 1);

const spacingScales: SpacingScale[] = [{
	id: 'grid4',
	name: 'Grid (4px)',
	generator: N.multiply(4)
}, {
	id: 'grid8',
	name: 'Grid (8px)',
	generator: N.multiply(8)
}, {
	id: 'golden',
	name: 'Golden Ratio',
	generator: goldenRatioGenerator
}, {
	id: 'double',
	name: 'Double',
	generator: doubleGenerator
}, {
	id:'square',
	name: 'Exponential',
	generator: (index) => Math.pow(1.4, index)
}];


export default spacingScales;