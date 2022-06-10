import {
  ThemeScaleCodeLineRules,
  ThemeScaleCodeSystemRules,
} from '$code-generation/models/themeCodeTypes';
import { Array, NameDataPair } from '$/models/utilityTypes';
import { ThemeScaleType } from '$/store/generalReducer';
import { D } from '@mobily/ts-belt';

export type CodePresetItem = NameDataPair<ThemeScaleCodeSystemRules>;

const updateCodeSystemLineRules = (
  system: ThemeScaleCodeSystemRules,
  newLineRules: Partial<ThemeScaleCodeLineRules>
): ThemeScaleCodeSystemRules => D.updateUnsafe(system, 'lineRules', D.merge(newLineRules));

const cssVarPxSystem: ThemeScaleCodeSystemRules = {
  indentValues: true,
  lineBreaks: true,
  prefix: 'html {',
  postfix: '}',
  lineRules: {
    keyDecimalPointSubstitution: '_',
    keyValueSeparator: ': ',
    labelKeySeparator: '-',
    postfix: 'px;',
    prefix: '--',
    showKey: true,
    showLabel: true,
  },
};

const scssVarPxSystem = updateCodeSystemLineRules(cssVarPxSystem, {
  prefix: '$',
});

const lessVarPxSystem = updateCodeSystemLineRules(cssVarPxSystem, {
  prefix: '@',
});

const stylusVarPxSystem = updateCodeSystemLineRules(cssVarPxSystem, {
  prefix: '',
  keyValueSeparator: ' = ',
});

const codePresets: Record<ThemeScaleType, Array<CodePresetItem>> = {
  spacing: [
    {
      name: 'CSS Variables (px)',
      data: cssVarPxSystem,
    },
    {
      name: 'CSS Variables (rem)',
      data: updateCodeSystemLineRules(cssVarPxSystem, {
        postfix: 'rem;',
      }),
    },
    {
      name: 'SCSS Variables (px)',
      data: scssVarPxSystem,
    },
    {
      name: 'SCSS Variables (rem)',
      data: updateCodeSystemLineRules(scssVarPxSystem, {
        postfix: 'rem;',
      }),
    },
    {
      name: 'LESS Variables (px)',
      data: lessVarPxSystem,
    },
    {
      name: 'LESS Variables (rem)',
      data: updateCodeSystemLineRules(lessVarPxSystem, {
        postfix: 'rem;',
      }),
    },
    {
      name: 'Stylus Variables (px)',
      data: stylusVarPxSystem,
    },
    {
      name: 'Stylus Variables (rem)',
      data: updateCodeSystemLineRules(stylusVarPxSystem, {
        postfix: 'rem;',
      }),
    },
  ],
};

export default codePresets;
