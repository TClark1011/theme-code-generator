import ColorRangeVisualization from '$color/components/ColorRangeVisualization';
import { FC } from 'react';
import { selectCurrentColors } from '$color/store/colorSelectors';
import { useStoreSelector } from '$/store/storeHooks';

const ColorVisualization: FC = () => {
  const colors = useStoreSelector(selectCurrentColors);

  return <ColorRangeVisualization colors={colors} />;
};

export default ColorVisualization;
