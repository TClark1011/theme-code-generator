import { ReactNode } from 'react';

export type WithId = {
	id: string;
}

export type WithChildren = {
	children?: ReactNode;
};

export type LabelValuePair<T> = {
	label: string;
	value: T;
}

export type LabelValuePairWithNumericDeriver<T> = LabelValuePair<T> & {
	numericValueDeriver: (value: T) => number;
}
export const deriveNumberForComplexLabelValuePair = <T>({numericValueDeriver, value}: LabelValuePairWithNumericDeriver<T>):number => numericValueDeriver(value);

export type Array<T> = T[] | readonly T[];