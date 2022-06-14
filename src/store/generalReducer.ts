import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { findItemWithId } from '$entity-helpers';
import { spacingPxUnit } from '$spacing';
import themeScaleUnitsMap from '$/constants/themeScaleUnitsMap';
import { colorUnits } from '$color';

export type ThemeScaleType = 'spacing' | 'color';
export type GeneralState = {
  selectedScaleType: ThemeScaleType;
  selectedUnitIds: Record<ThemeScaleType, string>;
};

const initialState: GeneralState = {
  selectedScaleType: 'color',
  selectedUnitIds: {
    spacing: spacingPxUnit.id,
    color: colorUnits[0].id,
  },
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setSelectedScaleType: (state: GeneralState, { payload }: PayloadAction<ThemeScaleType>) => {
      state.selectedScaleType = payload;
    },
    selectNewScaleUnitFromId: (state: GeneralState, { payload }: PayloadAction<string>) => {
      const newScaleUnit = findItemWithId(themeScaleUnitsMap[state.selectedScaleType], payload);

      if (!newScaleUnit) throw new Error(`Theme scale unit with id '${payload}' does not exist`);

      state.selectedUnitIds[state.selectedScaleType] = newScaleUnit.id;
    },
  },
});

export const { setSelectedScaleType, selectNewScaleUnitFromId } = generalSlice.actions;

const generalReducer = generalSlice.reducer;

export default generalReducer;
