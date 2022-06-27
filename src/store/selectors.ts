import { match } from 'ts-pattern';
import { StoreSelector, StoreState } from '$/store/store';
import { ThemeScaleUnit } from '$/models/ThemeScale';
import { createSelector } from '@reduxjs/toolkit';
import { findItemWithId } from '$entity-helpers';
import { scaleUnits } from '$code-generation';
import { Array, KeyValuePair } from '$/models/utilityTypes';
import { ThemeScaleType } from '$/store/generalReducer';
import { selectCurrentColorPalette } from '$color';

export const selectSelectedScaleType: StoreSelector<ThemeScaleType> = (s) =>
  s.general.selectedScaleType;

export const selectSelectedUnitIds = (s: StoreState) => s.general.selectedUnitIds;
export const selectActiveUnitId: StoreSelector<string> = (s) =>
  s.general.selectedUnitIds[s.general.selectedScaleType];
export const selectValidUnits: StoreSelector<Array<ThemeScaleUnit>> = (s) =>
  scaleUnits[s.general.selectedScaleType];

export const selectApplicableThemeScaleUnits = createSelector(
  (s: StoreState) => s.general.selectedScaleType,
  (scaleType): Array<ThemeScaleUnit> => scaleUnits[scaleType]
);

export const selectActiveThemeScaleUnit = createSelector(
  selectActiveUnitId,
  selectValidUnits,
  (activeUnitId, validUnits): ThemeScaleUnit => {
    const activeUnit = findItemWithId(validUnits, activeUnitId);

    if (!activeUnit) throw new Error(`Theme scale unit with id '${activeUnitId}' does not exist`);

    return activeUnit;
  }
);

export const selectActiveScaleValues = createSelector(
  selectSelectedScaleType,
  (s: StoreState) => s.spacing.selectedScale.values,
  (s: StoreState) => selectCurrentColorPalette(s).values,
  (selectedScaleType, spacingScaleValues, colorScaleValues) =>
    match<ThemeScaleType, Array<KeyValuePair<string>>>(selectedScaleType)
      .with('spacing', () => spacingScaleValues)
      .with('color', () => colorScaleValues)
      .exhaustive()
);
