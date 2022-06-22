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

enum SpacingPresetGroup {
  css = 'CSS',
  scss = 'SCSS',
  stylus = 'Stylus',
  less = 'Less',
}

// TODO: Give Code preset items a 'group' property to group them in the drop down
// TODO: Different presets for different scale types
const spacingPresets: Array<CodePresetItem> = [
  {
    name: 'CSS Variables (px)',
    data: cssVarPxSystem,
    group: SpacingPresetGroup.css,
  },
  {
    name: 'CSS Variables (rem)',
    data: withRemLinePostfix(cssVarPxSystem),
    group: SpacingPresetGroup.css,
  },
  {
    name: 'SCSS Variables (px)',
    data: scssVarPxSystem,
    group: SpacingPresetGroup.scss,
  },
  {
    name: 'SCSS Variables (rem)',
    data: withRemLinePostfix(scssVarPxSystem),
    group: SpacingPresetGroup.scss,
  },
  {
    name: 'LESS Variables (px)',
    data: lessVarPxSystem,
    group: SpacingPresetGroup.less,
  },
  {
    name: 'LESS Variables (rem)',
    data: withRemLinePostfix(lessVarPxSystem),
    group: SpacingPresetGroup.less,
  },
  {
    name: 'Stylus Variables (px)',
    data: stylusVarPxSystem,
    group: SpacingPresetGroup.stylus,
  },
  {
    name: 'Stylus Variables (rem)',
    data: withRemLinePostfix(stylusVarPxSystem),
    group: SpacingPresetGroup.stylus,
  },
];

export default spacingPresets;
