import fontFamilyRule from '$/utils/fontFamilyRule';
import { deepUpdate } from '$deep-merge';
import { MantineTheme, DEFAULT_THEME, MantineProviderProps, CSSObject } from '@mantine/core';

const bodyFonts = ['Ubuntu', 'Roboto', 'SF Pro', 'Segoe UI', 'sans-serif'];
const theme: MantineTheme = deepUpdate(DEFAULT_THEME, {
  primaryColor: 'blue',
  colorScheme: 'dark',
  fontFamily: fontFamilyRule(bodyFonts),
  headings: {
    fontFamily: fontFamilyRule(['Red Hat Display', ...bodyFonts]),
  },
});

export const defaultStyles: MantineProviderProps['styles'] = {
  Code: {
    root: {
      tabSize: 4,
    },
  },
};

export const globalStyles: CSSObject = {
  html: {
    scrollBehavior: 'smooth',
  },
  '@media (prefers-reduced-motion)': {
    html: {
      scrollBehavior: 'auto',
    },
  },
};

export const PRIMARY_COLOR_PALETTE = theme.colors[theme.primaryColor];

export default theme;
