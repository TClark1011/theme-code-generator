import ActiveScaleSelection from '$/components/ActiveScaleSelection';
import ActiveVisualization from '$/components/ActiveVisualization';
import ScaleSwitcher from '$/components/ScaleSwitcher';
import useNumberState from '$/hooks/useNumberState';
import { GeneratedCodePreview, ThemeScaleCodeForm } from '$code-generation';
import { Box, Button, Center, Divider, Paper, Stepper } from '@mantine/core';
import { FC } from 'react';

const ThemeCodeGeneration: FC = () => {
  const [
    currentStep,
    {
      setValue: gotoStep,
      decrement: gotoPreviousStep,
      increment: gotoNextStep,
      isAtMin: isAtFirstStep,
      isAtMax: isAtLastStep,
    },
  ] = useNumberState(0, {
    min: 0,
    max: 3,
  });

  return (
    <Box>
      <Stepper
        active={currentStep}
        onStepClick={gotoStep}
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
      <Center>
        <Box sx={{ display: 'flex', gap: 16 }} mt={16}>
          {!isAtFirstStep && (
            <Button color="gray" onClick={gotoPreviousStep}>
              Back
            </Button>
          )}
          {!isAtLastStep && (
            <Button disabled={isAtLastStep} onClick={gotoNextStep}>
              Next
            </Button>
          )}
        </Box>
      </Center>
    </Box>
  );
};

export default ThemeCodeGeneration;
