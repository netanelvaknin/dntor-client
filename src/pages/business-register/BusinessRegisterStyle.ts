import styled from 'styled-components/macro';
import {Card} from '../../ui/card/Card';
import {mobile, tablet} from '../../utils/screen-sizes';
import cardLabelBackground from '../../assets/backgrounds/card-label-background.svg';
import {IconButton} from '@material-ui/core';

export const BusinessRegisterPageStyle = styled.div`
    min-height: 100vh;
    padding: 8.6rem 0 5rem;
    background: #F5F9FF;

    &:after {
        content: '';
        width: 50%;
        min-height: 100vh;
        background: #E4EFFF;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 0;

        @media ${mobile} {
            display: none;
        }
    }
`;


export const BusinessRegisterCard = styled(Card)`
    margin: 10rem auto;
    position: relative;
    z-index: 1;
    width: 75rem;
    min-height: 52rem;

    @media ${tablet} {
        width: 90vw;
    }

    @media ${mobile} {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        margin: 0;
    }
`;

export const CardLabel = styled.div`
    margin-top: 8.5rem;
    height: 5rem;
    background: url(${cardLabelBackground});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
`;

export const ArrowRightButton = styled(IconButton)`
    &.MuiButtonBase-root {
        position: absolute;
        top: 3rem;
        right: 4rem;

        @media ${mobile} {
            top: 9rem;
        }
    }
`;