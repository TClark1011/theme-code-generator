import { ThemeScaleUnit } from '$/models/ThemeScale';
import { Array } from '$/models/utilityTypes';
import { hexToHsl, hexToRgb } from '$color-converters';
import { F } from '@mobily/ts-belt';

const colorUnits: Array<ThemeScaleUnit> = [
  {
    id: 'hex',
    name: 'Hex',
    converter: F.identity,
  },
  {
    id: 'rgb',
    name: 'RGB',
    converter: hexToRgb,
  },
  {
    id: 'hsl',
    name: 'HSL',
    converter: hexToHsl,
  },
];

export default colorUnits;
