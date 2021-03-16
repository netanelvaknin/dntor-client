import styled from 'styled-components/macro';
import {IconButton} from '@material-ui/core';
import {tablet, mobile} from '../../../utils/screen-sizes';

export const StepperContainerStyle = styled.div`
    position: absolute;
    top: 0;
    left: -16.6rem;
    height: 100%;
    max-height: 55rem;
    width: 19rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    @media ${tablet} {
       display: none;
    }

    @media ${mobile} {
        display: none;
    }
`;

interface StepNumberButtonProps {
    $activeStep: boolean;
    $completed: boolean;
}

export const StepNumberButton = styled(IconButton)<StepNumberButtonProps>`
    &.MuiButtonBase-root,
    &.MuiButtonBase-root:hover {
        border: 1px solid #E2E2E2;
        background: ${props => props.$activeStep ? '#1EE3CF' : '#fff'};
        color: ${props => props.$activeStep ? '#fff' : '#E2E2E2'};
        width: 4.5rem;
        height: 4.5rem;
        transition: all .5s;
    }

    &.MuiIconButton-root.Mui-disabled {
        background: ${props => props.$completed ? '#DBE8FC' : '#fff'};
    }
`;

export const StepName = styled.span`
    font-weight: 300;
    font-size: 1.8rem;
`;