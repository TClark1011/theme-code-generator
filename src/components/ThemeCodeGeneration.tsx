import ActiveScaleSelection from '$/components/ActiveScaleSelection';
import ActiveVisualization from '$/components/ActiveVisualization';
import ScaleSwitcher from '$/components/ScaleSwitcher';
import { gotoNextStep, gotoPreviousStep, gotoStep } from '$/store/generalReducer';
import { selectIsAtFirstStep, selectIsAtLastStep, selectStepNumber } from '$/store/selectors';
import { useStoreDispatch, useStoreSelector } from '$/store/storeHooks';
import { GeneratedCodePreview, ThemeScaleCodeForm } from '$code-generation';
import { Box, Button, Center, Container, Divider, Group, Paper, Stepper } from '@mantine/core';
import { flow } from '@mobily/ts-belt';
import { FC } from 'react';
import { createStructuredSelector } from 'reselect';

const selectCodeGenerationStepperData = createStructuredSelector({
  currentStep: selectStepNumber,
  isAtFirstStep: selectIsAtFirstStep,
  isAtLastStep: selectIsAtLastStep,
});
const ThemeCodeGeneration: FC = () => {
  const dispatch = useStoreDispatch();
  const { currentStep, isAtFirstStep, isAtLastStep } = useStoreSelector(
    selectCodeGenerationStepperData
  );

  return (
    <Container sx={{ height: '100vh' }} pt={64}>
      <Box>
        <Stepper
          active={currentStep}
          onStepClick={flow(gotoStep, dispatch)}
          styles={{
            steps: {
              paddingBottom: 16,
            },
          }}
        >
          <Stepper.Step label="Choose theme type">
            <Center>
              <ScaleSwitcher />
            </Center>
          </Stepper.Step>
          <Stepper.Step label="Select Values">
            <ActiveScaleSelection />
            <Divider my={16} />
            <ActiveVisualization />
          </Stepper.Step>
          <Stepper.Step label="Code Generation Rules">
            <ThemeScaleCodeForm />
          </Stepper.Step>
          <Stepper.Step label="Copy Code">
            <Center>
              <Paper shadow="md">
                <GeneratedCodePreview />
              </Paper>
            </Center>
          </Stepper.Step>
        </Stepper>
        <Divider my={24} />
        <Center>
          <Group>
            {!isAtFirstStep && (
              <Button color="gray" onClick={flow(gotoPreviousStep, dispatch)}>
                Back
              </Button>
            )}
            {!isAtLastStep && (
              <Button disabled={isAtLastStep} onClick={flow(gotoNextStep, dispatch)}>
                Next
              </Button>
            )}
          </Group>
        </Center>
      </Box>
    </Container>
  );
};

export default ThemeCodeGeneration;
