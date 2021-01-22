import styled from 'styled-components/macro';
import {makeStyles, Grid} from '@material-ui/core';
import { Button, Card } from "../../../ui/index";

export const useDialogStyles = makeStyles({
    paper: {
        width: '28rem',
        height: '31rem',
        padding: '2rem'
    }
});

export const DialogContinueButton = styled(Button)`
    width: 20rem;
    height: 5rem;   
`;

export const DialogContentText = styled.p`
    font-size: 1.6rem;
    text-align: center;
`;

export const ContinueButton = styled(Button)`
    width: 28rem;
    height: 3rem;
`;

export const Heading = styled.span`
    font-size: 2rem;
`;

export const Divider = styled.div`
    border-bottom: 2px solid #E2E2E2;
    height: 1px;
    width: 28rem;
    margin: 3rem 0 2rem;
`;

export const ServiceProvidersContainer = styled(Grid)`
    overflow-y: auto;
    max-height: 24rem;
    padding-left: 2rem;
    padding-right: 1rem;
`;

export const ServiceProviderCard = styled(Card)`
    width: 28rem;
    height: 8.6rem;
    margin: 1rem 0;
`;