import { Array, KeyValuePair, WithId } from '$/models/utilityTypes';
import { F } from '@mobily/ts-belt';

type ThemeScale = WithId & {
  name: string;
  //TODO: rename this field to 'items'
  values: Array<KeyValuePair<string>>;
};

export type ThemeScaleUnit = WithId & {
  name: string;
  converter: (baseValue: string) => string;
  // What unit the 'baseValue' is in depends on the type of the scale:
  // - spacing: px
  // - color: hex
};
export const stubThemeScaleUnit: ThemeScaleUnit = {
  id: '',
  name: '',
  converter: F.identity,
};

export default ThemeScale;
