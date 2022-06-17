import { ThemeScaleUnit } from '$/models/ThemeScale';
import { Array } from '$/models/utilityTypes';
import { ThemeScaleType } from '$/store/generalReducer';
import spacingUnits from '$code-generation/constants/units/spacingUnits';
import colorUnits from '$code-generation/constants/units/colorUnits';

const scaleUnits: Record<ThemeScaleType, Array<ThemeScaleUnit>> = {
  spacing: spacingUnits,
  color: colorUnits,
};

export default scaleUnits;
