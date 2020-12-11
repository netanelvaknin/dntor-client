import styled from 'styled-components/macro';
import {IconButton} from '@material-ui/core';

export const StepperContainerStyle = styled.div`
    position: absolute;
    top: 0;
    left: -16.6rem;
    height: 100%;
    width: 19rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

interface StepNumberButtonProps {
    active: boolean;
}

export const StepNumberButton = styled(IconButton)<StepNumberButtonProps>`
    &.MuiButtonBase-root,
    &.MuiButtonBase-root:hover {
        border: 1px solid #E2E2E2;
        background: ${props => props.active ? '#1EE3CF' : '#fff'};
        color: ${props => props.active ? '#fff' : '#E2E2E2'};
        width: 4.5rem;
        height: 4.5rem;
    }
`;

export const StepName = styled.span`
    font-weight: 300;
    font-size: 1.8rem;
`;