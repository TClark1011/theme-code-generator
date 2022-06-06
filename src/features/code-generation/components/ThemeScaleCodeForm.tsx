import { ThemeScaleFormProps } from '$code-generation/model';
import { GeneratedCodePreview } from '$code-generation/components';
import { defaultCodeSystem } from '$code-generation/constants';
import { systemToFormValues } from '$code-generation/logic';
import { useStoreDispatch } from '$/logic';
import { Group, Stack, Switch, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { D } from '@mobily/ts-belt';
import { useEffect } from 'react';

const initialValues = systemToFormValues(defaultCodeSystem);

const ThemeScaleCodeForm: React.FC = () => {
  const dispatch = useStoreDispatch();
  const { getInputProps, values, errors } = useForm<ThemeScaleFormProps>({
    initialValues,
  });

  useEffect(() => {
    if (D.isEmpty(errors)) {
      dispatch.codeGeneration.updateCodeSystemFromForm(values);
    }
  }, [values, errors, dispatch]);

  return (
    <Stack>
      <Group>
        <TextInput label="prefix" {...getInputProps('prefix')} />
        <TextInput label="postfix" {...getInputProps('postfix')} />
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
      </Group>
      <Group direction="column">
        <Group align="flex-end">
          <TextInput label="prefix" {...getInputProps('lineRules.prefix')} />
          {values['lineRules.showLabel'] && (
            <>
              <Text>Label</Text>
              <TextInput
                label="Label -> Index Separator"
                {...getInputProps('lineRules.labelIndexSeparator')}
              />
              <Text>1</Text>
            </>
          )}
          {values['lineRules.showIndex'] && (
            <TextInput
              label="Index -> Value Separator"
              {...getInputProps('lineRules.indexValueSeparator')}
            />
          )}
          <Text>16px</Text>
          <TextInput label="Postfix" {...getInputProps('lineRules.postfix')} />
        </Group>
        <GeneratedCodePreview />
      </Group>
    </Stack>
  );
};

export default ThemeScaleCodeForm;
