import { Box, Code } from '@mantine/core';
import { useStoreSelector } from '$/store/storeHooks';
import {
  selectGeneratedCode,
  selectSingleGeneratedCodeLine,
} from '$code-generation/store/codeGenerationSelectors';
import CopyActionIcon from '$/components/CopyActionIcon';
import { FC } from 'react';
import { F } from '@mobily/ts-belt';
import { StoreSelector } from '$/store/store';

export type GeneratedCodePreviewProps = {
  singleLine?: boolean;
  hideCopyButton?: boolean;
  fullWidth?: boolean;
};

const composeGeneratedCodeSelector: (p: boolean) => StoreSelector<string> = F.ifElse(
  F.identity,
  () => selectSingleGeneratedCodeLine,
  () => selectGeneratedCode
);

const GeneratedCodePreview: FC<GeneratedCodePreviewProps> = ({
  singleLine = false,
  fullWidth = false,
  hideCopyButton = false,
}) => {
  const generatedCode = useStoreSelector(composeGeneratedCodeSelector(singleLine));

  return (
    <Box sx={{ position: 'relative' }}>
      <Code block sx={{ width: '100%', ...(!fullWidth && { maxWidth: '50vw' }) }} pr={64}>
        {generatedCode}
      </Code>
      {!hideCopyButton && (
        <CopyActionIcon
          withPopper
          text={generatedCode}
          sx={{ position: 'absolute', top: 8, right: 8 }}
          popperProps={{
            position: 'left',
          }}
        />
      )}
    </Box>
  );
};

export default GeneratedCodePreview;
