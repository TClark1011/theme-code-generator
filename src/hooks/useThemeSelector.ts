import { MantineTheme, useMantineTheme } from '@mantine/core';

const useThemeSelector = <T>(selector: (p: MantineTheme) => T): T => {
  const theme = useMantineTheme();

  return selector(theme);
};

export default useThemeSelector;
