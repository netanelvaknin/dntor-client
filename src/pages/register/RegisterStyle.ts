import styled from 'styled-components/macro';
import RegisterBackground from '../../assets/backgrounds/login_background.svg';
import {Typography} from '@material-ui/core';
import {mobile} from '../../utils/screen-sizes';
import { Button, TextField } from "../../ui/index";
import { LoginCard } from "../../components/index";

export const RegisterPageStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${RegisterBackground});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: calc(100vh - 85px);
    padding-top: 9rem;

    @media ${mobile} {
        padding-top: 0;
    }
`;

export const RegisterCard = styled(LoginCard)`
    margin: 3rem 0;

    @media ${mobile} {
        margin: 0;
    }
`;

export const RegisterHeading = styled(Typography)`
    @media ${mobile} {
        &.MuiTypography-root {
            margin-top: 15rem;
            margin-bottom: 3rem;
        }
    }
`;

export const RegisterButton = styled(Button)`
    &.MuiButtonBase-root {
        margin-top: 3rem;
        width: 28rem;
        height: 3.5rem;

        &.MuiButtonBase-root {
            @media ${mobile} {
                margin-bottom: 2rem;
            }
        }
    }
`;

export const RegisterFieldStyle = styled(TextField)`
    width: 28rem;
`;

export const TermsButtonText = styled(Button)`
  background: red;
  .MuiButton-label {
    font-size: 1.7rem;
    margin-top: -.2rem;
  }
`;