import styled from 'styled-components/macro';
import {Card} from '../../ui/card/Card';

export const BusinessRegisterPageStyle = styled.div`
    min-height: 100vh;
    padding: 8.6rem 0 5rem;
    background: #F5F9FF;
    &:after {
        content: '';
        width: 35%;
        min-height: 100vh;
        background: #E4EFFF;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 0;
    }
`;


export const BusinessRegisterCard = styled(Card)`
    margin: 10rem auto;
    position: relative;
    z-index: 1;
    width: 75rem;
    min-height: 52rem;
`;