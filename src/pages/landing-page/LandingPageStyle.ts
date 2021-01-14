import styled from 'styled-components/macro';
import { Typography } from "@material-ui/core";

export const LandingPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-weight: bold;
    background: ${props => props.theme.palette.primary.light};

    span {
        color: ${props => props.theme.palette.primary.main};
    }
`;

export const ComingSoonHeading = styled(Typography)`
    letter-spacing: 1.8rem;
    font-size: 6rem;
    font-weight: bold;
`;