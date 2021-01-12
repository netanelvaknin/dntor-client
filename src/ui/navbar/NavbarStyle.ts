import styled from 'styled-components/macro';
import { Button } from "../index";
import {IconButton} from '@material-ui/core';
import {mobile} from '../../utils/screen-sizes';

interface NavbarStyleProps {
    isAdminPanel: boolean;
}

export const NavbarStyle = styled.nav<NavbarStyleProps>`
    height: 8.5rem;
    width: 100%;
    background: #fff;
    box-shadow: ${props => !props.isAdminPanel && '0px 4px 4px rgba(0, 0, 0, 0.03)'};
    padding: 0 4rem;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 12;

    @media ${mobile} {
        padding: 0 1rem;
    }
`;

export const ConnectAndRegisterButton = styled(Button)`
    height: 4rem;
    min-width: 12rem;

    @media ${mobile} {
        min-width: 10rem;
    }
`;

export const IconButtonStyle = styled(IconButton)`
    width: 7rem;

    @media ${mobile} {
        width: 5rem;
    }
`;

export const AdminActionsContainer = styled.div`
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

interface AdminPanelActionButtonProps {
    activeNavItem: boolean;
}

export const AdminPanelActionButton = styled(Button)<AdminPanelActionButtonProps>`
    padding: 0 2rem;
    border-radius: 0;

    &,
    &:hover {
        background: ${props => props.activeNavItem && props.theme.palette.primary.light}!important;
    }

    & .MuiButton-label {
        text-decoration: none;
        color: black;
    }
`;