import { Selector, selectScaleValues } from '$/logic';
import { ThemeScaleCodeSystem, ThemeScaleCodeSystemRules } from '$code-generation/model';

const selectCodeGenerationRelatedState =
  (rulesFromForm: ThemeScaleCodeSystemRules): Selector<ThemeScaleCodeSystem> =>
  (state) => {
    const values = selectScaleValues(state);
    const label = state.general.selectedScaleType;

    return {
      label,
      values,
      ...rulesFromForm,
    };
  };

export default selectCodeGenerationRelatedState;
