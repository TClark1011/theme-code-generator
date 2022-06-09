import { match } from 'ts-pattern';
import { D } from '@mobily/ts-belt';
import { StoreSelector, StoreState } from '$/store/store';
import { ThemeScaleUnit } from '$/models/ThemeScale';
import { createSelector } from '@reduxjs/toolkit';
import expectParam from '$/utils/expectParam';
import { printThemeScaleCode } from '$code-generation';

export const selectActiveThemeScaleUnit: StoreSelector<ThemeScaleUnit> = createSelector(
  (s: StoreState) => s.general,
  (general) => {
    const selectedScaleType = general.selectedScaleType;
    const activeUnit = general.selectedUnits[selectedScaleType];

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
