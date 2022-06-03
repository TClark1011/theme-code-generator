import { WithId } from '$/models';

type ThemeScale<Output> = WithId & {
	name: string;
	generator: (index:number) => Output;
}

export default ThemeScale;