import { selectGeneratedCode } from '$code-generation/logic';
import { useStoreSelector } from '$/logic';
import { ActionIcon, Box, Code, Paper, Popper } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { Clipboard, ClipboardCheck } from 'tabler-icons-react';
import { useState } from 'react';

const GeneratedCodePreview: React.FC = () => {
  const generatedCode = useStoreSelector(selectGeneratedCode);
  const { copy, copied } = useClipboard();
  const [popperEl, setPopperEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Code block sx={{ width: '100%' }}>
          {generatedCode}
        </Code>
        <ActionIcon
          sx={{ position: 'absolute', top: 8, right: 8 }}
          onClick={() => copy(generatedCode)}
          ref={setPopperEl as any}
        >
          {copied ? <ClipboardCheck /> : <Clipboard />}
        </ActionIcon>
      </Box>

      <Popper referenceElement={popperEl as any} mounted={copied}>
        <Paper px={12} py={8} shadow="xl">
          Copied code!
        </Paper>
      </Popper>
    </>
  );
};

export default GeneratedCodePreview;
