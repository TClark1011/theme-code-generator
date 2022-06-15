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
import codePresets from '$code-generation/constants/codePresets';
import { createSelector } from '@reduxjs/toolkit';
import CodePresetItem from '$code-generation/models/CodePresetItem';

export const selectApplicableCodePresets = createSelector(
  (s: StoreState) => s.general.selectedScaleType,
  (scaleType) => codePresets[scaleType]
);

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

export const selectActivePresetItem: StoreSelector<CodePresetItem | undefined> = createSelector(
  (s: StoreState) => s,
  (state) => {
    console.log('(codeGenerationSelectors) codePresets: ', codePresets);
    console.log('(codeGenerationSelectors) state: ', state);
    const applicablePresets = selectApplicableCodePresets(state);
    console.log('(codeGenerationSelectors) applicablePresets: ', applicablePresets);
    const selectedPresetName = state.codeGeneration.selectedPresetName;

    const activePreset = applicablePresets.find((preset) => preset.name === selectedPresetName);

    return activePreset;
  }
);
