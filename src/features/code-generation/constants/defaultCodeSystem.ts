import { ThemeScaleCodeSystem } from '$code-generation/models/themeCodeTypes';

const defaultCodeSystem: ThemeScaleCodeSystem = {
  indentValues: true,
  label: 'spacing',
  lineBreaks: true,
  postfix: '',
  prefix: '',
  values: [],
  lineRules: {
    keyValueSeparator: ' ',
    labelKeySeparator: ' ',
    postfix: '',
    prefix: '',
    showKey: true,
    showLabel: true,
  },
};

export default defaultCodeSystem;
