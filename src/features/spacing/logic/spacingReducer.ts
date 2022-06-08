import { spacingScales, SpacingScale } from '$spacing';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SpacingState = {
  selectedScale: SpacingScale;
};

const initialState: SpacingState = {
  selectedScale: spacingScales[0],
};

const spacingSlice = createSlice({
  name: 'spacing',
  initialState,
  reducers: {
    setSelectedScale: (state: SpacingState, { payload }: PayloadAction<SpacingScale>) => {
      state.selectedScale = payload;
    },
  },
});

export const { setSelectedScale } = spacingSlice.actions;

const spacingReducer = spacingSlice.reducer;

export default spacingReducer;
