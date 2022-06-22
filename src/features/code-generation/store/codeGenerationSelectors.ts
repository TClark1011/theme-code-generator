import {
  printThemeScaleCode,
  ThemeScaleCodeItem,
} from '$code-generation/models/ThemeScaleCodeRules';
import { selectActiveScaleValues, selectActiveThemeScaleUnit } from '$/store/selectors';
import { StoreSelector, StoreState } from '$/store/store';
import { Array } from '$/models/utilityTypes';
import codePresets from '$code-generation/constants/codePresets';
import { createSelector } from '@reduxjs/toolkit';
import CodePresetItem from '$code-generation/models/CodePresetItem';
import { D } from '@mobily/ts-belt';

export const selectCodeLabel: StoreSelector<string> = createSelector(
  (state: StoreState) => state.codeGeneration,
  D.getUnsafe('codeLabel')
);

export const selectApplicableCodePresets = createSelector(
  (s: StoreState) => s.general.selectedScaleType,
  (scaleType) => codePresets[scaleType]
);

export const selectGeneratedCode: StoreSelector<string> = (state) => {
  const selectedUnit = selectActiveThemeScaleUnit(state);
  const codeSystem = state.codeGeneration.codeSystemRules;
  const label = selectCodeLabel(state);

  const values = selectActiveScaleValues(state);
  const items: Array<ThemeScaleCodeItem> = values.map(({ key, value }) => ({
    key,
    value,
    label,
    unit: selectedUnit,
  }));

  const generatedCode = printThemeScaleCode(items, codeSystem);

  return generatedCode;
};

export const selectActivePresetItem: StoreSelector<CodePresetItem | undefined> = createSelector(
  (s: StoreState) => s,
  (state) => {
    const applicablePresets = selectApplicableCodePresets(state);
    const selectedPresetName = state.codeGeneration.selectedPresetName;

    const activePreset = applicablePresets.find((preset) => preset.name === selectedPresetName);

    return activePreset;
  }
);
