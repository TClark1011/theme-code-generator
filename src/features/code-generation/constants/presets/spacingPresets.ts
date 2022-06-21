import ThemeScaleCodeRules from '$code-generation/models/ThemeScaleCodeRules';
import { Array } from '$/models/utilityTypes';
import { deepUpdate } from '$deep-merge';
import CodePresetItem from '$code-generation/models/CodePresetItem';
import baseStyleSheetCodeRules from '$code-generation/constants/baseStyleSheetCodeRules';

const withRemLinePostfix = (baseRules: ThemeScaleCodeRules) =>
  deepUpdate(baseRules, {
    linePostfix: 'rem;',
  });

const baseStyleSheetPxSystem = deepUpdate(baseStyleSheetCodeRules, {
  linePostfix: 'px;',
});

const cssVarPxSystem = deepUpdate(baseStyleSheetPxSystem, {
  prefix: 'html {',
  postfix: '}',
  linePrefix: '--',
});

const scssVarPxSystem = deepUpdate(baseStyleSheetPxSystem, {
  linePrefix: '$',
  useIndentation: false,
});

const lessVarPxSystem = deepUpdate(scssVarPxSystem, {
  linePrefix: '@',
});

const stylusVarPxSystem = deepUpdate(scssVarPxSystem, {
  linePrefix: '',
  keyValueSeparator: ' = ',
});

// TODO: Give Code preset items a 'group' property to group them in the drop down
// TODO: Different presets for different scale types
const spacingPresets: Array<CodePresetItem> = [
  {
    name: 'CSS Variables (px)',
    data: cssVarPxSystem,
  },
  {
    name: 'CSS Variables (rem)',
    data: withRemLinePostfix(cssVarPxSystem),
  },
  {
    name: 'SCSS Variables (px)',
    data: scssVarPxSystem,
  },
  {
    name: 'SCSS Variables (rem)',
    data: withRemLinePostfix(scssVarPxSystem),
  },
  {
    name: 'LESS Variables (px)',
    data: lessVarPxSystem,
  },
  {
    name: 'LESS Variables (rem)',
    data: withRemLinePostfix(lessVarPxSystem),
  },
  {
    name: 'Stylus Variables (px)',
    data: stylusVarPxSystem,
  },
  {
    name: 'Stylus Variables (rem)',
    data: withRemLinePostfix(stylusVarPxSystem),
  },
];

export default spacingPresets;