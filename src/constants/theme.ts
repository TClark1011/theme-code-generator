import fontFamilyRule from '$/utils/fontFamilyRule';
import { deepUpdate } from '$deep-merge';
import { MantineTheme, DEFAULT_THEME, MantineProviderProps } from '@mantine/core';

const theme: MantineTheme = deepUpdate(DEFAULT_THEME, {
  primaryColor: 'blue',
  colorScheme: 'dark',
  fontFamily: fontFamilyRule(['Ubuntu', 'Roboto', 'SF Pro', 'Segoe UI', 'sans-serif']),
  headings: {
    fontFamily: fontFamilyRule([
      'Work Sans',
      'Ubuntu',
      'Roboto',
      'SF Pro',
      'Segoe UI',
      'sans-serif',
    ]),
  },
});

export const defaultStyles: MantineProviderProps['styles'] = {
  Code: {
    root: {
      tabSize: 4,
    },
  },
};

export const PRIMARY_COLOR_PALETTE = theme.colors[theme.primaryColor];

export default theme;
