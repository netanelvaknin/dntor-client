import styled from 'styled-components/macro';
import { Button } from "../../button/Button";

export const TimePickerToolbarStyle = styled.div`
    max-width: 31rem;
    text-align: center;
    background: #ededed91;
    padding-bottom: 1rem;
`;


export const DisplayTimeButton = styled.button`
    margin: 1rem;
    padding: 1rem;
    font-size: 2rem;
    outline: none;
`;

export const CurrentTime = styled.span`
    display: block;
    margin: 1rem;
    font-weight: bold;
`;

export const Explanation = styled.p`
    font-size: 1.5rem;
    max-width: 27rem;
    margin: 0 auto;
    text-align: right;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem auto 1rem;
    max-width: 20rem;
`;

export const HoursAndMinutesButton = styled(Button)`
    padding: 1.5rem;
    margin: .7rem 0;
`;