import { baseStyleSheetCodeRules, CodePresetItem } from '$code-generation';
import { deepUpdate } from '$deep-merge';
import { Array } from '$/models/utilityTypes';

const colorCodePresets: Array<CodePresetItem> = [
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
export default colorCodePresets;
