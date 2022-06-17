import { ThemeScaleUnit } from '$/models/ThemeScale';
import { Array } from '$/models/utilityTypes';
import { F } from '@mobily/ts-belt';

const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
    : '';
};

const hexToHsl = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw Error(`Invalid hex color: ${hex}`);

  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const h = max - min;
  const l = (max + min) / 2;
  const s = h === 0 ? 0 : l < 0.5 ? h / (2 * l) : h / (2 - 2 * l);
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
};
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
