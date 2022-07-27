import { flow } from '@mobily/ts-belt';
import { parseToHsl } from 'polished';
import { HslaColor, HslColor } from 'polished/lib/types/color';

export const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
    : '';
};

const hslObjectToString = ({ hue, lightness, saturation }: HslColor | HslaColor): string =>
  `hsl(${Math.round(hue)}, ${Math.round(saturation * 100)}%, ${Math.round(lightness * 100)}%)`;

export const hexToHsl = flow(parseToHsl, hslObjectToString);
