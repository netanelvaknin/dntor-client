import styled from 'styled-components/macro';
import {mobile} from '../../../utils/screen-sizes';

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