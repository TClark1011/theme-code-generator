import { ThemeScaleFormProps } from '$code-generation/model';
import { systemToFormValues, updateCodeSystemFromForm } from '$code-generation/logic';
import { Divider, Group, SimpleGrid, Stack, Switch, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { D } from '@mobily/ts-belt';
import { useEffect } from 'react';
import { useStoreDispatch, useStoreSelector } from '$/store';

const ThemeScaleCodeForm: React.FC = () => {
  const dispatch = useStoreDispatch();
  const currentSystem = useStoreSelector((s) => s.codeGeneration.codeSystemRules);
  const { getInputProps, values, errors } = useForm<ThemeScaleFormProps>({
    initialValues: systemToFormValues(currentSystem),
  });

  useEffect(() => {
    if (D.isEmpty(errors)) {
      dispatch(updateCodeSystemFromForm(values));
    }
  }, [values, errors, dispatch]);

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
            label="Show Indexes "
            checked={values['lineRules.showIndex']}
            {...getInputProps('lineRules.showIndex')}
          />
        </SimpleGrid>
      </Group>
      <Divider />
      <Group direction="column">
        <SimpleGrid cols={2} sx={{ width: '100%' }}>
          <TextInput
            label="Label -> Index Separator"
            {...getInputProps('lineRules.labelIndexSeparator')}
            disabled={!values['lineRules.showLabel']}
          />
          <TextInput
            label="Index -> Value Separator"
            {...getInputProps('lineRules.indexValueSeparator')}
            disabled={!values['lineRules.showIndex']}
          />
          <TextInput label="Prefix" {...getInputProps('lineRules.prefix')} />
          <TextInput label="Postfix" {...getInputProps('lineRules.postfix')} />
        </SimpleGrid>
      </Group>
    </Stack>
  );
};

export default ThemeScaleCodeForm;
