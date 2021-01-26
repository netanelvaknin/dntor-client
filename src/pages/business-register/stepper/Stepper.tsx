import {Fragment} from "react";
import {StepName, StepNumberButton, StepperContainerStyle,} from "./StepperStyle";
import {Grid} from "@material-ui/core";
import {useSmallScreen} from "../../../hooks/index";
import checkedIcon from "../../../assets/icons/checked_icon.svg";

type Step = {
    stepNumber: number;
    stepName: string;
    component: React.ReactNode;
};

interface StepperProps {
    steps: Step[];
    activeStep: number;
}

export const Stepper = ({steps, activeStep}: StepperProps) => {
    const isSmallScreen = useSmallScreen();

    return (
        <StepperContainerStyle>
            <Grid container alignItems="center" style={{height: "100%"}}>
                {steps.map(({stepNumber, stepName, component}) => {
                    return (
                        <Fragment key={stepNumber}>
                            <Grid item md={4}>
                                <StepNumberButton
                                    $completed={activeStep > stepNumber}
                                    $activeStep={activeStep === stepNumber}
                                    disabled={activeStep !== stepNumber}
                                >
                                    {!isSmallScreen && (
                                        <span>{activeStep > stepNumber ? (
                                            <img src={checkedIcon} alt="הסתיים"/>) : (stepNumber)}</span>
                                    )}
                                </StepNumberButton>
                            </Grid>

                            {!isSmallScreen && (
                                <Grid item md={8}>
                                    <StepName>{stepName}</StepName>
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
