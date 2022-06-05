import { MantineColor, MantineThemeColors, useMantineTheme } from '@mantine/core';


type ShadeIndex = keyof MantineThemeColors[MantineColor];

const useThemeColor = (colorName: MantineColor | 'primary', shadeIndex?: ShadeIndex): string => {
	const {colors, primaryShade, colorScheme, primaryColor} = useMantineTheme();

	const colorNameToUse = colorName === 'primary' ? primaryColor : colorName;
	const fallbackShade: ShadeIndex = typeof primaryShade === 'number' ? primaryShade : primaryShade[colorScheme];

	return colors[colorNameToUse][shadeIndex ?? fallbackShade] as string;
};

export default useThemeColor;