import { WithId, LabelValuePairWithNumericDeriver, Array } from '$/models';

type ThemeScale<Output> = WithId & {
	name: string;
	values: Array<LabelValuePairWithNumericDeriver<Output>>;
}

export default ThemeScale;