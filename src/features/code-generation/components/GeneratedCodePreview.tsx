import { selectGeneratedCode } from '$code-generation/logic';
import { useStoreSelector } from '$/logic';
import { Code } from '@mantine/core';

const GeneratedCodePreview: React.FC = () => {
  const generatedCode = useStoreSelector(selectGeneratedCode);

  return (
    <Code block sx={{ width: '100%' }}>
      {generatedCode}
    </Code>
  );
};

export default GeneratedCodePreview;
