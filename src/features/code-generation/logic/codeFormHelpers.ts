import {
  ThemeScaleCodeSystemRules,
  ThemeScaleFormProps,
  ThemeScaleCodeLineRules,
} from '$code-generation/models/themeCodeTypes';
import { D, S } from '@mobily/ts-belt';
import { Except } from 'type-fest';

export const removeLineRuleKeys = (
  p: ThemeScaleFormProps
): Except<ThemeScaleCodeSystemRules, 'lineRules'> =>
  D.rejectWithKey(p, (key) => S.includes(key, 'lineRules.')) as Except<
    ThemeScaleCodeSystemRules,
    'lineRules'
  >;

export const getLineRulesFromFormValue = (
  formValues: ThemeScaleFormProps
): ThemeScaleCodeLineRules => ({
  keyValueSeparator: formValues['lineRules.keyValueSeparator'],
  labelKeySeparator: formValues['lineRules.labelKeySeparator'],
  postfix: formValues['lineRules.postfix'],
  prefix: formValues['lineRules.prefix'],
  showLabel: formValues['lineRules.showLabel'],
  showKey: formValues['lineRules.showKey'],
  keyDecimalPointSubstitution: formValues['lineRules.keyDecimalPointSubstitution'],
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
  'lineRules.keyDecimalPointSubstitution': system.lineRules.keyDecimalPointSubstitution,
  indentValues: system.indentValues,
  lineBreaks: system.lineBreaks,
  postfix: system.postfix,
  prefix: system.prefix,
});
