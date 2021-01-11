import styled from 'styled-components/macro';
import { Button } from "../index";
import {IconButton} from '@material-ui/core';
import {mobile} from '../../utils/screen-sizes';

export const NavbarStyle = styled.nav`
    height: 8.5rem;
    width: 100%;
    background: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
    padding: 0 4rem;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 12;
`;

export const ConnectAndRegisterButton = styled(Button)`
    height: 4rem;
    margin-right: 3rem;
`;

export const TemporaryLogo = styled.div`
    border: 1px solid black;
    padding: 1rem;
    border-radius: 25px;
    cursor: pointer;
`;

export const IconButtonStyle = styled(IconButton)`
    width: 7rem;

    @media ${mobile} {
        width: 5rem;
    }
`;

export const AdminActionsContainer = styled.div`
    min-width: 40%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    span {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        cursor: pointer;
    }
`;