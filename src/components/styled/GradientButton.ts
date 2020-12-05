import styled from 'styled-components/macro';
import {Button} from '../../ui';


export const GradientButton = styled(Button)`
    background: linear-gradient(81.38deg, #1EE3CF 8.68%, #2645B1 60.76%)!important;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.08);
    border: 0!important;
    width: 24rem;
    height: 5rem;
    
    .MuiButton-label {
        color: white;
        font-weight: bold;
    }
`;