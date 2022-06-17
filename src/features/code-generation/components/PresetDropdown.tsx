import {
  resetPresetSelection,
  setSelectedPresetName,
} from '$code-generation/store/codeGenerationReducer';
import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import { Select, SelectItem, SelectProps } from '@mantine/core';
import { A, flow, O, S } from '@mobily/ts-belt';
import { Except } from 'type-fest';
import {
  selectActivePresetItem,
  selectApplicableCodePresets,
} from '$code-generation/store/codeGenerationSelectors';
import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedScaleType } from '$/store/selectors';
import { useDidUpdate } from '@mantine/hooks';

const getFirstWord = flow(S.split(' '), A.head, O.getWithDefault(''));

const selectCodePresetSelectionItems = createSelector(
  selectApplicableCodePresets,
  A.map(
    ({ name }): SelectItem => ({
      label: name,
      value: name,
      group: getFirstWord(name),
    })
  )
);

export type PresetDropdownProps = Except<SelectProps, 'data' | 'label' | 'onChange' | 'value'>;

const PresetDropdown: React.FC<PresetDropdownProps> = (props) => {
  const dispatch = useStoreDispatch();

  const selectedCodePresetItem = useStoreSelector(selectActivePresetItem);
  const selectionItems = useStoreSelector(selectCodePresetSelectionItems);
  const selectedScaleType = useStoreSelector(selectSelectedScaleType);

  useDidUpdate(() => {
    dispatch(resetPresetSelection());
  }, [selectedScaleType]);

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
