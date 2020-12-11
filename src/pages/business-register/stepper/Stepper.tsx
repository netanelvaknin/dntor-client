import {
  StepperContainerStyle,
  StepNumberButton,
  StepName,
} from "./StepperStyle";
import { Grid } from "@material-ui/core";

type Step = {
  number: number;
  name: string;
  component: React.ReactNode;
};

interface StepperProps {
  steps: Step[];
  activeStep: number;
}

export const Stepper = ({ steps, activeStep }: StepperProps) => {
  return (
    <StepperContainerStyle>
      {steps.map(({ number, name, component }) => {
        return (
          <Grid container alignItems="center" key={number}>
            <Grid item md={4}>
              <StepNumberButton
                active={activeStep === number}
                disabled={activeStep !== number}
              >
                {number}
              </StepNumberButton>
            </Grid>
            <Grid item md={8}>
              <StepName>{name}</StepName>
            </Grid>
          </Grid>
        );
      })}
    </StepperContainerStyle>
  );
};

export default Stepper;
