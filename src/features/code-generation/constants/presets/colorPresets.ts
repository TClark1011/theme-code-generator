import { Array } from '$/models/utilityTypes';
import CodePresetItem from '$code-generation/models/CodePresetItem';
import {
  baseCssStyleSheetRules,
  baseJsArrayRules,
  baseJsObjectRules,
  baseLessStyleSheetRules,
  baseScssStyleSheetRules,
  baseStylusStyleSheetRules,
  withStringObjectLines,
} from '$code-generation/constants/presets/sharedPresetDefaults';

const jsGroupName = 'Javascript';

const colorPresets: Array<CodePresetItem> = [
  {
    name: 'CSS Variables',
    data: baseCssStyleSheetRules,
  },
  {
    name: 'SCSS Variables',
    data: baseScssStyleSheetRules,
  },
  {
    name: 'Less Variables',
    data: baseLessStyleSheetRules,
  },
  {
    name: 'Stylus Variables',
    data: baseStylusStyleSheetRules,
  },
  {
    name: 'Javascript Array',
    data: withStringObjectLines(baseJsArrayRules),
    group: jsGroupName,
  },
  {
    name: 'Javascript Dictionary',
    data: withStringObjectLines(baseJsObjectRules),
    group: jsGroupName,
  },
];
export default colorPresets;
