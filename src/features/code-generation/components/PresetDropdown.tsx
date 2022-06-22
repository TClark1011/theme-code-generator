import { setSelectedPresetName } from '$code-generation/store/codeGenerationReducer';
import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import { Select, SelectItem, SelectProps } from '@mantine/core';
import { A, flow } from '@mobily/ts-belt';
import { Except } from 'type-fest';
import {
  selectActivePresetItem,
  selectApplicableCodePresets,
} from '$code-generation/store/codeGenerationSelectors';
import { createSelector } from '@reduxjs/toolkit';

const selectCodePresetSelectionItems = createSelector(
  selectApplicableCodePresets,
  A.map(
    ({ name, group }): SelectItem => ({
      label: name,
      value: name,
      group,
    })
  )
);

export type PresetDropdownProps = Except<SelectProps, 'data' | 'label' | 'onChange' | 'value'>;

const PresetDropdown: React.FC<PresetDropdownProps> = (props) => {
  const dispatch = useStoreDispatch();

  const selectedCodePresetItem = useStoreSelector(selectActivePresetItem);
  const selectionItems = useStoreSelector(selectCodePresetSelectionItems);

  return (
    <Select
      data={selectionItems as any}
      label="Preset"
      onChange={flow(setSelectedPresetName, dispatch)}
      value={selectedCodePresetItem?.name}
      {...props}
    />
  );
};

export default PresetDropdown;
