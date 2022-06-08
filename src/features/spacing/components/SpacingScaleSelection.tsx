import { selectNewScaleFromId } from '$spacing/logic';
import { useStoreDispatch, useStoreSelector } from '$/store';
import { spacingScales } from '$spacing/constants';
import { Box, BoxProps, Select } from '@mantine/core';
import { useCallback } from 'react';
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
