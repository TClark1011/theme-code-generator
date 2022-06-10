import { setSelectedPresetName } from '$code-generation/logic/codeGenerationReducer';
import { selectActivePresetItem, selectApplicablePresetItems } from '$/store/selectors';
import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import { Select, SelectItem, SelectProps } from '@mantine/core';
import { A, flow, O, S } from '@mobily/ts-belt';
import { Except } from 'type-fest';
import { createSelector } from '@reduxjs/toolkit';

const getFirstWord = flow(S.split(' '), A.head, O.getWithDefault(''));

const selectApplicablePresetSelectOptions = createSelector(selectApplicablePresetItems, (s) =>
  s.map(
    ({ name }): SelectItem => ({
      label: name,
      value: name,
      group: getFirstWord(name),
    })
  )
);
export type PresetDropdownProps = Except<SelectProps, 'data' | 'label' | 'onChange'>;

const PresetDropdown: React.FC<PresetDropdownProps> = (props) => {
  const dispatch = useStoreDispatch();
  const applicablePresetOptions = useStoreSelector(selectApplicablePresetSelectOptions);
  const selectedCodePresetItem = useStoreSelector(selectActivePresetItem);

  return (
    <Select
      data={applicablePresetOptions}
      label="Preset"
      onChange={flow(setSelectedPresetName, dispatch)}
      value={selectedCodePresetItem?.name}
      {...props}
    />
  );
};

export default PresetDropdown;
