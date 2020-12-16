import {Typography} from '@material-ui/core';
import {mobile} from '../../../utils/screen-sizes';
import styled from 'styled-components/macro';

export const NotificationsManagmentHeading = styled(Typography)`
    &.MuiTypography-root {
        margin: 5rem 0 4rem;

        @media ${mobile} {
            margin: 3rem 0 4rem;
        }
    }
`;

export const SwitchSpan = styled.span`
    font-size: 1.8rem;
`;

export const HorizontalSeprator = styled.div`
    border-bottom: 1px solid #E2E2E2;
    margin-bottom: 2rem;
    height: 1px;
    width: 100%;
`;