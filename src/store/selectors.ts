import { match } from 'ts-pattern';
import { StoreSelector, StoreState } from '$/store/store';
import { ThemeScaleUnit } from '$/models/ThemeScale';
import { createSelector } from '@reduxjs/toolkit';
import { findItemWithId } from '$entity-helpers';
import themeScaleUnitsMap from '$/constants/themeScaleUnitsMap';
import { Array, KeyValuePair } from '$/models/utilityTypes';
import { ThemeScaleType } from '$/store/generalReducer';
import { selectCurrentColorPalette } from '$color';

export const selectSelectedScaleType: StoreSelector<ThemeScaleType> = (s) =>
  s.general.selectedScaleType;

export const selectApplicableThemeScaleUnits = createSelector(
  (s: StoreState) => s.general.selectedScaleType,
  (scaleType): Array<ThemeScaleUnit> => themeScaleUnitsMap[scaleType]
);

export const selectActiveThemeScaleUnit = createSelector(
  (s: StoreState) => s.general,
  (general): ThemeScaleUnit => {
    const selectedScaleType = general.selectedScaleType;
    const activeUnitId = general.selectedUnitIds[selectedScaleType];
    const validScales = themeScaleUnitsMap[selectedScaleType];

    const activeUnit = findItemWithId(validScales, activeUnitId);

    if (!activeUnit) throw new Error(`Theme scale unit with id '${activeUnitId}' does not exist`);

    return activeUnit;
  }
);

export const selectActiveScaleValues: StoreSelector<Array<KeyValuePair<string>>> = (state) =>
  match<ThemeScaleType, Array<KeyValuePair<string>>>(state.general.selectedScaleType)
    .with('spacing', () => state.spacing.selectedScale.values)
    .with('color', () => selectCurrentColorPalette(state).values)
    .exhaustive();
