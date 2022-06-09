import { ThemeScaleUnit } from '$/models/ThemeScale';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { findItemWithId } from '$entity-helpers';
import { spacingPxUnit } from '$spacing';
import themeScaleUnitsMap from '$/constants/themeScaleUnitsMap';

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
