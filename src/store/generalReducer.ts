import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { findItemWithId } from '$entity-helpers';
import { scaleUnits, colorUnits, spacingPxUnit } from '$code-generation';

export type ThemeScaleType = 'spacing' | 'color';
export type GeneralState = {
  selectedScaleType: ThemeScaleType;
  selectedUnitIds: Record<ThemeScaleType, string>;
};

const initialState: GeneralState = {
  selectedScaleType: 'spacing',
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
      const newScaleUnit = findItemWithId(scaleUnits[state.selectedScaleType], payload);

      if (!newScaleUnit) throw new Error(`Theme scale unit with id '${payload}' does not exist`);

      state.selectedUnitIds[state.selectedScaleType] = newScaleUnit.id;
    },
  },
});

export const { setSelectedScaleType, selectNewScaleUnitFromId } = generalSlice.actions;

const generalReducer = generalSlice.reducer;

export default generalReducer;
