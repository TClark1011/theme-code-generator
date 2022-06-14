import { SpacingScaleSelection } from '$spacing';
import { selectSelectedScaleType } from '$/store/selectors';
import { useStoreSelector } from '$/store/storeHooks';
import { FC } from 'react';
import { match } from 'ts-pattern';
import { ColorPaletteSelect } from '$color';

const ActiveScaleSelection: FC = () => {
  const selectedScaleType = useStoreSelector(selectSelectedScaleType);

  return match(selectedScaleType)
    .with('spacing', () => <SpacingScaleSelection />)
    .with('color', () => <ColorPaletteSelect />)
    .exhaustive();
};

export default ActiveScaleSelection;
