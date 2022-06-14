import colorPalettes from '$color/constants/colorPalettes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ColorState = {
  colorPaletteId: string;
};

const initialState: ColorState = {
  colorPaletteId: colorPalettes[0].id,
};

const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setSelectedColorPaletteId: (state: ColorState, { payload }: PayloadAction<string>) => {
      state.colorPaletteId = payload;
    },
  },
});

export const { setSelectedColorPaletteId } = colorSlice.actions;

const colorReducer = colorSlice.reducer;

export default colorReducer;
