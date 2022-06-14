import colorPalettes from '$color/constants/colorPalettes';
import { findItemWithId } from '$entity-helpers';
import ThemeScale from '$/models/ThemeScale';
import { StoreSelector, StoreState } from '$/store/store';
import { createSelector } from '@reduxjs/toolkit';
import { D } from '@mobily/ts-belt';

export const selectCurrentColorPalette: StoreSelector<ThemeScale> = createSelector(
  (s: StoreState) => s.color.colorPaletteId,
  (paletteId): ThemeScale => {
    const fullPalette = findItemWithId(colorPalettes, paletteId);

    if (!fullPalette) throw new Error(`Color palette with id '${paletteId}' does not exist`);

    return fullPalette;
  }
);

export const selectCurrentColors = createSelector(
  (s: StoreState) => s,
  (state): Array<string> => selectCurrentColorPalette(state).values.map(D.getUnsafe('value'))
);
