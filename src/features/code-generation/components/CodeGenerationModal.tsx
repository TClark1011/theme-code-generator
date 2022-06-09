import { setCodeGenerationModalIsOpen } from '$code-generation/logic/codeGenerationReducer';
import GeneratedCodePreview from '$code-generation/components/GeneratedCodePreview';
import { Divider, Modal } from '@mantine/core';
import { StoreState } from '$/store/store';
import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import ThemeScaleCodeForm from '$code-generation/components/ThemeScaleCodeForm';

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
