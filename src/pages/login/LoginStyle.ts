import styled from 'styled-components/macro';
import { Card, TextField, Button } from "../../ui/index";
import { GradientButton } from "../../components";
import LoginBackground from './login_background.svg';
import ManStanding from './man_standing.svg';


export const LoginPageStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-image: url(${LoginBackground});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

export const LoginCard = styled(Card)`
    max-width: 38.2rem;
    padding: 3.8rem 5rem;
    position: relative;

    &::before {
        content: '';
        width: 15rem;
        height: 100%;
        background-image: url(${ManStanding});
        background-repeat: no-repeat;
        z-index: 9;
        position: absolute;
        top: 5rem;
        right: -10.8rem;
    }
`;

export const RegisterForFreeButton = styled(GradientButton)`
    margin-bottom: 3.6rem!important;
`;

export const IAlreadyHaveAccountText = styled.span`
    font-size: 1.4rem;
    margin: 0 2rem 3.7rem;
`;

export const HorizontalLine = styled.div`
    width: 5.5rem;
    height: 1px;
    background: #000000;
    margin-bottom: 3.7rem;
`;

export const TextFieldStyle = styled(TextField)`
    width: 28rem;
    margin: 1rem 0!important;
`;

export const ConnectButton = styled(Button)`
    width: 28rem;
    height: 3rem;
`;