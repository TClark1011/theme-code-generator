import colorPalettes from '$color/constants/colorPalettes';
import { findItemWithId } from '$entity-helpers';
import ThemeScale from '$/models/ThemeScale';
import { StoreSelector, StoreState } from '$/store/store';
import { createSelector } from '@reduxjs/toolkit';
import { D } from '@mobily/ts-belt';
import AsyncStoreData, { deriveIfAsyncStoreDataIsLoading } from '$/models/AsyncStoreData';
import TailwindColorPalette from '$color/models/TailwindColorPalette';

export const selectCustomColor: StoreSelector<string> = (s) => s.color.customColor;
export const selectIsUsingCustomColor: StoreSelector<boolean> = (s) => s.color.usingCustomColor;
export const selectCustomColorPaletteQuery: StoreSelector<AsyncStoreData<TailwindColorPalette>> = (
  s
) => s.color.customColorPaletteQuery;

export const selectCurrentColorPalette: StoreSelector<ThemeScale> = createSelector(
  selectIsUsingCustomColor,
  (s: StoreState) => selectCustomColorPaletteQuery(s)?.data,
  (s: StoreState) => s.color.colorPaletteId,
  (usingCustomColor, customColorData, colorPaletteId): ThemeScale => {
    if (usingCustomColor) {
      const rawColors = D.toPairs(customColorData ?? ({} as any as TailwindColorPalette));

      return {
        id: 'custom',
        name: 'custom',
        values: rawColors.map(([shade, color]) => ({
          key: shade,
          value: color,
        })),
      };
    }

    const fullPalette = findItemWithId(colorPalettes, colorPaletteId);

    if (!fullPalette) throw new Error(`Color palette with id '${colorPaletteId}' does not exist`);

    return fullPalette;
  }
);

export const selectCurrentColors = createSelector(
  selectCurrentColorPalette,
  (currentPalette): Array<string> => currentPalette.values.map(D.getUnsafe('value'))
);

export const selectIfColorsAreInLoadingState = createSelector(
  selectIsUsingCustomColor,
  selectCustomColorPaletteQuery,
  (usingCustomColor, customColorPaletteQuery): boolean =>
    usingCustomColor && deriveIfAsyncStoreDataIsLoading(customColorPaletteQuery)
);
