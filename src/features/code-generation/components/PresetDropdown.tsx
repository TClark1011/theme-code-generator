import { setSelectedPresetName } from '$code-generation/logic/codeGenerationReducer';
import { selectActivePresetItem } from '$/store/selectors';
import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import { Select, SelectItem, SelectProps } from '@mantine/core';
import { A, flow, O, S } from '@mobily/ts-belt';
import { Except } from 'type-fest';
import { codePresets } from '$code-generation/constants';
import { Array } from '$/models/utilityTypes';

const getFirstWord = flow(S.split(' '), A.head, O.getWithDefault(''));

const codePresetSelectionItems: Array<SelectItem> = codePresets.map(
  ({ name }): SelectItem => ({
    label: name,
    value: name,
    group: getFirstWord(name),
  })
);
export type PresetDropdownProps = Except<SelectProps, 'data' | 'label' | 'onChange'>;

const PresetDropdown: React.FC<PresetDropdownProps> = (props) => {
  const dispatch = useStoreDispatch();
  const selectedCodePresetItem = useStoreSelector(selectActivePresetItem);

  return (
    <Select
      data={codePresetSelectionItems as any}
      label="Preset"
      onChange={flow(setSelectedPresetName, dispatch)}
      value={selectedCodePresetItem?.name}
      {...props}
    />
  );
};

export default PresetDropdown;
