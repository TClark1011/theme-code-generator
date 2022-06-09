import { Array, ThemeScaleUnit } from '$/models';
import { F, flow, N } from '@mobily/ts-belt';

export const spacingPxUnit: ThemeScaleUnit = {
  id: 'px',
  name: 'px',
  converter: F.identity,
};

const spacingUnits: Array<ThemeScaleUnit> = [
  spacingPxUnit,
  {
    id: 'rem',
    name: 'rem',
    converter: flow(Number, N.divide(16), String),
  },
];

export default spacingUnits;
