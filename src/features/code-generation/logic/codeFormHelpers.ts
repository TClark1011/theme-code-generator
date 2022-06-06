import {
  ThemeScaleCodeSystemRules,
  ThemeScaleFormProps,
  ThemeScaleCodeLineRules,
} from '$code-generation/model';
import { D } from '@mobily/ts-belt';
import { Except } from 'type-fest';

export const removeLineRuleKeys: (
  p: ThemeScaleFormProps
) => Except<ThemeScaleCodeSystemRules, 'lineRules'> = D.deleteKeys([
  'lineRules.indexValueSeparator',
  'lineRules.labelIndexSeparator',
  'lineRules.labelIndexSeparator',
  'lineRules.postfix',
  'lineRules.prefix',
]);

export const getLineRulesFromFormValue = (
  formValues: ThemeScaleFormProps
): ThemeScaleCodeLineRules => ({
  indexValueSeparator: formValues['lineRules.indexValueSeparator'],
  labelIndexSeparator: formValues['lineRules.labelIndexSeparator'],
  postfix: formValues['lineRules.postfix'],
  prefix: formValues['lineRules.prefix'],
  showLabel: formValues['lineRules.showLabel'],
  showIndex: formValues['lineRules.showIndex'],
});

export const codeFormValuesToSystemRules = (
  formValues: ThemeScaleFormProps
): ThemeScaleCodeSystemRules => ({
  ...removeLineRuleKeys(formValues),
  lineRules: getLineRulesFromFormValue(formValues),
});

export const systemToFormValues = (system: ThemeScaleCodeSystemRules): ThemeScaleFormProps => ({
  'lineRules.indexValueSeparator': system.lineRules.indexValueSeparator,
  'lineRules.labelIndexSeparator': system.lineRules.labelIndexSeparator,
  'lineRules.postfix': system.lineRules.postfix,
  'lineRules.prefix': system.lineRules.prefix,
  'lineRules.showLabel': system.lineRules.showLabel,
  'lineRules.showIndex': system.lineRules.showIndex,
  indentValues: system.indentValues,
  lineBreaks: system.lineBreaks,
  postfix: system.postfix,
  prefix: system.prefix,
});

console.log('(codeFormHelpers) systemToFormValues: ', systemToFormValues);
