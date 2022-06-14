import { colorUnits } from '$color';
import { ThemeScaleUnit } from '$/models/ThemeScale';
import { Array } from '$/models/utilityTypes';
import { ThemeScaleType } from '$/store/generalReducer';
import { spacingUnits } from '$spacing';

const themeScaleUnitsMap: Record<ThemeScaleType, Array<ThemeScaleUnit>> = {
  spacing: spacingUnits,
  color: colorUnits,
};

export default themeScaleUnitsMap;
