import { selectSelectedScaleType } from '$/store/selectors';
import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import { resetPresetSelection } from '$code-generation';
import { useDidUpdate } from '@mantine/hooks';
import { FC } from 'react';

const StoreSideEffects: FC = () => {
  const dispatch = useStoreDispatch();
  const selectedScaleType = useStoreSelector(selectSelectedScaleType);

  useDidUpdate(() => {
    dispatch(resetPresetSelection);
  }, [selectedScaleType]);

  return null;
};

export default StoreSideEffects;
