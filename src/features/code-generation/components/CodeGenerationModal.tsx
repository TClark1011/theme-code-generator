import { setCodeGenerationModalIsOpen } from '$code-generation/logic';
import { StoreState, useStoreDispatch, useStoreSelector } from '$/store';
import { ThemeScaleCodeForm, GeneratedCodePreview } from '$code-generation/components';
import { Divider, Modal } from '@mantine/core';

const codeGenerationModalSelector = (state: StoreState) => ({
  isOpen: state.codeGeneration.codeGenerationModalIsOpen,
  scaleType: state.general.selectedScaleType,
});

const CodeGenerationModal: React.FC = () => {
  const { isOpen, scaleType } = useStoreSelector(codeGenerationModalSelector);
  const dispatch = useStoreDispatch();

  const handleClose = () => {
    dispatch(setCodeGenerationModalIsOpen(false));
  };

  return (
    <Modal opened={isOpen} onClose={handleClose} title={`Generate ${scaleType} code`} size="md">
      <ThemeScaleCodeForm />
      <Divider my="md" />
      <GeneratedCodePreview />
    </Modal>
  );
};

export default CodeGenerationModal;
