import styled from 'styled-components/macro';
import { TextField, Button } from "../../ui/index";
import { GradientButton } from "../../components";
import LoginBackground from '../../assets/backgrounds/login_background.svg';
import ManStanding from './man_standing.svg';
import {LoginCard} from '../../components/index';
import {mobile} from '../../utils/screen-sizes';
import {Grid} from '@material-ui/core';

export const LoginPageStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${LoginBackground});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
    padding-top: 9rem;

    @media ${mobile} {
        padding-top: 0;
    }
`;

export const LoginCardStyle = styled(LoginCard)`
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

        @media ${mobile} {
            display: none;
        }
    }
`;

export const RegisterForFreeButton = styled(GradientButton)`
    margin-bottom: 3.6rem!important;
    @media ${mobile} {
        margin-top: 13rem!important;
    }
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

    &.MuiButtonBase-root {
        @media ${mobile} {
            margin-bottom: 2rem;
        }
    }
    
`;

export const GridStyle = styled(Grid)`
    @media ${mobile} {
        max-width: 35rem;
    }
`;