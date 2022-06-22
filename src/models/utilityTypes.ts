import { PropsWithChildren } from 'react';
import { StringKeyOf } from 'type-fest';

export type WithId = {
  id: string;
};

export type WithChildren = PropsWithChildren<Record<never, never>>;

export type KeyValuePair<T> = {
  key: string;
  value: T;
};

export type Array<T> = T[] | readonly T[];

export type PrefixKeys<Dict extends Record<string, unknown>, Prefix extends string> = {
  [Key in StringKeyOf<Dict> as `${Prefix}${Key}`]: Dict[Key];
};
