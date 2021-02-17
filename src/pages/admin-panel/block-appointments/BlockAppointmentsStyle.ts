import styled from 'styled-components/macro';
import {Button, TextField, Card} from '../../../ui';
import {mobile} from '../../../utils/screen-sizes';
import {makeStyles, Fab} from '@material-ui/core';

export const ScreenWrapper = styled.div`
  max-width: 80%;
  margin: 0 auto;

  @media ${mobile} {
    max-width: 90%;
  }
`;

export const BlockAppointmentsContainer = styled.div`
  background: white;
  padding-top: 8rem;
`;

export const BlockButton = styled(Button)`
  width: 20rem;
  height: 5rem;
`;

export const CauseField = styled(TextField)`
  width: 100%;
`;

export const BlockedAppointmentsCard = styled(Card)`
  max-width: 50%;
  margin-top: 2rem;

  @media ${mobile} {
    max-width: 100%;
  }
`;

export const useDatepickerStyles = makeStyles({
    input: {
        width: '26rem',
        '@media (max-width: 767px)': {
            width: '18rem'
        }
    },
    paper: {
        '& .MuiPickersSlideTransition-transitionContainer, & .MuiPickersCalendarHeader-switchHeader': {
            '@media (max-width: 767px)': {
                maxWidth: '29rem'
            }
        }
    }
});

export const FabStyle = styled(Fab)`
  &,
  &:hover,
  &:active {
    position: fixed;
    bottom: 7rem;
    left: 9rem;
    background: #fff;

    @media ${mobile} {
      left: 50%;
      bottom: 4rem;
      transform: translateX(-50%);
    }
  }
`;