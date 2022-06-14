import { SpacingVisualization } from '$spacing';
import { useStoreSelector } from '$/store/storeHooks';
import { match } from 'ts-pattern';
import { selectSelectedScaleType } from '$/store/selectors';
import { FC } from 'react';
import { ColorVisualization } from '$color';

const ActiveVisualization: FC = () => {
  const selectedScaleType = useStoreSelector(selectSelectedScaleType);

  return match(selectedScaleType)
    .with('spacing', () => <SpacingVisualization />)
    .with('color', () => <ColorVisualization />)
    .exhaustive();
};

export default ActiveVisualization;
