import { setSelectedScaleType, ThemeScaleType } from '$/store/generalReducer';
import { selectSelectedScaleType } from '$/store/selectors';
import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import { titleCase } from '$string-case-helpers';
import { Radio, RadioGroup } from '@mantine/core';
import { flow } from '@mobily/ts-belt';
import { FC } from 'react';

const scaleTypes: Array<ThemeScaleType> = ['spacing', 'color'];

const ScaleSwitcher: FC = () => {
  const dispatch = useStoreDispatch();
  const selectedScaleType = useStoreSelector(selectSelectedScaleType);

  return (
    <RadioGroup
      value={selectedScaleType}
      onChange={flow(setSelectedScaleType, dispatch)}
      orientation="vertical"
      spacing="lg"
    >
      {scaleTypes.map((type) => (
        <Radio label={titleCase(type)} key={type} value={type} />
      ))}
    </RadioGroup>
  );
};

export default ScaleSwitcher;
