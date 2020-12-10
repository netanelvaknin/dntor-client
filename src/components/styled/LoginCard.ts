import styled from 'styled-components/macro';
import {Card} from '../../ui/card/Card';
import {mobile} from '../../utils/screen-sizes';

export const LoginCard = styled(Card)`
    max-width: 38.2rem;
    width: 38rem;
    padding: 3.8rem 5rem;
    position: relative;

    @media ${mobile} {
        max-width: 100%;
        width: 100vh;
        height: 100vh;
        padding: 0;
        box-shadow: none;
    }
`;