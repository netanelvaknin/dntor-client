import styled from 'styled-components/macro';
import {mobile} from '../../../utils/screen-sizes';
import {makeStyles, Grid} from '@material-ui/core';
import {Button} from '../../../ui';

export const NewAppointmentsContainer = styled.div`
  background: white;
  padding-top: 8rem;
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media ${mobile} {
    display: block;
  }
`;

export const FieldsGridContainer = styled(Grid)`
  max-width: 40rem;
  padding: 3rem;
  margin: 3rem 5rem 5rem;
  
  @media ${mobile} {
    max-width: 32rem;
    padding: 1rem 2rem;
    margin: 3rem auto;
  }
`;

export const useDatePickerStyles = makeStyles({
    root: {
        width: '28rem',
        margin: '0.5rem 0'
    }
});

export const useSelectStyles = makeStyles({
    root: {
        width: '28rem',
        margin: '0.5rem 0'
    },
    select: {
        maxHeight: '17rem'
    }
});

export const SubmitNewAppointmentButton = styled(Button)`
  width: 28rem;
  height: 3.5rem;
  margin-top: 2rem;
`;