import { ThemeScaleUnit } from '$/models/ThemeScale';
import { Array, KeyValuePair } from '$/models/utilityTypes';
import { _prepend } from '$/utils/prepend';
import { A, F, pipe, S } from '@mobily/ts-belt';

type ThemeScaleCodeRules = {
  linePrefix: string;
  linePostfix: string;
  labelKeySeparator: string;
  keyValueSeparator: string;
  prefix: string;
  postfix: string;
  useLineBreaks: boolean;
  keyDecimalPointReplacement: string | undefined;
  showKey: boolean;
  showLabel: boolean;
  lineBreakAfterPrefix: boolean;
  lineBreakBeforePostfix: boolean;
  useIndentation: boolean;
};

export type ThemeScaleCodeItem = KeyValuePair<string> & { label: string; unit: ThemeScaleUnit };

export const printThemeScaleCodeItem = (
  { key, value, label, unit }: ThemeScaleCodeItem,
  {
    linePrefix,
    linePostfix,
    labelKeySeparator,
    keyValueSeparator,
    keyDecimalPointReplacement,
    showKey,
    showLabel,
  }: ThemeScaleCodeRules
): string => {
  const keyDecimalPointReplacer = S.replace('.', keyDecimalPointReplacement ?? '.');

  const finalValue = unit.converter(value);
  const finalKey = pipe(
    key,
    keyDecimalPointReplacer,
    F.unless(
      () => showKey,
      () => ''
    )
  );
  const finalLabel = showLabel ? label : '';

  return `${linePrefix}${finalLabel}${labelKeySeparator}${finalKey}${keyValueSeparator}${finalValue}${linePostfix}`;
};

const lineBreakAtEndRegex = /\n$/;
export const printThemeScaleCode = (
  items: Array<ThemeScaleCodeItem>,
  rules: ThemeScaleCodeRules
): string => {
  const {
    prefix,
    lineBreakAfterPrefix,
    postfix,
    lineBreakBeforePostfix,
    useIndentation,
    useLineBreaks,
  } = rules;

  const finalPrefix = `${prefix}${lineBreakAfterPrefix && prefix ? '\n' : ''}`;
  const finalPostfix = `${lineBreakBeforePostfix && postfix ? '\n' : ''}${postfix}`;

  const perLineIndentationIfUsing = useLineBreaks && useIndentation ? '\t' : '';
  const lineBreaksIfUsing = useLineBreaks ? '\n' : '';

  const body = pipe(
    items,
    A.map((item) => printThemeScaleCodeItem(item, rules)),
    A.map(_prepend(perLineIndentationIfUsing)),
    A.map(S.concat(lineBreaksIfUsing)),
    A.join(''),
    S.replaceByRe(lineBreakAtEndRegex, '')
  );

  return `${finalPrefix}${body}${finalPostfix}`;
};

export default ThemeScaleCodeRules;
