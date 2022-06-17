import { Array } from '$/models/utilityTypes';
import { ThemeScaleType } from '$/store/generalReducer';
import CodePresetItem from '$code-generation/models/CodePresetItem';
import { colorPresets, spacingPresets } from '$code-generation/constants/presets';

// TODO: Give Code preset items a 'group' property to group them in the drop down
// TODO: Different presets for different scale types
const codePresets: Record<ThemeScaleType, Array<CodePresetItem>> = {
  spacing: spacingPresets,
  color: colorPresets,
};

export default codePresets;
