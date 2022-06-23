import ThemeScaleCodeRules, {
  printThemeScaleCode,
  ThemeScaleCodeItem,
} from '$code-generation/models/ThemeScaleCodeRules';
import {
  selectActiveScaleValues,
  selectActiveThemeScaleUnit,
  selectSelectedScaleType,
} from '$/store/selectors';
import { StoreSelector } from '$/store/store';
import { Array } from '$/models/utilityTypes';
import codePresets from '$code-generation/constants/codePresets';
import { createSelector } from '@reduxjs/toolkit';
import { createStructuredSelector } from 'reselect';

export const selectCodeSystemRules: StoreSelector<ThemeScaleCodeRules> = (state) =>
  state.codeGeneration.codeSystemRules;

export const selectCodeLabel: StoreSelector<string> = (state) => state.codeGeneration.codeLabel;

export const selectSelectedPresetName: StoreSelector<string | undefined> = (state) =>
  state.codeGeneration.selectedPresetName;

export const selectApplicableCodePresets = createSelector(
  selectSelectedScaleType,
  (scaleType) => codePresets[scaleType]
);

export const selectCodeItems = createSelector(
  selectActiveThemeScaleUnit,
  selectCodeLabel,
  selectActiveScaleValues,
  (selectedUnit, label, values): Array<ThemeScaleCodeItem> => {
    const items: Array<ThemeScaleCodeItem> = values.map(({ key, value }) => ({
      key,
      value,
      label,
      unit: selectedUnit,
    }));

    return items;
  }
);

const selectDataNeededForCodeGeneration = createStructuredSelector({
  codeSystem: selectCodeSystemRules,
  items: selectCodeItems,
});

export const selectGeneratedCode = createSelector(
  selectDataNeededForCodeGeneration,
  ({ codeSystem, items }): string => printThemeScaleCode(items, codeSystem)
);

export const selectSingleGeneratedCodeLine = createSelector(
  selectDataNeededForCodeGeneration,
  ({ codeSystem, items }): string => {
    const randomItem = items[5];

    if (!randomItem) throw Error('No theme scale values found');

    const generatedCode = printThemeScaleCode([randomItem], codeSystem);
    return generatedCode;
  }
);

export const selectActivePresetItem = createSelector(
  selectApplicableCodePresets,
  selectSelectedPresetName,
  (applicablePresets, selectedPresetName) => {
    const activePreset = applicablePresets.find((preset) => preset.name === selectedPresetName);

    return activePreset;
  }
);
