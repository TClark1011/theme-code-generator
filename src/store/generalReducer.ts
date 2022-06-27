import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { findItemWithId } from '$entity-helpers';
import { scaleUnits, colorUnits, spacingPxUnit } from '$code-generation';
import { N } from '@mobily/ts-belt';

export type ThemeScaleType = 'spacing' | 'color';
export type StepNumber = 0 | 1 | 2 | 3;
export type GeneralState = {
  selectedScaleType: ThemeScaleType;
  selectedUnitIds: Record<ThemeScaleType, string>;
  stepNumber: StepNumber;
};

const initialState: GeneralState = {
  selectedScaleType: 'spacing',
  selectedUnitIds: {
    spacing: spacingPxUnit.id,
    color: colorUnits[0].id,
  },
  stepNumber: 0,
};

const clampToValidStepNumber = N.clamp(0, 3) as (p: number) => StepNumber;

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setSelectedScaleType: (state: GeneralState, { payload }: PayloadAction<ThemeScaleType>) => {
      state.selectedScaleType = payload;
    },
    selectNewScaleUnitFromId: (state: GeneralState, { payload }: PayloadAction<string>) => {
      const newScaleUnit = findItemWithId(scaleUnits[state.selectedScaleType], payload);

      if (!newScaleUnit) throw new Error(`Theme scale unit with id '${payload}' does not exist`);

      state.selectedUnitIds[state.selectedScaleType] = newScaleUnit.id;
    },
    gotoNextStep: (state: GeneralState) => {
      state.stepNumber = clampToValidStepNumber(state.stepNumber + 1);
    },
    gotoPreviousStep: (state: GeneralState) => {
      state.stepNumber = clampToValidStepNumber(state.stepNumber - 1);
    },
    gotoStep: (state: GeneralState, { payload }: PayloadAction<StepNumber>) => {
      state.stepNumber = clampToValidStepNumber(payload);
    },
  },
});

export const {
  setSelectedScaleType,
  selectNewScaleUnitFromId,
  gotoNextStep,
  gotoStep,
  gotoPreviousStep,
} = generalSlice.actions;

const generalReducer = generalSlice.reducer;

export default generalReducer;
