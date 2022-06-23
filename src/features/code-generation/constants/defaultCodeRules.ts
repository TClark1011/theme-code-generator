import ThemeScaleCodeRules from '$code-generation/models/ThemeScaleCodeRules';

const defaultCodeRules: ThemeScaleCodeRules = {
  useIndentation: true,
  useLineBreaks: true,
  postfix: '',
  prefix: '',
  keyValueSeparator: '',
  labelKeySeparator: '',
  linePostfix: '',
  linePrefix: '',
  showKey: true,
  showLabel: true,
  keyDecimalPointReplacement: undefined,
  lineBreakAfterPrefix: true,
  lineBreakBeforePostfix: true,
};

export default defaultCodeRules;
