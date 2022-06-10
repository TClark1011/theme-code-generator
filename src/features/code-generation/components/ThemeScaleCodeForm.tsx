import { ThemeScaleFormProps } from '$code-generation/models/themeCodeTypes';
import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import {
  disableDecimalPointSubstitutionInKeys,
  enableDecimalPointSubstitutionInKeys,
  updateCodeSystemFromForm,
} from '$code-generation/logic/codeGenerationReducer';
import { systemToFormValues } from '$code-generation/logic/codeFormHelpers';
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
import { D, F, flow } from '@mobily/ts-belt';
import { selectActiveThemeScaleUnit, selectApplicableThemeScaleUnits } from '$/store/selectors';
import { ThemeScaleUnit } from '$/models/ThemeScale';
import { selectNewScaleUnitFromId } from '$/store/generalReducer';
import { useDisclosure } from '@mantine/hooks';
import useDeferredEffect from '$/hooks/useDeferredEffect';

const composeScaleUnitSelectItem = ({ id, name }: ThemeScaleUnit): SelectItem => ({
  value: id,
  label: name,
});

const ThemeScaleCodeForm: React.FC = () => {
  const dispatch = useStoreDispatch();
  const currentSystem = useStoreSelector((s) => s.codeGeneration.codeSystemRules);
  const selectableScales = useStoreSelector(selectApplicableThemeScaleUnits);
  const selectedScale = useStoreSelector(selectActiveThemeScaleUnit);

  const { getInputProps, values, errors } = useForm<ThemeScaleFormProps>({
    initialValues: systemToFormValues(currentSystem),
  });

  const [
    keyDecimalPointSubstitutionIsEnabled,
    { toggle: toggleKeyDecimalPointSubstitutionIsEnabled },
  ] = useDisclosure(values['lineRules.keyDecimalPointSubstitution'] !== undefined);

  useDeferredEffect((deferredFormValues) => {
    if (D.isEmpty(errors)) {
      dispatch(updateCodeSystemFromForm(deferredFormValues));
    }
  }, values);

  useDeferredEffect((enabled) => {
    if (!enabled) {
      dispatch(disableDecimalPointSubstitutionInKeys());
    } else if (values['lineRules.keyDecimalPointSubstitution']) {
      dispatch(
        enableDecimalPointSubstitutionInKeys(values['lineRules.keyDecimalPointSubstitution'])
      );
    }
  }, keyDecimalPointSubstitutionIsEnabled);

  return (
    <Stack>
      <Group direction="column">
        <Group sx={{ width: '100%' }}>
          <TextInput sx={{ flex: 1 }} label="prefix" {...getInputProps('prefix')} />
          <TextInput sx={{ flex: 1 }} label="postfix" {...getInputProps('postfix')} />
        </Group>
        <SimpleGrid cols={2} sx={{ width: '100%' }}>
          <Switch
            label="Use Line Breaks?"
            checked={values.lineBreaks}
            {...getInputProps('lineBreaks')}
          />
          <Switch
            label="Indent Values?"
            checked={values.indentValues}
            {...getInputProps('indentValues')}
          />
          <Switch
            label="Show Labels"
            checked={values['lineRules.showLabel']}
            {...getInputProps('lineRules.showLabel')}
          />
          <Switch
            label="Show Keyes "
            checked={values['lineRules.showKey']}
            {...getInputProps('lineRules.showKey')}
          />
          <Switch
            label="Replace Decimal Points In Keys"
            wrapperProps={{ style: { flexDirection: 'row-reverse' } }}
            checked={keyDecimalPointSubstitutionIsEnabled}
            onChange={toggleKeyDecimalPointSubstitutionIsEnabled}
          />
          <TextInput
            {...getInputProps('lineRules.keyDecimalPointSubstitution')}
            disabled={!keyDecimalPointSubstitutionIsEnabled}
          />
        </SimpleGrid>
      </Group>
      <Divider />
      <Group direction="column">
        <SimpleGrid cols={2} sx={{ width: '100%' }}>
          <TextInput
            label="Label -> Key Separator"
            {...getInputProps('lineRules.labelKeySeparator')}
            disabled={!values['lineRules.showLabel']}
          />
          <TextInput
            label="Key -> Value Separator"
            {...getInputProps('lineRules.keyValueSeparator')}
            disabled={!values['lineRules.showKey']}
          />
          <TextInput label="Prefix" {...getInputProps('lineRules.prefix')} />
          <TextInput label="Postfix" {...getInputProps('lineRules.postfix')} />
        </SimpleGrid>
      </Group>
      <Divider />
      <Select
        label="Units"
        data={selectableScales.map(composeScaleUnitSelectItem)}
        value={selectedScale.id}
        onChange={flow(F.tap(console.log), selectNewScaleUnitFromId, dispatch)}
      />
    </Stack>
  );
};

export default ThemeScaleCodeForm;
