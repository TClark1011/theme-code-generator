import defaultCodeRules from '$code-generation/constants/defaultCodeRules';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ThemeScaleCodeRules from '$code-generation/models/ThemeScaleCodeRules';

export type CodeGenerationState = {
  codeSystemRules: ThemeScaleCodeRules;
  codeGenerationModalIsOpen: boolean;
  selectedPresetName: string | undefined;
  savedDecimalReplacementRule: string | undefined;
};

const initialState: CodeGenerationState = {
  codeSystemRules: defaultCodeRules,
  codeGenerationModalIsOpen: false,
  selectedPresetName: undefined,
  savedDecimalReplacementRule: undefined,
};

const codeGenerationSlice = createSlice({
  name: 'codeGeneration',
  initialState,
  reducers: {
    updateCodeRules: (
      state: CodeGenerationState,
      { payload }: PayloadAction<ThemeScaleCodeRules>
    ) => {
      state.codeSystemRules = payload;
    },
    setCodeGenerationModalIsOpen: (
      state: CodeGenerationState,
      { payload }: PayloadAction<boolean>
    ) => {
      state.codeGenerationModalIsOpen = payload;
    },
    disableDecimalPointReplacementInKeys: (state: CodeGenerationState) => {
      state.savedDecimalReplacementRule = state.codeSystemRules.keyDecimalPointReplacement;
      state.codeSystemRules.keyDecimalPointReplacement = undefined;
    },
    enableDecimalPointReplacementInKeys: (state: CodeGenerationState) => {
      state.codeSystemRules.keyDecimalPointReplacement = state.savedDecimalReplacementRule;
    },
    setSelectedPresetName: (state: CodeGenerationState, { payload }: PayloadAction<string>) => {
      state.selectedPresetName = payload;
    },
  },
});

export const {
  setCodeGenerationModalIsOpen,
  updateCodeRules,
  disableDecimalPointReplacementInKeys,
  enableDecimalPointReplacementInKeys,
  setSelectedPresetName,
} = codeGenerationSlice.actions;

const codeGenerationReducer = codeGenerationSlice.reducer;

export default codeGenerationReducer;
