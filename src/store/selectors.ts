import { match } from 'ts-pattern';
import { D } from '@mobily/ts-belt';
import { StoreSelector, StoreState } from '$/store/store';
import { ThemeScaleUnit } from '$/models/ThemeScale';
import { createSelector } from '@reduxjs/toolkit';
import expectParam from '$/utils/expectParam';
import { printThemeScaleCode } from '$code-generation';
import { findItemWithId } from '$entity-helpers';
import themeScaleUnitsMap from '$/constants/themeScaleUnitsMap';
import { Array } from '$/models/utilityTypes';

export const selectApplicableThemeScaleUnits: StoreSelector<Array<ThemeScaleUnit>> = createSelector(
  (s: StoreState) => s.general,
  (state) => themeScaleUnitsMap[state.selectedScaleType]
);

export const selectActiveThemeScaleUnit: StoreSelector<ThemeScaleUnit> = createSelector(
  (s: StoreState) => s.general,
  (general) => {
    const selectedScaleType = general.selectedScaleType;
    const activeUnitId = general.selectedUnitIds[selectedScaleType];
    const validScales = themeScaleUnitsMap[selectedScaleType];

    const activeUnit = findItemWithId(validScales, activeUnitId);

    if (!activeUnit) throw new Error(`Theme scale unit with id '${activeUnitId}' does not exist`);

    return activeUnit;
  }
);

export const selectActiveScaleValues: StoreSelector<Array<string>> = createSelector(
  (s: StoreState) => s,
  (state) =>
    match(state.general.selectedScaleType)
      .with('spacing', () => state.spacing.selectedScale.values.map(D.getUnsafe('value')))
      .exhaustive()
);

export const selectGeneratedCode: StoreSelector<string> = createSelector(
  expectParam<StoreState>(),
  (state: StoreState) => {
    const selectedUnit = selectActiveThemeScaleUnit(state);
    const codeSystem = state.codeGeneration.codeSystemRules;
    const values = selectActiveScaleValues(state);

    const generatedCode = printThemeScaleCode(
      { ...codeSystem, values, label: state.general.selectedScaleType },
      selectedUnit
    );

    return generatedCode;
  }
);
