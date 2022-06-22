import { titleCase } from '$string-case-helpers';
import ThemeScale from '$/models/ThemeScale';
import { Array } from '$/models/utilityTypes';
import { DEFAULT_THEME } from '@mantine/core';
import { A, D } from '@mobily/ts-belt';
import composePrioritySortComparison from '$/utils/composePrioritySortComparison';

const colorPairs = D.toPairs(DEFAULT_THEME.colors);
const sortedMantineColorPairs = A.sort(
  colorPairs,
  composePrioritySortComparison('blue', ([key]) => key)
);

const colorPalettes: Array<ThemeScale> = [
  ...sortedMantineColorPairs.map(
    ([key, colorShades]) =>
      ({
        id: `mantine-${key}`,
        name: titleCase(key),
        values: colorShades.map((color, index) => ({
          key: `${index}`,
          value: color,
        })),
      } as ThemeScale)
  ),
];

export default colorPalettes;
