import { Array } from '$/models/utilityTypes';
import { ThemeScaleType } from '$/store/generalReducer';
import { ThemeScaleCodeRules } from '$code-generation';

export type ScaleTypeChangedAnalyticsEvent = {
  changedTo: ThemeScaleType;
};

export type EnteredStepAnalyticsEvent = {
  newStepNumber: number;
};

export type CopiedCodeAnalyticsEvent = {
  scaleType: ThemeScaleType;
  values: Array<string>;
  codeRules: ThemeScaleCodeRules;
  code: string;
};

export type SelectedPresetAnalyticsEvent = {
  selectedPresetName: string;
};
