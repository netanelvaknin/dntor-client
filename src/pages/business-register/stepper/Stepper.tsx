import { Fragment } from "react";
import {
  StepperContainerStyle,
  StepNumberButton,
  StepName,
} from "./StepperStyle";
import { Grid } from "@material-ui/core";
import { useSmallScreen } from "../../../hooks/index";

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
  const isSmallScreen = useSmallScreen();

  return (
    <StepperContainerStyle>
      <Grid container alignItems="center" style={{ height: "100%" }}>
        {steps.map(({ number, name, component }) => {
          return (
            <Fragment key={number}>
              <Grid item md={4}>
                <StepNumberButton
                  $activeStep={activeStep === number}
                  disabled={activeStep !== number}
                >
                  {!isSmallScreen && <span>{number}</span>}
                </StepNumberButton>
              </Grid>

              {!isSmallScreen && (
                <Grid item md={8}>
                  <StepName>{name}</StepName>
                </Grid>
              )}
            </Fragment>
          );
        })}
      </Grid>
    </StepperContainerStyle>
  );
};

export default Stepper;
