import ThemeScale from '$/models/ThemeScale';
import { findItemWithId } from '$entity-helpers';
import spacingScales from '$spacing/constants/spacingScales';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SpacingState = {
  selectedScale: ThemeScale;
};

const initialState: SpacingState = {
  selectedScale: spacingScales[0],
};

const spacingSlice = createSlice({
  name: 'spacing',
  initialState,
  reducers: {
    selectNewScaleFromId: (state: SpacingState, { payload: newScaleId }: PayloadAction<string>) => {
      const newScale = findItemWithId(spacingScales, newScaleId);

      if (!newScale) throw new Error(`Spacing scale with id '${newScaleId}' does not exist`);

      state.selectedScale = newScale;
    },
  },
});

export const { selectNewScaleFromId } = spacingSlice.actions;

const spacingReducer = spacingSlice.reducer;

export default spacingReducer;
