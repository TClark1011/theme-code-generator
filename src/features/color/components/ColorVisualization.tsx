import ColorRangeVisualization from '$color/components/ColorRangeVisualization';
import { FC } from 'react';
import { selectCurrentColors, selectIfColorsAreInLoadingState } from '$color/store/colorSelectors';
import { useStoreSelector } from '$/store/storeHooks';
import { createStructuredSelector } from 'reselect';
import { match, P } from 'ts-pattern';
import ColorRangeLoadingSkeleton from '$color/components/ColorRangeLoadingSkeleton';

const selectColorVisualizationData = createStructuredSelector({
  colors: selectCurrentColors,
  isLoading: selectIfColorsAreInLoadingState,
});

type VisualizationData = ReturnType<typeof selectColorVisualizationData>;

const loadingPattern: P.Pattern<VisualizationData> = {
  isLoading: true,
};

const ColorVisualization: FC = () => {
  const data = useStoreSelector(selectColorVisualizationData);

  return match(data)
    .with(loadingPattern, () => <ColorRangeLoadingSkeleton />)
    .otherwise(({ colors }) => <ColorRangeVisualization colors={colors} />);
};

export default ColorVisualization;
