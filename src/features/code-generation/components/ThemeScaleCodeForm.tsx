import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import {
  Button,
  Collapse,
  Divider,
  Group,
  Select,
  SelectItem,
  SelectProps,
  SimpleGrid,
  Space,
  Stack,
  Switch,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { B, D, flow } from '@mobily/ts-belt';
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
import defaultCodeRules from '$code-generation/constants/defaultCodeRules';
import CodeLabelInput from '$code-generation/components/CodeLabelInput';
import GeneratedCodePreview from '$code-generation/components/GeneratedCodePreview';
import { match } from 'ts-pattern';
import useStoredState from '$/hooks/useStoredState';
import { ChevronRight } from 'tabler-icons-react';

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

const useAdvancedFieldsAreExpandedState = () => {
  const [advancedFieldsAreExpanded, setAdvancedFieldsAreExpanded] = useStoredState(
    'session',
    'theme-code-advanced-fields-expanded',
    false
  );

  const toggleAdvancedFieldsExpansion = () => setAdvancedFieldsAreExpanded(B.inverse);

  return {
    advancedFieldsAreExpanded,
    toggleAdvancedFieldsExpansion,
  };
};

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

  const labelKeySeparatorIsEnabled = values.showLabel || values.showKey;
  const labelKeySeparatorLabel = match({
    showLabel: values.showLabel,
    showKey: values.showKey,
  })
    .with(
      { showLabel: true, showKey: true },
      { showLabel: false, showKey: false },
      () => 'Label/Key Separator'
    )
    .with({ showLabel: true, showKey: false }, () => 'Label Postfix')
    .with({ showKey: true, showLabel: false }, () => 'Key Prefix')
    .exhaustive();

  const keyValueSeparatorLabel = values.showKey ? 'Key/Value Separator' : 'Value Prefix';

  return {
    unitSelectProps,
    getInputProps,
    keyDecimalPointSubstitutionIsEnabled,
    toggleKeyDecimalPointSubstitutionIsEnabled,
    keyValueSeparatorLabel,
    labelKeySeparatorLabel,
    labelKeySeparatorIsEnabled,
  };
};

const ThemeScaleCodeForm: React.FC = () => {
  const {
    unitSelectProps,
    getInputProps,
    keyDecimalPointSubstitutionIsEnabled,
    toggleKeyDecimalPointSubstitutionIsEnabled,
    keyValueSeparatorLabel,
    labelKeySeparatorLabel,
    labelKeySeparatorIsEnabled,
  } = useThemeScaleCodeForm();

  const { advancedFieldsAreExpanded, toggleAdvancedFieldsExpansion } =
    useAdvancedFieldsAreExpandedState();

  return (
    <Stack>
      <Group sx={{ width: '100%', justifyContent: 'stretch', '& > *': { flex: '1 !important' } }}>
        <CodeLabelInput />
        <Select label="Units" {...unitSelectProps} />
      </Group>
      <PresetDropdown />
      <Divider
        label={
          <Button
            onClick={toggleAdvancedFieldsExpansion}
            variant="subtle"
            size="xs"
            px={4}
            color="dark"
          >
            <ChevronRight
              size={16}
              style={{
                transition: 'transform 0.2s ease-in-out',
                transform: advancedFieldsAreExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                marginRight: 4,
              }}
            />
            {advancedFieldsAreExpanded ? 'Hide Advanced Options' : 'Show Advanced Options'}
          </Button>
        }
      />
      <Collapse in={advancedFieldsAreExpanded}>
        <Stack>
          <Group direction="column">
            <Group sx={{ width: '100%' }}>
              <TextInput sx={{ flex: 1 }} label="Prefix" {...getInputProps('prefix')} />
              <TextInput sx={{ flex: 1 }} label="Postfix" {...getInputProps('postfix')} />
            </Group>
            {/* //# GRID OF CHECKBOXES */}
            <SimpleGrid cols={2} sx={{ width: '100%' }}>
              <Switch
                label="Line Break After Prefix"
                {...getInputProps('lineBreakAfterPrefix', {
                  type: 'checkbox',
                })}
              />
              <Switch
                label="Line Break Before Postfix"
                {...getInputProps('lineBreakBeforePostfix', {
                  type: 'checkbox',
                })}
              />
              <Switch
                label="Use Line Breaks"
                {...getInputProps('useLineBreaks', {
                  type: 'checkbox',
                })}
              />
              <Switch
                label="Indent Values"
                {...getInputProps('useIndentation', {
                  type: 'checkbox',
                })}
              />
              <Switch
                label="Show Labels"
                {...getInputProps('showLabel', {
                  type: 'checkbox',
                })}
              />
              <Switch
                label="Show Keys "
                {...getInputProps('showKey', {
                  type: 'checkbox',
                })}
              />
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
          {/* //# LINE OPTIONS */}
          <Group direction="column">
            <SimpleGrid cols={2} sx={{ width: '100%' }}>
              <TextInput
                disabled={!labelKeySeparatorIsEnabled}
                label={labelKeySeparatorLabel}
                {...getInputProps('labelKeySeparator')}
              />
              <TextInput label={keyValueSeparatorLabel} {...getInputProps('keyValueSeparator')} />
              <TextInput label="Line Prefix" {...getInputProps('linePrefix')} />
              <TextInput label="Line Postfix" {...getInputProps('linePostfix')} />
            </SimpleGrid>
          </Group>
          <Divider mb={32} />
        </Stack>
      </Collapse>
      <Title order={3}>Preview</Title>
      <GeneratedCodePreview singleLine fullWidth hideCopyButton />
      <Space h={16} />
    </Stack>
  );
};

export default ThemeScaleCodeForm;
