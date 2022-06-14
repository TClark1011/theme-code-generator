import { selectCurrentColors, selectCustomColor } from '$color/store/colorSelectors';
import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import { ActionIcon, Box, ColorInput } from '@mantine/core';
import { setCustomColor } from '$color/store/colorReducer';
import { useInputState } from '@mantine/hooks';
import { useCallback } from 'react';
import { Check } from 'tabler-icons-react';
import useMountEffect from '$/hooks/useMountEffect';

const CustomColorInput: React.FC = () => {
  const dispatch = useStoreDispatch();
  const customColor = useStoreSelector(selectCustomColor);
  const colors = useStoreSelector(selectCurrentColors);

  const [colorInputValue, setColorInputValue] = useInputState(customColor);

  const saveInputValueToStore = useCallback(() => {
    dispatch(setCustomColor(colorInputValue));
  }, [colorInputValue, dispatch]);

  useMountEffect(() => {
    if (!colors.includes(customColor)) dispatch(setCustomColor(colorInputValue));
  });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <ColorInput
        label="Custom Color"
        value={colorInputValue}
        onChange={setColorInputValue}
        rightSection={
          <ActionIcon onClick={saveInputValueToStore} variant="hover">
            <Check />
          </ActionIcon>
        }
      />
    </Box>
  );
};

export default CustomColorInput;
