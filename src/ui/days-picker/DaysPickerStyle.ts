import styled from 'styled-components/macro';

export const DaysPickerContainer = styled.div`
    display: flex;
    max-width: 27.5rem;
`;

interface DayButtonWrapperProps {
    active: boolean;
}

/**
 * I used DayButtonWrapper instead directly styling the MuiButton
 * because material ui didnt support additional props like "active"
 */
export const DayButtonWrapper = styled.div<DayButtonWrapperProps>`
    margin: .7rem;
    & .MuiButtonBase-root,
    & .MuiButtonBase-root:hover {
        border-radius:50%;
        width: 2.4rem;
        height: 2.4rem;
        background-color: ${props => props.active && props.theme.palette.primary.main};
        min-width: 0;
        border: ${props => props.active ? '0' : '1px solid #E2E2E2'};
        .MuiButton-label {
            color: ${props => props.active ? 'white' : '#E2E2E2'};
        }
    }
`;