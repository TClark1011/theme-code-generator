import { Box, Code } from '@mantine/core';
import { useStoreSelector } from '$/store/storeHooks';
import {
  selectCodeSystemRules,
  selectGeneratedCode,
  selectSingleGeneratedCodeLine,
} from '$code-generation/store/codeGenerationSelectors';
import CopyActionIcon from '$/components/CopyActionIcon';
import { FC } from 'react';
import { A, D, F } from '@mobily/ts-belt';
import { StoreSelector } from '$/store/store';
import useAnalyticsDispatch from '$/hooks/useAnalyticsDispatch';
import { selectActiveScaleValues, selectSelectedScaleType } from '$/store/selectors';
import { createSelector } from 'reselect';

const selectRawScaleValues = createSelector(selectActiveScaleValues, A.map(D.getUnsafe('value')));
export const useCodeCopiedAnalyticsEvent = () => {
  const generatedCode = useStoreSelector(selectGeneratedCode);
  const scaleValues = useStoreSelector(selectRawScaleValues);
  const codeRules = useStoreSelector(selectCodeSystemRules);
  const scaleType = useStoreSelector(selectSelectedScaleType);
  const dispatchAnalyticsEvent = useAnalyticsDispatch();

  const fireCopiedEvent = () =>
    dispatchAnalyticsEvent('copiedCode', {
      props: {
        code: generatedCode,
        codeRules,
        scaleType,
        values: scaleValues,
      },
    });

  return fireCopiedEvent;
};

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
  const fireCopyAnalyticsEvent = useCodeCopiedAnalyticsEvent();
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
          onCopy={fireCopyAnalyticsEvent}
        />
      )}
    </Box>
  );
};

export default GeneratedCodePreview;
