import { selectNewScaleFromId } from '$spacing/store/spacingReducer';
import spacingScales from '$spacing/constants/spacingScales';
import { Box, BoxProps, Select } from '@mantine/core';
import { useCallback } from 'react';
import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';

const SpacingScaleSelection: React.FC<BoxProps<'div'>> = ({ ...props }) => {
  const selectedScale = useStoreSelector((s) => s.spacing.selectedScale);
  const dispatch = useStoreDispatch();

  const onChange = useCallback(
    (newlySelectedId: string) => dispatch(selectNewScaleFromId(newlySelectedId)),
    [dispatch]
  );

  return (
    <Box {...props}>
      <Select
        label="Spacing Scale"
        value={selectedScale.id}
        data={spacingScales.map(({ id, name }) => ({ value: id, label: name }))}
        onChange={onChange}
      />
    </Box>
  );
};

export default SpacingScaleSelection;
