import expectParam from '$/utils/expectParam';
import defaultCodeRules from '$code-generation/constants/defaultCodeRules';
import { ThemeScaleCodeRules } from '$code-generation/models';
import { deepUpdate } from '$deep-merge';
import { D, flow, S } from '@mobily/ts-belt';

export const withRemLinePostfix = (baseRules: ThemeScaleCodeRules, includeSemicolon = true) =>
  deepUpdate(baseRules, {
    linePostfix: `rem${includeSemicolon ? ';' : ''}`,
  });

export const withPxLinePostfix = (baseRules: ThemeScaleCodeRules, includeSemicolon = true) =>
  deepUpdate(baseRules, {
    linePostfix: `px${includeSemicolon ? ';' : ''}`,
  });

export const withStringObjectLines = flow(
  expectParam<ThemeScaleCodeRules>(),
  D.updateUnsafe('keyValueSeparator', (val) => `${val}"`),
  D.updateUnsafe('linePostfix', flow(S.remove(','), S.concat('",')))
);

const codeRulePresetBaseLine = deepUpdate(defaultCodeRules, {
  linePostfix: '',
  linePrefix: '',
  keyValueSeparator: '',
  labelKeySeparator: '',
});

const baseStyleSheetCodeRules = deepUpdate(codeRulePresetBaseLine, {
  keyDecimalPointReplacement: '_',
  keyValueSeparator: ': ',
  labelKeySeparator: '-',
  linePostfix: ';',
});

export const baseCssStyleSheetRules = deepUpdate(baseStyleSheetCodeRules, {
  prefix: 'html {',
  postfix: '}',
  linePrefix: '--',
});

export const baseScssStyleSheetRules = deepUpdate(baseStyleSheetCodeRules, {
  useIndentation: false,
  linePrefix: '$',
});

export const baseLessStyleSheetRules = deepUpdate(baseStyleSheetCodeRules, {
  useIndentation: false,
  linePrefix: '@',
});

export const baseStylusStyleSheetRules = deepUpdate(baseStyleSheetCodeRules, {
  useIndentation: false,
  linePrefix: '',
  labelKeySeparator: ' = ',
});

export const baseJsArrayRules = deepUpdate(codeRulePresetBaseLine, {
  prefix: '[',
  postfix: ']',
  linePostfix: ',',
  showLabel: false,
  showKey: false,
});

export const baseJsObjectRules = deepUpdate(codeRulePresetBaseLine, {
  prefix: '{',
  linePostfix: ',',
  keyValueSeparator: ': ',
  showLabel: false,
  postfix: '}',
});
