import { codeFormValuesToSystemRules } from '$code-generation/logic';
import { defaultCodeSystem } from '$code-generation/constants';
import {
  ThemeScaleCodeSystemRules,
  ThemeScaleFormProps,
} from '$code-generation/models/themeCodeTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CodeGenerationState = {
  codeSystemRules: ThemeScaleCodeSystemRules;
  codeGenerationModalIsOpen: boolean;
};

const initialState: CodeGenerationState = {
  codeSystemRules: defaultCodeSystem,
  codeGenerationModalIsOpen: false,
};

const codeGenerationSlice = createSlice({
  name: 'codeGeneration',
  initialState,
  reducers: {
    updateCodeSystemFromForm: (
      state: CodeGenerationState,
      { payload }: PayloadAction<ThemeScaleFormProps>
    ) => {
      const newSystemRules = codeFormValuesToSystemRules(payload);
      state.codeSystemRules = newSystemRules;
    },
    setCodeGenerationModalIsOpen: (
      state: CodeGenerationState,
      { payload }: PayloadAction<boolean>
    ) => {
      state.codeGenerationModalIsOpen = payload;
    },
  },
});

export const { setCodeGenerationModalIsOpen, updateCodeSystemFromForm } =
  codeGenerationSlice.actions;

const codeGenerationReducer = codeGenerationSlice.reducer;

export default codeGenerationReducer;
