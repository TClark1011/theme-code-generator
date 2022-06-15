import colorPalettes from '$color/constants/colorPalettes';
import { findItemWithId } from '$entity-helpers';
import ThemeScale from '$/models/ThemeScale';
import { StoreSelector, StoreState } from '$/store/store';
import { createSelector } from '@reduxjs/toolkit';
import { D } from '@mobily/ts-belt';
import { deriveIfAsyncStoreDataIsLoading } from '$/models/AsyncStoreData';

export const selectCurrentColorPalette: StoreSelector<ThemeScale> = createSelector(
  (s: StoreState) => s.color,
  (colorState): ThemeScale => {
    if (colorState.usingCustomColor) {
      const rawColors = Object.values(colorState.customColorPaletteQuery.data ?? {});

      return {
        id: 'custom',
        name: 'custom',
        values: rawColors.map((value, index) => ({
          key: `${index}`,
          value,
        })),
      };
    }

    const paletteId = colorState.colorPaletteId;
    const fullPalette = findItemWithId(colorPalettes, paletteId);

    if (!fullPalette) throw new Error(`Color palette with id '${paletteId}' does not exist`);

    return fullPalette;
  }
);

export const selectCurrentColors = createSelector(
  (s: StoreState) => s,
  (state): Array<string> => {
    return selectCurrentColorPalette(state).values.map(D.getUnsafe('value'));
  }
);

export const selectCustomColor = createSelector(
  (s: StoreState) => s.color,
  (color) => color.customColor
);

export const selectIsUsingCustomColor = createSelector(
  (s: StoreState) => s.color,
  D.getUnsafe('usingCustomColor')
);

export const selectIfColorsAreInLoadingState = createSelector(
  (s: StoreState) => s.color,
  (colorState): boolean =>
    colorState.usingCustomColor &&
    deriveIfAsyncStoreDataIsLoading(colorState.customColorPaletteQuery)
);