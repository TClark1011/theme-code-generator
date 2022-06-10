import { stubThemeScaleUnit, ThemeScaleUnit } from '$/models/ThemeScale';
import { Array, KeyValuePair, PrefixKeys } from '$/models/utilityTypes';
import { F, S } from '@mobily/ts-belt';
import { Except } from 'type-fest';

export type ThemeScaleCodeLine = {
  prefix: string;
  labelKeySeparator: string;
  keyValueSeparator: string;
  postfix: string;
  label: string;
  key: string;
  value: string;
  showLabel: boolean;
  showKey: boolean;
  keyDecimalPointSubstitution: string | undefined;
};

export type ThemeScaleCodeLineRules = Omit<ThemeScaleCodeLine, 'key' | 'label' | 'value'>;

const composeDecimalPointReplacer = (
  keyDecimalPointSubstitution?: string
): ((p: string) => string) =>
  keyDecimalPointSubstitution === undefined
    ? F.identity
    : S.replaceAll('.', keyDecimalPointSubstitution);

export const printThemeScaleCodeLine = (
  {
    prefix,
    label,
    key,
    labelKeySeparator,
    keyValueSeparator,
    value,
    postfix,
    showLabel,
    showKey,
    keyDecimalPointSubstitution,
  }: ThemeScaleCodeLine,
  unit: ThemeScaleUnit = stubThemeScaleUnit
): string => {
  const decimalPointReplacer = composeDecimalPointReplacer(keyDecimalPointSubstitution);
  return [
    prefix,
    ...(showLabel ? [label, labelKeySeparator] : []),
    ...(showKey ? [decimalPointReplacer(key), keyValueSeparator] : []),
    unit.converter(value),
    postfix,
  ].join('');
};

export type ThemeScaleCodeSystem = {
  postfix: string;
  prefix: string;
  lineBreaks: boolean;
  lineRules: ThemeScaleCodeLineRules;
  label: string;
  values: Array<KeyValuePair<string>>;
  indentValues: boolean;
};

export type ThemeScaleCodeSystemRules = Omit<ThemeScaleCodeSystem, 'label' | 'values'>;
export type ThemeScaleCodeSystemValues = Omit<
  ThemeScaleCodeSystem,
  keyof ThemeScaleCodeSystemRules
>;

export const printThemeScaleCode = (
  system: ThemeScaleCodeSystem,
  unit: ThemeScaleUnit = stubThemeScaleUnit
): string => {
  const lines = system.values
    .map(({ value, key }) =>
      printThemeScaleCodeLine(
        {
          ...system.lineRules,
          value,
          label: system.label,
          key,
        },
        unit
      )
    ) //First we convert each line item to code
    .map((val) => (system.indentValues && system.lineBreaks ? `  ${val}` : val)) // If we are using line breaks and indentation, we indent each line
    .join(system.lineBreaks ? '\n' : ''); // We apply line breaks if we are using them

  const tabPrefixedLines = system.indentValues && !system.lineBreaks ? ` \t${lines}` : lines; //If using indentation but not line breaks, we add a single indent to the single line
  const joined = [system.prefix, tabPrefixedLines, system.postfix].join('\n'); // We join the lines and the general prefix/postfix, separated by line breaks
  return joined;
};

export type ThemeScaleFormProps = Except<ThemeScaleCodeSystemRules, 'lineRules'> &
  PrefixKeys<ThemeScaleCodeSystemRules['lineRules'], 'lineRules.'>;
