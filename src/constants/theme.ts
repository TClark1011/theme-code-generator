import { MantineTheme, DEFAULT_THEME } from '@mantine/core';

const theme: MantineTheme = {
  ...DEFAULT_THEME,
  primaryColor: 'blue',
  colorScheme: 'dark',
};

export const PRIMARY_COLOR_PALETTE = theme.colors[theme.primaryColor];

export default theme;
