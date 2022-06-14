import TailwindShade from '$color/models/TailwindColorPalette';
import colorPalettes from '$color/constants/colorPalettes';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStoreData, {
  blankAsyncStoreData,
  composeAsyncDataStoreResult,
  injectErrorMessageIntoAsyncDataStoreResult,
} from '$/models/AsyncStoreData';
import fetchTailwindColorPalette from '$color/api/fetchTailwindColorPalette';

export type ColorState = {
  colorPaletteId: string;
  customColor: string;
  customColorPaletteQuery: AsyncStoreData<TailwindShade>;
  usingCustomColor: boolean;
};

const defaultPalette = colorPalettes[0];
const initialState: ColorState = {
  colorPaletteId: defaultPalette.id,
  customColor: defaultPalette.values[5].value,
  usingCustomColor: false,
  customColorPaletteQuery: blankAsyncStoreData,
};

export const setCustomColor = createAsyncThunk(
  'colors/fetchCustomColorPalette',
  async (customColor: string) => {
    const newPalette = await fetchTailwindColorPalette(customColor);
    return newPalette;
  }
);

const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setSelectedColorPaletteId: (state: ColorState, { payload }: PayloadAction<string>) => {
      state.colorPaletteId = payload;
    },
    toggleUsingCustomColor: (state: ColorState) => {
      state.usingCustomColor = !state.usingCustomColor;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCustomColor.pending, (state: ColorState, { meta: { arg: newColor } }) => {
      state.customColor = newColor;
      state.customColorPaletteQuery = blankAsyncStoreData;
    });
    builder.addCase(setCustomColor.fulfilled, (state: ColorState, { payload }) => {
      state.customColorPaletteQuery = composeAsyncDataStoreResult(payload);
    });
    builder.addCase(setCustomColor.rejected, (state: ColorState, { error }) => {
      state.customColorPaletteQuery = injectErrorMessageIntoAsyncDataStoreResult(
        state.customColorPaletteQuery,
        error
      );
    });
  },
});

export const { toggleUsingCustomColor, setSelectedColorPaletteId } = colorSlice.actions;

const colorReducer = colorSlice.reducer;

export default colorReducer;
