import { Array } from '$/models';

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

export const printThemeScaleCodeLine = ({
  prefix,
  label,
  index,
  labelIndexSeparator,
  indexValueSeparator,
  value,
  postfix,
  showLabel,
  showIndex,
}: ThemeScaleCodeLine): string =>
  [
    prefix,
    ...(showLabel ? [label, labelIndexSeparator] : []),
    ...(showIndex ? [index, indexValueSeparator] : []),
    value,
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

export const printThemeScaleCode = (system: ThemeScaleCodeSystem): string => {
  const lines = system.values
    .map((v, index) =>
      printThemeScaleCodeLine({
        ...system.lineRules,
        value: v,
        label: system.label,
        index: `${index}`,
      })
    )
    .map((val) => (system.indentValues ? `  ${val}` : val))
    .join(system.lineBreaks ? '\n' : ' ');
  const joined = [system.prefix, lines, system.postfix].join('\n');
  return joined;
};
