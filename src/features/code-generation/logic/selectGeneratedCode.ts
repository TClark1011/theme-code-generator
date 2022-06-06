import { printThemeScaleCode } from '$code-generation/model';
import { Selector } from '$/logic';

const selectGeneratedCode: Selector<string> = ({ codeGeneration, general, spacing }) => {
  const { codeSystemRules } = codeGeneration;
  const values = spacing.selectedScale.values;
  const selectedScaleType = general.selectedScaleType;

  return printThemeScaleCode({
    ...codeSystemRules,
    values: values.map((v) => v.value).map(String),
    label: selectedScaleType,
  });
};

export default selectGeneratedCode;
