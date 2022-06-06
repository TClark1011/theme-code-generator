import { ThemeScaleCodeSystem } from '$code-generation/model';

const defaultCodeSystem: ThemeScaleCodeSystem = {
  indentValues: true,
  label: 'spacing',
  lineBreaks: true,
  postfix: '',
  prefix: '',
  values: [],
  lineRules: {
    indexValueSeparator: ' ',
    labelIndexSeparator: ' ',
    postfix: '',
    prefix: '',
    showIndex: true,
    showLabel: true,
  },
};

export default defaultCodeSystem;
