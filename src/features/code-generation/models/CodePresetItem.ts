import ThemeScaleCodeRules from '$code-generation/models/ThemeScaleCodeRules';

type CodePresetItem = {
  name: string;
  data: ThemeScaleCodeRules;
  group?: string;
};

export default CodePresetItem;
