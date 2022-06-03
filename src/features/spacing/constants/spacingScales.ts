import { SpacingScale } from '$spacing';
import { F, N } from '@mobily/ts-belt';

const goldenRatioGenerator: ((p:number) => number) = F.memoizeWithKey(String, (index:number)=> index > 0 ? goldenRatioGenerator(index - 1) * 1.61803398875 : 0);
const doubleGenerator: ((p:number) => number) = F.memoizeWithKey(String, (index:number)=> index > 0 ? goldenRatioGenerator(index - 1) * 2 : 0);

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
}];

export default spacingScales;