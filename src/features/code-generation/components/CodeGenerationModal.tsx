import { ThemeScaleCodeForm, GeneratedCodePreview } from '$code-generation/components';
import { useStoreDispatch, useStoreSelector } from '$/logic';
import { Divider, Modal } from '@mantine/core';

const CodeGenerationModal: React.FC = () => {
  const isOpen = useStoreSelector((s) => s.codeGeneration.codeGenerationModalIsOpen);
  const dispatch = useStoreDispatch();
  const scaleType = useStoreSelector((s) => s.general.selectedScaleType);

  const handleClose = () => {
    dispatch.codeGeneration.setCodeGenerationModalIsOpen(false);
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
