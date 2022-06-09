import {
  ThemeScaleCodeSystemRules,
  ThemeScaleFormProps,
  ThemeScaleCodeLineRules,
} from '$code-generation/models/themeCodeTypes';
import { D } from '@mobily/ts-belt';
import { Except } from 'type-fest';
export const removeLineRuleKeys = (
  p: ThemeScaleFormProps
): Except<ThemeScaleCodeSystemRules, 'lineRules'> =>
  D.deleteKeys(p, [
    'lineRules.keyValueSeparator',
    'lineRules.labelKeySeparator',
    'lineRules.labelKeySeparator',
    'lineRules.postfix',
    'lineRules.prefix',
  ]);

export const getLineRulesFromFormValue = (
  formValues: ThemeScaleFormProps
): ThemeScaleCodeLineRules => ({
  keyValueSeparator: formValues['lineRules.keyValueSeparator'],
  labelKeySeparator: formValues['lineRules.labelKeySeparator'],
  postfix: formValues['lineRules.postfix'],
  prefix: formValues['lineRules.prefix'],
  showLabel: formValues['lineRules.showLabel'],
  showKey: formValues['lineRules.showKey'],
});

export const codeFormValuesToSystemRules = (
  formValues: ThemeScaleFormProps
): ThemeScaleCodeSystemRules => ({
  ...removeLineRuleKeys(formValues),
  lineRules: getLineRulesFromFormValue(formValues),
});

export const systemToFormValues = (system: ThemeScaleCodeSystemRules): ThemeScaleFormProps => ({
  'lineRules.keyValueSeparator': system.lineRules.keyValueSeparator,
  'lineRules.labelKeySeparator': system.lineRules.labelKeySeparator,
  'lineRules.postfix': system.lineRules.postfix,
  'lineRules.prefix': system.lineRules.prefix,
  'lineRules.showLabel': system.lineRules.showLabel,
  'lineRules.showKey': system.lineRules.showKey,
  indentValues: system.indentValues,
  lineBreaks: system.lineBreaks,
  postfix: system.postfix,
  prefix: system.prefix,
});
