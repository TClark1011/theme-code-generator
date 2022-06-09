import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { findItemWithId } from '$entity-helpers';
import { spacingPxUnit } from '$spacing';
import themeScaleUnitsMap from '$/constants/themeScaleUnitsMap';

export type ThemeScaleType = 'spacing';
export type GeneralState = {
  selectedScaleType: ThemeScaleType;
  selectedUnitIds: Record<ThemeScaleType, string>;
};

const initialState: GeneralState = {
  selectedScaleType: 'spacing',
  selectedUnitIds: {
    spacing: spacingPxUnit.id,
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

      console.log('(generalReducer) newScaleUnit: ', newScaleUnit);

      if (!newScaleUnit) throw new Error(`Theme scale unit with id '${payload}' does not exist`);

      state.selectedUnitIds[state.selectedScaleType] = newScaleUnit.id;
    },
  },
});

export const { selectScaleType, selectNewScaleUnitFromId } = generalSlice.actions;

const generalReducer = generalSlice.reducer;

export default generalReducer;
