import colorPalettes from '$color/constants/colorPalettes';
import { Select, SelectItem } from '@mantine/core';
import { FC } from 'react';
import { useStoreDispatch } from '$/store/storeHooks';
import { flow } from '@mobily/ts-belt';
import { setSelectedColorPaletteId } from '$color/store/colorReducer';

const colorPaletteSelectItems: SelectItem[] = colorPalettes.map((item) => ({
  value: item.id,
  label: item.name,
  group: item.group,
}));

const ColorPaletteSelect: FC = () => {
  const dispatch = useStoreDispatch();

  return (
    <Select
      defaultValue={colorPalettes[0].id}
      label="Color Palettes"
      data={colorPaletteSelectItems}
      onChange={flow(setSelectedColorPaletteId, dispatch)}
    />
  );
};

export default ColorPaletteSelect;
