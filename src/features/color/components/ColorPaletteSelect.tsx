import colorPalettes from '$color/constants/colorPalettes';
import { ColorSwatch, Group, Select, SelectItem, Stack, Switch, Text } from '@mantine/core';
import { FC, forwardRef } from 'react';
import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import { flow } from '@mobily/ts-belt';
import { setSelectedColorPaletteId, toggleUsingCustomColor } from '$color/store/colorReducer';
import CustomColorInput from '$color/components/CustomColorInput';
import getSampleColorFromPaletteId from '$color/logic/getSampleColorFromPaletteId';

const colorPaletteSelectItems: SelectItem[] = colorPalettes.map((item) => ({
  value: item.id,
  label: item.name,
  group: item.group,
}));

const ColorPaletteSelectItem = forwardRef<HTMLDivElement, SelectItem>(
  ({ value, label, ...props }, ref) => (
    <Group ref={ref} {...props}>
      <ColorSwatch radius="md" color={getSampleColorFromPaletteId(value)} />
      <Text>{label ?? ''}</Text>
    </Group>
  )
);
ColorPaletteSelectItem.displayName = 'ColorPaletteSelectItem';

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
          itemComponent={ColorPaletteSelectItem}
        />
      )}
      {isUsingCustomColor && <CustomColorInput />}
    </Stack>
  );
};

export default ColorPaletteSelect;
