import { titleCase } from '$string-case-helpers';
import ThemeScale from '$/models/ThemeScale';
import { Array } from '$/models/utilityTypes';
import { A, D, pipe } from '@mobily/ts-belt';
import composePrioritySortComparison from '$/utils/composePrioritySortComparison';
import TailwindColorPalette from '$color/models/TailwindColorPalette';
import tailwindColors, {
  DefaultTailwindColorName,
  getTailwindColorCategory,
} from '$tailwind-colors';

const colorPairs = D.toPairs(tailwindColors);
const sortedPairs = A.sort(
  colorPairs,
  composePrioritySortComparison('blue', ([key]) => key)
);

const composeThemeScaleValueFromShadeColorPair = ([shade, color]: readonly [
  string,
  string
]): ThemeScale['values'][number] => ({
  key: shade,
  value: color,
});

const composeThemeScaleFromColorPair = ([colorName, palette]: readonly [
  DefaultTailwindColorName,
  TailwindColorPalette
]): ThemeScale => ({
  id: colorName,
  name: titleCase(colorName),
  values: pipe(palette, D.toPairs, A.map(composeThemeScaleValueFromShadeColorPair)),
  group: getTailwindColorCategory(colorName),
});

const colorPalettes: Array<ThemeScale> = sortedPairs.map(composeThemeScaleFromColorPair);

export default colorPalettes;
