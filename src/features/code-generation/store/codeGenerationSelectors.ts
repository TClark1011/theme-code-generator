import {
  printThemeScaleCode,
  ThemeScaleCodeItem,
} from '$code-generation/models/ThemeScaleCodeRules';
import {
  selectActiveScaleValues,
  selectActiveThemeScaleUnit,
  selectSelectedScaleType,
} from '$/store/selectors';
import { StoreSelector, StoreState } from '$/store/store';
import { Array } from '$/models/utilityTypes';
import codePresets, { CodePresetItem } from '$code-generation/constants/codePresets';
import { createSelector } from '@reduxjs/toolkit';

export const selectGeneratedCode: StoreSelector<string> = (state) => {
  const scaleType = selectSelectedScaleType(state);
  const selectedUnit = selectActiveThemeScaleUnit(state);
  const codeSystem = state.codeGeneration.codeSystemRules;

  const values = selectActiveScaleValues(state);
  const items: Array<ThemeScaleCodeItem> = values.map(({ key, value }) => ({
    key,
    value,
    label: scaleType,
    unit: selectedUnit,
  }));

  const generatedCode = printThemeScaleCode(items, codeSystem);

  return generatedCode;
};

// export const selectActivePresetItem: StoreSelector<CodePresetItem | undefined> = (state) => {
//   const selectedPresetName = state.codeGeneration.selectedPresetName;

//   const activePreset = codePresets.find((preset) => preset.name === selectedPresetName);

//   return activePreset;
// };
export const selectActivePresetItem: StoreSelector<CodePresetItem | undefined> = createSelector(
  (s: StoreState) => s.codeGeneration.selectedPresetName,
  (selectedPresetName) => codePresets.find((preset) => preset.name === selectedPresetName)
);
