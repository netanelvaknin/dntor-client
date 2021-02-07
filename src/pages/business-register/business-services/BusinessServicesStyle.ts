import {Typography} from '@material-ui/core';
import styled from 'styled-components/macro';
import {mobile} from '../../../utils/screen-sizes';
import {Grid} from '@material-ui/core';
import {Card, Button} from '../../../ui/index';

export const BusinessServicesHeading = styled(Typography)`
    &.MuiTypography-root {
        margin: 5rem 0 4rem;

        @media ${mobile} {
            margin: 3rem 0 2rem;
        }
    }
`;

interface RightGridProps {
    $servicesLength: number;
}
export const RightGrid = styled(Grid)<RightGridProps>`
    margin: 0 auto;
    padding: 0rem 3rem 0rem;
    max-width: ${props => props.$servicesLength > 0 ? '32rem': 'auto'};
    min-height: 30rem;

    @media ${mobile} {
        padding: 0;
    }
`;

export const LeftGrid = styled(Grid)`
    padding: 0rem 3rem 0rem;
    border-right: 1px solid #D7D7D7;

    @media ${mobile} {
        border-right: 0;
        /* padding: 0rem 1rem 0rem; */
    }
`;

export const DurationText = styled.span`
    font-size: 1.8rem;
    margin-left: 6rem;
    margin-bottom: 1rem;
`;

export const ServiceCard = styled(Card)`
    width: 22rem;
    min-height: 8.5rem;
    position: relative;
    margin-bottom: 2rem;
    margin-left: .5rem;
    padding: 1rem;

    @media ${mobile} {
        width: 75%;
        max-width: 32rem;
    }
`;

export const ServiceText = styled.span`
    font-size: 1.6rem;
    display: block;
`;


export const MobileAddButton = styled(Button)`
    padding: 1.5rem;
    width: 28rem;
    height: 3.5rem;
`;