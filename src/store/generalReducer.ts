import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeScaleType = 'spacing';
export type GeneralState = {
  selectedScaleType: ThemeScaleType;
};

const initialState: GeneralState = {
  selectedScaleType: 'spacing',
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    selectScaleType: (state: GeneralState, { payload }: PayloadAction<ThemeScaleType>) => {
      state.selectedScaleType = payload;
    },
  },
});

export const { selectScaleType } = generalSlice.actions;

const generalReducer = generalSlice.reducer;

export default generalReducer;
