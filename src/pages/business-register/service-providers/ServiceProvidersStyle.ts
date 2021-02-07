import styled from 'styled-components/macro';
import {makeStyles, Grid} from '@material-ui/core';
import { Button, Card, Checkbox} from "../../../ui/index";

export const useDialogStyles = makeStyles({
    paper: {
        width: '28rem',
        height: '32rem',
        padding: '2rem'
    }
});

export const DialogContinueButton = styled(Button)`
    width: 20rem;
    height: 3.5rem;   
`;

export const DialogContentText = styled.p`
    font-size: 1.6rem;
    text-align: center;
`;

export const ContinueButton = styled(Button)`
    width: 28rem;
    height: 3.5rem;
`;

export const ServiceCheckboxStyle = styled(Checkbox)`
    border: 1px solid black;
    border-radius: 2rem;
    padding-left: 1rem;
    min-height: 4rem;
    margin-right: .1rem;
    margin-bottom: 1rem;
    margin-left: 1rem;
    background: ${props => props.value && props.theme.palette.primary.light};

    .MuiTypography-body1 {
        font-size: 1.6rem;
    }
`;

export const Heading = styled.span`
    font-size: 2rem;
`;

export const Divider = styled.div`
    border-bottom: 2px solid #E2E2E2;
    height: 1px;
    width: 28rem;
    margin: 0 0 2rem;
`;

export const ServiceProvidersContainer = styled(Grid)`
    overflow-y: auto;
    max-height: 24rem;
    padding-left: 2rem;
    padding-right: .5rem;
`;

export const ServiceProviderCard = styled(Card)`
    position: relative;
    width: 28rem;
    min-height: 8.6rem;
    margin: 1rem 0;
    padding: 1.5rem;
`;

export const ConfirmationDialogHeading = styled.h1`
    font-size: 2.5rem;
    margin: 0 auto 2rem;
    max-width: 37rem;
    text-align: center;
`;

export const ConfirmationDialogSecondaryHeading = styled(ConfirmationDialogHeading)`
    font-size: 2rem;
    max-width: 42rem;
    font-weight: normal;
`;

export const ConfirmationActionButton = styled(Button)`
    width: 24rem;
    height: 3.5rem;
`;

export const useConfirmationDialogStyles = makeStyles({
    paper: {
        padding: '3rem'
    }
});

export const SummaryProviderCard = styled(Card)`
    &,
    &.MuiAccordion-root.Mui-expanded {
        width: 100%;
        margin: 1rem auto;
    }

    & .MuiAccordionSummary-root {
        background: #9090900d;
    }
`;

export const ButtonStyle = styled(Button)`
    height: 3.5rem;
    width: 26rem;
    margin: 1rem;
`;

export const ServicesList = styled.ul`
  list-style-position: inside;
`;