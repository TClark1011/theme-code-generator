import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import {
  Divider,
  Group,
  Select,
  SelectItem,
  SelectProps,
  SimpleGrid,
  Stack,
  Switch,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { D, flow } from '@mobily/ts-belt';
import {
  selectActiveThemeScaleUnit,
  selectApplicableThemeScaleUnits,
  selectSelectedScaleType,
} from '$/store/selectors';
import { ThemeScaleUnit } from '$/models/ThemeScale';
import { selectNewScaleUnitFromId } from '$/store/generalReducer';
import { useDidUpdate, useDisclosure } from '@mantine/hooks';
import { useDeferredUpdateEffect } from '$/hooks/useDeferredEffect';
import PresetDropdown from '$code-generation/components/PresetDropdown';
import { createSelector } from '@reduxjs/toolkit';
import ThemeScaleCodeRules from '$code-generation/models/ThemeScaleCodeRules';
import {
  disableDecimalPointReplacementInKeys,
  enableDecimalPointReplacementInKeys,
  updateCodeRules,
} from '$code-generation/store/codeGenerationReducer';
import { selectActivePresetItem } from '$code-generation/store/codeGenerationSelectors';
import { createStructuredSelector } from 'reselect';
import { StoreState } from '$/store/store';
import { useMemo } from 'react';
import { defaultCodeRules } from '$code-generation/constants';

const composeScaleUnitSelectItem = ({ id, name }: ThemeScaleUnit): SelectItem => ({
  value: id,
  label: name,
});

const selectActivePresetFormValues = createSelector(selectActivePresetItem, (item) => item?.data);

const selectCodeFormData = createStructuredSelector({
  currentCodeRules: (s: StoreState) => s.codeGeneration.codeSystemRules,
  selectableScales: selectApplicableThemeScaleUnits,
  selectedScale: selectActiveThemeScaleUnit,
  selectedPresetFormValues: selectActivePresetFormValues,
  selectedScaleType: selectSelectedScaleType,
});

const useThemeScaleCodeForm = () => {
  const dispatch = useStoreDispatch();
  const { currentCodeRules, selectableScales, selectedScale, selectedPresetFormValues } =
    useStoreSelector(selectCodeFormData);

  const { getInputProps, values, errors, setValues } = useForm<ThemeScaleCodeRules>({
    initialValues: currentCodeRules,
  });

  const [
    keyDecimalPointSubstitutionIsEnabled,
    { toggle: toggleKeyDecimalPointSubstitutionIsEnabled },
  ] = useDisclosure(values.keyDecimalPointReplacement !== undefined);

  const unitSelectProps: Pick<SelectProps, 'data' | 'value' | 'onChange'> = useMemo(
    () => ({
      data: selectableScales.map(composeScaleUnitSelectItem),
      onChange: flow(selectNewScaleUnitFromId, dispatch),
      value: selectedScale?.id,
    }),
    [selectableScales, selectedScale, dispatch]
  );

  useDidUpdate(() => {
    // # Apply preset when one is selected
    if (selectedPresetFormValues) {
      setValues(selectedPresetFormValues);
    } else {
      setValues(defaultCodeRules);
    }
  }, [selectedPresetFormValues]);

  useDeferredUpdateEffect((deferredValues) => {
    //# Save form values to global state on change
    if (D.isEmpty(errors)) {
      dispatch(updateCodeRules(deferredValues));
    }
  }, values);

  useDeferredUpdateEffect((deferredDecimalSubEnabled) => {
    // # Save state of key decimal point substitution switch to global state
    if (deferredDecimalSubEnabled && !values.keyDecimalPointReplacement) {
      dispatch(enableDecimalPointReplacementInKeys());
    }
    if (!deferredDecimalSubEnabled) {
      dispatch(disableDecimalPointReplacementInKeys());
    }
  }, keyDecimalPointSubstitutionIsEnabled);

  return {
    unitSelectProps,
    getInputProps,
    values,
    keyDecimalPointSubstitutionIsEnabled,
    toggleKeyDecimalPointSubstitutionIsEnabled,
  };
};

const ThemeScaleCodeForm: React.FC = () => {
  const {
    unitSelectProps,
    getInputProps,
    values,
    keyDecimalPointSubstitutionIsEnabled,
    toggleKeyDecimalPointSubstitutionIsEnabled,
  } = useThemeScaleCodeForm();

  return (
    <Stack>
      <PresetDropdown />
      <Select label="Units" {...unitSelectProps} />
      <Divider />
      <Group direction="column">
        <Group sx={{ width: '100%' }}>
          <TextInput sx={{ flex: 1 }} label="Prefix" {...getInputProps('prefix')} />
          <TextInput sx={{ flex: 1 }} label="Postfix" {...getInputProps('postfix')} />
        </Group>
        <SimpleGrid cols={2} sx={{ width: '100%' }}>
          <Switch
            label="Use Line Breaks?"
            checked={values.useLineBreaks}
            {...getInputProps('useLineBreaks')}
          />
          <Switch
            label="Indent Values?"
            checked={values.useIndentation}
            {...getInputProps('useIndentation')}
          />
          <Switch label="Show Labels" checked={values.showLabel} {...getInputProps('showLabel')} />
          <Switch label="Show Keys " checked={values.showKey} {...getInputProps('showKey')} />
          <Switch
            label="Replace Decimal Points In Keys"
            styles={{
              root: {
                flexDirection: 'row-reverse',
                gap: 16,
                justifyContent: 'flex-end',
              },
              label: {
                paddingLeft: 0,
              },
            }}
            checked={keyDecimalPointSubstitutionIsEnabled}
            onChange={toggleKeyDecimalPointSubstitutionIsEnabled}
          />
          <TextInput
            {...getInputProps('keyDecimalPointReplacement')}
            disabled={!keyDecimalPointSubstitutionIsEnabled}
          />
        </SimpleGrid>
      </Group>
      <Divider />
      <Group direction="column">
        <SimpleGrid cols={2} sx={{ width: '100%' }}>
          <TextInput
            label="Label -> Key Separator"
            {...getInputProps('labelKeySeparator')}
            disabled={!values.showLabel}
          />
          <TextInput
            label="Key -> Value Separator"
            {...getInputProps('keyValueSeparator')}
            disabled={!values.showKey}
          />
          <TextInput label="Line Prefix" {...getInputProps('linePrefix')} />
          <TextInput label="Line Postfix" {...getInputProps('linePostfix')} />
        </SimpleGrid>
      </Group>
    </Stack>
  );
};

export default ThemeScaleCodeForm;
