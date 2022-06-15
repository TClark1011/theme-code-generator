import defaultCodeRules from '$code-generation/constants/defaultCodeRules';
import { deepUpdate } from '$deep-merge';

const baseStyleSheetCodeRules = deepUpdate(defaultCodeRules, {
  keyDecimalPointReplacement: '_',
  keyValueSeparator: ': ',
  labelKeySeparator: '-',
});

export default baseStyleSheetCodeRules;
