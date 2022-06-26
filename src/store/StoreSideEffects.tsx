import { selectSelectedScaleType } from '$/store/selectors';
import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import { resetPresetSelection, updateCodeLabel } from '$code-generation';
import { useDidUpdate } from '@mantine/hooks';
import { FC, useEffect } from 'react';

const StoreSideEffects: FC = () => {
  const dispatch = useStoreDispatch();
  const selectedScaleType = useStoreSelector(selectSelectedScaleType);

  useEffect(() => {
    dispatch(updateCodeLabel(selectedScaleType)); // apply default code label
  }, [selectedScaleType, dispatch]);

  useDidUpdate(() => {
    // # When a new scale type is selected ...
    dispatch(resetPresetSelection); // clear preset selection
  }, [selectedScaleType]);

  return null;
};

export default StoreSideEffects;
