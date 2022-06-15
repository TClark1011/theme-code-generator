import { deepUpdate } from '$deep-merge';
import { MantineTheme, DEFAULT_THEME, MantineProviderProps } from '@mantine/core';

const theme: MantineTheme = deepUpdate(DEFAULT_THEME, {
  primaryColor: 'blue',
  colorScheme: 'dark',
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
