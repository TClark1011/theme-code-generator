/* eslint-disable react-hooks/exhaustive-deps */
import useAnalyticsDispatch from '$/hooks/useAnalyticsDispatch';
import { selectSelectedScaleType, selectStepNumber } from '$/store/selectors';
import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import { resetPresetSelection, selectActivePresetItem, updateCodeLabel } from '$code-generation';
import { useDidUpdate } from '@mantine/hooks';
import { FC, useEffect } from 'react';
import { createSelector } from 'reselect';

export const selectActivePresetName = createSelector(selectActivePresetItem, (p) => p?.name);

const StoreSideEffects: FC = () => {
  const dispatch = useStoreDispatch();
  const dispatchAnalyticsEvent = useAnalyticsDispatch();
  const selectedScaleType = useStoreSelector(selectSelectedScaleType);

  useEffect(() => {
    dispatch(updateCodeLabel(selectedScaleType)); // apply default code label
  }, [selectedScaleType]);

  useDidUpdate(() => {
    // # When a new scale type is selected ...
    dispatch(resetPresetSelection); // clear preset selection
  }, [selectedScaleType]);

  //## ANALYTICS EVENTS
  /* #region  */
  const stepNumber = useStoreSelector(selectStepNumber);
  const presetName = useStoreSelector(selectActivePresetName);
  useDidUpdate(() => {
    //# Form Step Changed
    dispatchAnalyticsEvent('enteredStep', {
      props: {
        newStepNumber: stepNumber,
      },
    });
  }, [stepNumber]);

  useDidUpdate(() => {
    //# Scale Type Changed
    dispatchAnalyticsEvent('changedScaleType', {
      props: {
        changedTo: selectedScaleType,
      },
    });
  }, [selectedScaleType]);

  useDidUpdate(() => {
    //# Preset Selected
    if (presetName) {
      dispatchAnalyticsEvent('selectedPreset', {
        props: {
          selectedPresetName: presetName,
        },
      });
    }
  });
  /* #endregion */

  return null;
};

export default StoreSideEffects;
