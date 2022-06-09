import { stubThemeScaleUnit, ThemeScaleUnit } from '$/models/ThemeScale';
import { PrefixKeys } from '$/models/utilityTypes';
import { Except } from 'type-fest';

export type ThemeScaleCodeLine = {
  prefix: string;
  labelIndexSeparator: string;
  indexValueSeparator: string;
  postfix: string;
  label: string;
  index: string;
  value: string;
  showLabel: boolean;
  showIndex: boolean;
};

export type ThemeScaleCodeLineRules = Omit<ThemeScaleCodeLine, 'index' | 'label' | 'value'>;

//TODO: RENAME USES OF THE FIELD NAMES 'index' AND 'label'. 'index' SHOULD BECOME 'key', CURRENTLY UNDECIDED WHAT TO CHANGE 'label' to,
export const printThemeScaleCodeLine = (
  {
    prefix,
    label,
    index,
    labelIndexSeparator,
    indexValueSeparator,
    value,
    postfix,
    showLabel,
    showIndex,
  }: ThemeScaleCodeLine,
  unit: ThemeScaleUnit = stubThemeScaleUnit
): string =>
  [
    prefix,
    ...(showLabel ? [label, labelIndexSeparator] : []),
    ...(showIndex ? [index, indexValueSeparator] : []),
    unit.converter(value),
    postfix,
  ].join('');

export type ThemeScaleCodeSystem = {
  postfix: string;
  prefix: string;
  lineBreaks: boolean;
  lineRules: ThemeScaleCodeLineRules;
  label: string;
  values: Array<string>;
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
    .map((v, index) =>
      printThemeScaleCodeLine(
        {
          ...system.lineRules,
          value: v,
          label: system.label,
          index: `${index}`,
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
