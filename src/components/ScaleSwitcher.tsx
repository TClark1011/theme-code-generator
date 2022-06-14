import { setSelectedScaleType, ThemeScaleType } from '$/store/generalReducer';
import { selectSelectedScaleType } from '$/store/selectors';
import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import { Select } from '@mantine/core';
import { flow } from '@mobily/ts-belt';
import { FC } from 'react';

const scaleTypes: Array<ThemeScaleType> = ['spacing', 'color'];

const ScaleSwitcher: FC = () => {
  const dispatch = useStoreDispatch();
  const selectedScaleType = useStoreSelector(selectSelectedScaleType);

  return (
    <Select
      data={scaleTypes}
      onChange={flow(setSelectedScaleType, dispatch)}
      label="Scale Type"
      value={selectedScaleType}
    />
  );
};

export default ScaleSwitcher;
