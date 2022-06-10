import { match } from 'ts-pattern';
import { StoreSelector, StoreState } from '$/store/store';
import { ThemeScaleUnit } from '$/models/ThemeScale';
import { createSelector } from '@reduxjs/toolkit';
import { CodePresetItem, codePresets, printThemeScaleCode } from '$code-generation';
import { findItemWithId } from '$entity-helpers';
import themeScaleUnitsMap from '$/constants/themeScaleUnitsMap';
import { Array, KeyValuePair } from '$/models/utilityTypes';

export const selectApplicableThemeScaleUnits = createSelector(
  (s: StoreState) => s.general.selectedScaleType,
  (scaleType): Array<ThemeScaleUnit> => themeScaleUnitsMap[scaleType]
);

export const selectApplicablePresetItems = createSelector(
  (s: StoreState) => s.general.selectedScaleType,
  (scaleType): Array<CodePresetItem> => codePresets[scaleType]
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
  match(state.general.selectedScaleType)
    .with('spacing', () => state.spacing.selectedScale.values)
    .exhaustive();

export const selectGeneratedCode: StoreSelector<string> = (state: StoreState) => {
  const selectedUnit = selectActiveThemeScaleUnit(state);
  const codeSystem = state.codeGeneration.codeSystemRules;
  const values = selectActiveScaleValues(state);

  const generatedCode = printThemeScaleCode(
    { ...codeSystem, values, label: state.general.selectedScaleType },
    selectedUnit
  );

  return generatedCode;
};

export const selectActivePresetItem: StoreSelector<CodePresetItem | undefined> = (state) => {
  const selectedPresetName = state.codeGeneration.selectedPresetName;
  const presets = selectApplicablePresetItems(state);

  const activePreset = presets.find((preset) => preset.name === selectedPresetName);

  return activePreset;
};
