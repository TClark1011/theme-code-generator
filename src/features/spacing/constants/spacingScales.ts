import ThemeScale from '$/models/ThemeScale';
import { Array } from '$/models/utilityTypes';
import { A, D, F, flow, pipe, S } from '@mobily/ts-belt';
import { remToPx } from 'polished';

const tailwindDefaultSpacing = {
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

const airbnbSpacing = {
  tiny: 8,
  small: 16,
  base: 24,
  large: 48,
  'x-large': 64,
};

const convertRemStringToPxNumber = flow(remToPx, S.remove('px'), Number);

const pricelineGenerator: (index: number) => number = F.memoizeWithKey(String, (index: number) =>
  index > 1 ? pricelineGenerator(index - 1) * 2 : index * 4
);

const spacingScales: Array<ThemeScale> = [
  {
    id: 'grid4',
    name: 'Grid',
    values: A.makeWithIndex(25, (i) => ({
      key: `${i}`,
      value: `${i * 4}`,
    })),
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    values: pipe(
      tailwindDefaultSpacing,
      D.toPairs,
      A.map(([key, value]) => ({
        key: `${key}`,
        value: pipe(value, convertRemStringToPxNumber, String),
      })),
      A.sortBy(flow(D.getUnsafe('key'), Number))
    ),
  },
  {
    id: 'priceline',
    name: 'Priceline',
    values: A.makeWithIndex(7, (i) => ({
      key: `${i}`,
      value: pipe(i, pricelineGenerator, String),
    })),
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    values: pipe(
      airbnbSpacing,
      D.toPairs,
      A.map(([key, value]) => ({
        key,
        value: String(value),
      }))
    ),
  },
];

export default spacingScales;
