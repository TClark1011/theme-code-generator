import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import getInputOnChangeValue from '$/utils/getInputOnChangeValue';
import { updateCodeLabel } from '$code-generation/store/codeGenerationReducer';
import { selectCodeLabel } from '$code-generation/store/codeGenerationSelectors';
import { TextInput, TextInputProps } from '@mantine/core';
import { flow } from '@mobily/ts-belt';
import { FC } from 'react';
import { Except } from 'type-fest';

export type CodeLabelInputProps = Except<TextInputProps, 'label' | 'value' | 'onChange'>;

const CodeLabelInput: FC<CodeLabelInputProps> = (props) => {
  const dispatch = useStoreDispatch();
  const customCodeLabel = useStoreSelector(selectCodeLabel);

  return (
    <TextInput
      label="Label"
      value={customCodeLabel}
      onChange={flow(getInputOnChangeValue, updateCodeLabel, dispatch)}
      {...props}
    />
  );
};

export default CodeLabelInput;
