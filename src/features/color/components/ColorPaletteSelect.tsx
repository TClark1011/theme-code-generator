import colorPalettes from '$color/constants/colorPalettes';
import { Select, SelectItem, Stack, Switch } from '@mantine/core';
import { FC } from 'react';
import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import { flow } from '@mobily/ts-belt';
import { setSelectedColorPaletteId, toggleUsingCustomColor } from '$color/store/colorReducer';
import CustomColorInput from '$color/components/CustomColorInput';

const colorPaletteSelectItems: SelectItem[] = colorPalettes.map((item) => ({
  value: item.id,
  label: item.name,
  group: item.group,
}));

const ColorPaletteSelect: FC = () => {
  const isUsingCustomColor = useStoreSelector((s) => s.color.usingCustomColor);
  const dispatch = useStoreDispatch();

  return (
    <Stack>
      <Switch
        onChange={() => dispatch(toggleUsingCustomColor())}
        checked={isUsingCustomColor}
        label="Use Custom Base Color"
      />
      {!isUsingCustomColor && (
        <Select
          defaultValue={colorPalettes[0].id}
          label="Color Palettes"
          data={colorPaletteSelectItems}
          onChange={flow(setSelectedColorPaletteId, dispatch)}
        />
      )}
      {isUsingCustomColor && <CustomColorInput />}
    </Stack>
  );
};

export default ColorPaletteSelect;
