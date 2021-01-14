import styled from 'styled-components/macro';
import mobileBackground from '../../assets/backgrounds/mobile_appointments_log_background.svg';
import {mobile} from '../../utils/screen-sizes';

export const AdminPanelContainer = styled.div`
    background: #E4EFFF;
    position: relative;

    @media ${mobile} {
        background-image: url(${mobileBackground});
        background-position: top;
        background-size: contain;
    }
`;