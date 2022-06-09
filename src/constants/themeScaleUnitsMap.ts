import { spacingUnits } from '$spacing';
import { Array, ThemeScaleUnit } from '$/models';
import { ThemeScaleType } from '$/store';

const themeScaleUnitsMap: Record<ThemeScaleType, Array<ThemeScaleUnit>> = {
  spacing: spacingUnits,
};

export default themeScaleUnitsMap;
