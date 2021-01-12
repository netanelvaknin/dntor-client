import styled from 'styled-components/macro';
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';


export const MenuStyle = styled(Menu)`
    & .MuiPaper-root {
        opacity: 0.8!important;
        width: 32rem;
        padding: 1rem;
    }
`;

export const MenuItemStyle = styled(MenuItem)`
    font-size: 1.8rem;
    border-bottom: 1px solid #D7D7D7;
    margin-bottom: 1rem;
    width: 28rem;
`;