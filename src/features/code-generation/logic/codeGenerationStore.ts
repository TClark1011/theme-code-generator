import { RootStoreModel } from '$/logic';
import { ThemeScaleCodeSystemRules, ThemeScaleFormProps } from '$code-generation/model';
import { codeFormValuesToSystemRules } from '$code-generation/logic';
import { defaultCodeSystem } from '$code-generation/constants';
import { F } from '@mobily/ts-belt';
import { createModel } from '@rematch/core';

export type CodeGenerationStoreModel = {
  codeSystemRules: ThemeScaleCodeSystemRules;
  codeGenerationModalIsOpen: boolean;
};

const codeGenerationStore = createModel<RootStoreModel>()({
  state: F.identity<CodeGenerationStoreModel>({
    codeSystemRules: defaultCodeSystem,
    codeGenerationModalIsOpen: false,
  }),
  reducers: {
    updateCodeSystemFromForm: (state, payload: ThemeScaleFormProps) => {
      const newSystemRules = codeFormValuesToSystemRules(payload);
      state.codeSystemRules = newSystemRules;
    },
    setCodeGenerationModalIsOpen: (state, payload: boolean) => {
      state.codeGenerationModalIsOpen = payload;
    },
  },
});

export default codeGenerationStore;
