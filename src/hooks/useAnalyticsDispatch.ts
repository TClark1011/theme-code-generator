import {
  CopiedCodeAnalyticsEvent,
  EnteredStepAnalyticsEvent,
  ScaleTypeChangedAnalyticsEvent,
  SelectedPresetAnalyticsEvent,
} from '$/models/analyticsEvents';
import { useAnalytics } from '$analytics';

type AnalyticsEvents = {
  changedScaleType: ScaleTypeChangedAnalyticsEvent;
  enteredStep: EnteredStepAnalyticsEvent;
  copiedCode: CopiedCodeAnalyticsEvent;
  selectedPreset: SelectedPresetAnalyticsEvent;
};

const useAnalyticsDispatch = () => useAnalytics<AnalyticsEvents>();

export default useAnalyticsDispatch;
