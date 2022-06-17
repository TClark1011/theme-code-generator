import { deepUpdate } from '$deep-merge';
import { Array } from '$/models/utilityTypes';
import baseStyleSheetCodeRules from '$code-generation/constants/baseStyleSheetCodeRules';
import CodePresetItem from '$code-generation/models/CodePresetItem';

const colorPresets: Array<CodePresetItem> = [
  {
    name: 'CSS Variables',
    data: deepUpdate(baseStyleSheetCodeRules, {
      prefix: 'html {',
      postfix: '}',
      linePrefix: '--',
    }),
  },
  {
    name: 'SCSS Variables',
    data: deepUpdate(baseStyleSheetCodeRules, {
      linePrefix: '$',
    }),
  },
  {
    name: 'Less Variables',
    data: deepUpdate(baseStyleSheetCodeRules, {
      linePrefix: '@',
    }),
  },
];
export default colorPresets;
