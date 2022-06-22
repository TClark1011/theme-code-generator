import { Array } from '$/models/utilityTypes';
import CodePresetItem from '$code-generation/models/CodePresetItem';
import {
  baseCssStyleSheetRules,
  baseJsArrayRules,
  baseJsObjectRules,
  baseLessStyleSheetRules,
  baseScssStyleSheetRules,
  baseStylusStyleSheetRules,
  withPxLinePostfix,
  withRemLinePostfix,
  withStringObjectLines,
} from '$code-generation/constants/presets/sharedPresetDefaults';
import { pipe } from '@mobily/ts-belt';

enum SpacingPresetGroup {
  css = 'CSS',
  scss = 'SCSS',
  stylus = 'Stylus',
  less = 'Less',
  js = 'Javascript',
}

// TODO: Give Code preset items a 'group' property to group them in the drop down
// TODO: Different presets for different scale types
const spacingPresets: Array<CodePresetItem> = [
  // # CSS presets
  {
    name: 'CSS Variables (px)',
    data: withPxLinePostfix(baseCssStyleSheetRules),
    group: SpacingPresetGroup.css,
  },
  {
    name: 'CSS Variables (rem)',
    data: withRemLinePostfix(baseCssStyleSheetRules),
    group: SpacingPresetGroup.css,
  },
  // # SCSS presets
  {
    name: 'SCSS Variables (px)',
    data: withPxLinePostfix(baseScssStyleSheetRules),
    group: SpacingPresetGroup.scss,
  },
  {
    name: 'SCSS Variables (rem)',
    data: withRemLinePostfix(baseScssStyleSheetRules),
    group: SpacingPresetGroup.scss,
  },
  // # LESS presets
  {
    name: 'LESS Variables (px)',
    data: withPxLinePostfix(baseLessStyleSheetRules),
    group: SpacingPresetGroup.less,
  },
  {
    name: 'LESS Variables (rem)',
    data: withRemLinePostfix(baseLessStyleSheetRules),
    group: SpacingPresetGroup.less,
  },
  // # Stylus presets
  {
    name: 'Stylus Variables (px)',
    data: withPxLinePostfix(baseStylusStyleSheetRules),
    group: SpacingPresetGroup.stylus,
  },
  {
    name: 'Stylus Variables (rem)',
    data: withRemLinePostfix(baseStylusStyleSheetRules),
    group: SpacingPresetGroup.stylus,
  },
  // # JS presets
  {
    name: 'Javascript Number Array',
    data: baseJsArrayRules,
    group: SpacingPresetGroup.js,
  },
  {
    name: 'Javascript String Array (px)',
    data: pipe(baseJsArrayRules, (r) => withPxLinePostfix(r, false), withStringObjectLines),
    group: SpacingPresetGroup.js,
  },
  {
    name: 'Javascript String Array (rem)',
    data: pipe(baseJsArrayRules, (r) => withRemLinePostfix(r, false), withStringObjectLines),
    group: SpacingPresetGroup.js,
  },
  {
    name: 'Javascript Number Dictionary',
    data: baseJsObjectRules,
    group: SpacingPresetGroup.js,
  },
  {
    name: 'Javascript String Dictionary (px)',
    data: pipe(baseJsObjectRules, (r) => withPxLinePostfix(r, false), withStringObjectLines),
    group: SpacingPresetGroup.js,
  },
  {
    name: 'Javascript String Dictionary (rem)',
    data: pipe(baseJsObjectRules, (r) => withRemLinePostfix(r, false), withStringObjectLines),
    group: SpacingPresetGroup.js,
  },
];

export default spacingPresets;
