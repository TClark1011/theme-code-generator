import { selectCodeGenerationRelatedState } from '$/features/code-generation/logic';
import {
  printThemeScaleCode,
  ThemeScaleCodeLineRules,
  ThemeScaleCodeSystemRules,
} from '$/features/code-generation/model';
import { useStoreSelector } from '$/logic';
import { PrefixKeys } from '$/models';
import { Button, Group, Stack, Switch, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { D, flow } from '@mobily/ts-belt';
import { useEffect, useState } from 'react';
import { Except } from 'type-fest';

type FormType = Except<ThemeScaleCodeSystemRules, 'lineRules'> &
  PrefixKeys<ThemeScaleCodeSystemRules['lineRules'], 'lineRules.'>;

const getLineRulesFromFormValue = (formValues: FormType): ThemeScaleCodeLineRules => ({
  indexValueSeparator: formValues['lineRules.indexValueSeparator'],
  labelIndexSeparator: formValues['lineRules.labelIndexSeparator'],
  postfix: formValues['lineRules.postfix'],
  prefix: formValues['lineRules.prefix'],
  showLabel: formValues['lineRules.showLabel'],
  showIndex: formValues['lineRules.showIndex'],
});

const removeLineRuleKeys: (p: FormType) => Except<ThemeScaleCodeSystemRules, 'lineRules'> =
  D.deleteKeys([
    'lineRules.indexValueSeparator',
    'lineRules.labelIndexSeparator',
    'lineRules.labelIndexSeparator',
    'lineRules.postfix',
    'lineRules.prefix',
  ]);

const unflattenFormValues = (formValues: FormType): ThemeScaleCodeSystemRules => ({
  ...removeLineRuleKeys(formValues),
  lineRules: getLineRulesFromFormValue(formValues),
});

const initialValues: FormType = {
  lineBreaks: true,
  indentValues: true,
  postfix: '',
  prefix: '',
  'lineRules.indexValueSeparator': '',
  'lineRules.labelIndexSeparator': '',
  'lineRules.postfix': '',
  'lineRules.prefix': '',
  'lineRules.showLabel': true,
  'lineRules.showIndex': true,
};

const ThemeScaleCodeForm: React.FC = () => {
  const { getInputProps, onSubmit, values } = useForm<FormType>({
    initialValues,
  });

  const [submittedState, setSubmittedState] = useState<ThemeScaleCodeSystemRules>();

  const a = useStoreSelector(
    selectCodeGenerationRelatedState(submittedState ?? unflattenFormValues(initialValues))
  );

  useEffect(() => {
    const printed = printThemeScaleCode(a);
    console.log(printed);
  }, [a]);

  return (
    <form onSubmit={onSubmit(flow(unflattenFormValues, setSubmittedState))}>
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
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};

export default ThemeScaleCodeForm;
