import styled from 'styled-components/macro';
import RegisterBackground from '../../assets/backgrounds/login_background.svg';
import {Typography} from '@material-ui/core';
import {mobile} from '../../utils/screen-sizes';
import { Button, TextField } from "../../ui/index";

export const RegisterPageStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${RegisterBackground});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
`;

export const RegisterHeading = styled(Typography)`
    @media ${mobile} {
        &.MuiTypography-root {
            margin-top: 15rem;
        }
    }
`;

export const RegisterButton = styled(Button)`
    &.MuiButtonBase-root {
        margin-top: 5rem;
        width: 28rem;
        height: 3rem;
        @media ${mobile} {
        
        }
    }
`;

export const RegisterFieldStyle = styled(TextField)`
    width: 28rem;
`;