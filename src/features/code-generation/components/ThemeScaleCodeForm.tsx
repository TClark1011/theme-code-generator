import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import {
  Divider,
  Group,
  Select,
  SelectItem,
  SimpleGrid,
  Stack,
  Switch,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { D, flow } from '@mobily/ts-belt';
import { selectActiveThemeScaleUnit, selectApplicableThemeScaleUnits } from '$/store/selectors';
import { ThemeScaleUnit } from '$/models/ThemeScale';
import { selectNewScaleUnitFromId } from '$/store/generalReducer';
import { useDidUpdate, useDisclosure } from '@mantine/hooks';
import useDeferredEffect from '$/hooks/useDeferredEffect';
import PresetDropdown from '$code-generation/components/PresetDropdown';
import { createSelector } from '@reduxjs/toolkit';
import ThemeScaleCodeRules from '$code-generation/models/ThemeScaleCodeRules';
import {
  disableDecimalPointReplacementInKeys,
  enableDecimalPointReplacementInKeys,
  updateCodeRules,
} from '$code-generation/store/codeGenerationReducer';
import { selectActivePresetItem } from '$code-generation/store/codeGenerationSelectors';

const composeScaleUnitSelectItem = ({ id, name }: ThemeScaleUnit): SelectItem => ({
  value: id,
  label: name,
});

const selectActivePresetFormValues = createSelector(selectActivePresetItem, (item) => item?.data);

const ThemeScaleCodeForm: React.FC = () => {
  const dispatch = useStoreDispatch();
  const currentCodeRules = useStoreSelector((s) => s.codeGeneration.codeSystemRules);
  const selectableScales = useStoreSelector(selectApplicableThemeScaleUnits);
  const selectedScale = useStoreSelector(selectActiveThemeScaleUnit);
  const selectedPresetFormValues = useStoreSelector(selectActivePresetFormValues);

  const { getInputProps, values, errors, setValues } = useForm<ThemeScaleCodeRules>({
    initialValues: currentCodeRules,
  });

  useDidUpdate(() => {
    if (selectedPresetFormValues) {
      setValues(selectedPresetFormValues);
    }
  }, [selectedPresetFormValues]);

  const [
    keyDecimalPointSubstitutionIsEnabled,
    { toggle: toggleKeyDecimalPointSubstitutionIsEnabled },
  ] = useDisclosure(values.keyDecimalPointReplacement !== undefined);

  useDeferredEffect((deferredFormValues) => {
    if (D.isEmpty(errors)) {
      dispatch(updateCodeRules(deferredFormValues));
    }

    if (values.keyDecimalPointReplacement && !keyDecimalPointSubstitutionIsEnabled) {
      toggleKeyDecimalPointSubstitutionIsEnabled();
    }
  }, values);

  useDeferredEffect((decimalPointReplacementSwitchIsOn) => {
    if (decimalPointReplacementSwitchIsOn && !values.keyDecimalPointReplacement) {
      dispatch(enableDecimalPointReplacementInKeys());
    }
    if (!decimalPointReplacementSwitchIsOn) {
      dispatch(disableDecimalPointReplacementInKeys());
    }
  }, keyDecimalPointSubstitutionIsEnabled);

  return (
    <Stack>
      <PresetDropdown />
      <Divider />
      <Group direction="column">
        <Group sx={{ width: '100%' }}>
          <TextInput sx={{ flex: 1 }} label="prefix" {...getInputProps('prefix')} />
          <TextInput sx={{ flex: 1 }} label="postfix" {...getInputProps('postfix')} />
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
          <Switch label="Show Keyes " checked={values.showKey} {...getInputProps('showKey')} />
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
      <Divider />
      <Select
        label="Units"
        data={selectableScales.map(composeScaleUnitSelectItem)}
        value={selectedScale.id}
        onChange={flow(selectNewScaleUnitFromId, dispatch)}
      />
    </Stack>
  );
};

export default ThemeScaleCodeForm;
