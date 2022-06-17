import { Box, Code } from '@mantine/core';
import { useStoreSelector } from '$/store/storeHooks';
import { selectGeneratedCode } from '$code-generation/store/codeGenerationSelectors';
import CopyActionIcon from '$/components/CopyActionIcon';

const GeneratedCodePreview: React.FC = () => {
  const generatedCode = useStoreSelector(selectGeneratedCode);

  return (
    <Box sx={{ position: 'relative' }}>
      <Code block sx={{ width: '100%' }}>
        {generatedCode}
      </Code>
      <CopyActionIcon
        withPopper
        text={generatedCode}
        sx={{ position: 'absolute', top: 8, right: 8 }}
        popperProps={{
          position: 'left',
        }}
      />
    </Box>
  );
};

export default GeneratedCodePreview;
