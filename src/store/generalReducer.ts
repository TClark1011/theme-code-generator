import { ThemeScaleUnit } from '$/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { themeScaleUnitsMap } from '$/constants';
import { findItemWithId } from '$entity-helpers';
import { spacingPxUnit } from '$spacing';

export type ThemeScaleType = 'spacing';
export type GeneralState = {
  selectedScaleType: ThemeScaleType;
  selectedUnits: Record<ThemeScaleType, ThemeScaleUnit>;
};

const initialState: GeneralState = {
  selectedScaleType: 'spacing',
  selectedUnits: {
    spacing: spacingPxUnit,
  },
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    selectScaleType: (state: GeneralState, { payload }: PayloadAction<ThemeScaleType>) => {
      state.selectedScaleType = payload;
    },
    selectNewScaleUnitFromId: (state: GeneralState, { payload }: PayloadAction<string>) => {
      const newScaleUnit = findItemWithId(themeScaleUnitsMap[state.selectedScaleType], payload);

      if (!newScaleUnit) throw new Error(`Theme scale unit with id '${payload}' does not exist`);

      state.selectedUnits[state.selectedScaleType] = newScaleUnit;
    },
  },
});

export const { selectScaleType } = generalSlice.actions;

const generalReducer = generalSlice.reducer;

export default generalReducer;
