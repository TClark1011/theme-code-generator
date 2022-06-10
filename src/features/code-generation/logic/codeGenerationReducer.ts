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
  selectedPresetName: string | undefined;
};

const initialState: CodeGenerationState = {
  codeSystemRules: defaultCodeSystem,
  codeGenerationModalIsOpen: false,
  selectedPresetName: undefined,
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
    disableDecimalPointSubstitutionInKeys: (state: CodeGenerationState) => {
      state.codeSystemRules.lineRules.keyDecimalPointSubstitution = undefined;
    },
    enableDecimalPointSubstitutionInKeys: (
      state: CodeGenerationState,
      { payload }: PayloadAction<string>
    ) => {
      state.codeSystemRules.lineRules.keyDecimalPointSubstitution = payload;
    },
    setSelectedPresetName: (state: CodeGenerationState, { payload }: PayloadAction<string>) => {
      state.selectedPresetName = payload;
    },
  },
});

export const {
  setCodeGenerationModalIsOpen,
  updateCodeSystemFromForm,
  disableDecimalPointSubstitutionInKeys,
  enableDecimalPointSubstitutionInKeys,
  setSelectedPresetName,
} = codeGenerationSlice.actions;

const codeGenerationReducer = codeGenerationSlice.reducer;

export default codeGenerationReducer;
