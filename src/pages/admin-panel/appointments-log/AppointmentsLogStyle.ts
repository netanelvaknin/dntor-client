import {makeStyles} from '@material-ui/core/styles';
import styled from 'styled-components/macro';
import {mobile} from "../../../utils/screen-sizes";
import {Card, Button} from '../../../ui';
import {IconButton} from '@material-ui/core';

interface ViewModeProps {
    viewMode: 'table' | 'column';
}

export const AppointmentCard = styled(Card)<ViewModeProps>`
  margin-bottom: 2rem;
  max-width: ${props => props.viewMode === 'column' && '100%'};
`;

export const EmptyCard = styled(Card)<ViewModeProps>`
  background: #E2E2E2;
  min-height: 52rem;
  height: 100%;
  font-weight: bold;
  text-align: center;
  padding: 2rem;
  max-width: ${props => props.viewMode === 'column' && '100%'};
`;

export const AppointmentsLogContainer = styled.div`
  position: relative;
`;

export const SubMenuStyle = styled.div`
  margin-top: 8.5rem;
  background: ${props => props.theme.palette.primary.light};
  height: 8rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 10rem;

  @media ${mobile} {
    padding: 1rem 1rem;
  }
`;

interface ProviderButtonProps {
    isActiveProvider: boolean;
}
export const ProviderButton = styled(Button)<ProviderButtonProps>`
    min-width: 12.1rem;
    height: 3rem;
    margin: 0 1rem;
  
    @media ${mobile} {
      min-width: 9rem;
    }
    
    .MuiButton-label {
      color: ${props => props.isActiveProvider ? 'white' : 'black'};
      text-decoration: none;
    }
`;

export const useDatepickerStyles = makeStyles({
    staticWrapperRoot: {
        maxWidth: '32rem',
        margin: '5rem auto 5rem',
        background: 'transparent',
        '& .MuiToolbar-root': {
            display: 'none'
        },
        '& .MuiPickersCalendar-week': {
            '& .MuiPickersDay-current': {
                fontWeight: 'bold',
            },
        },
        '& .MuiPickersCalendarHeader-switchHeader': {
            '& .MuiButtonBase-root': {
                background: 'transparent'
            }
        },
        '& .MuiPickersSlideTransition-transitionContainer': {
            '& > .MuiTypography-root': {
                fontWeight: 'bold'
            }
        },
        '& .MuiPickersCalendarHeader-daysHeader span': {
            fontWeight: 'bold',
            color: '#000',
            fontSize: '1.6rem'
        },
        '& .MuiPickersToolbar-toolbar': {
            background: 'transparent',
            '& .MuiPickersToolbarText-toolbarTxt': {
                color: '#000'
            }
        }

    }
}, {name: 'MuiPickersStaticWrapper'});

export const LogWrapper = styled.div`
  background: white;
  min-height: 52rem;
  border-radius: 9rem 9rem 0px 0px;
  padding-bottom: 3rem;
`;

export const DaysContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 7rem 5%;
  max-width: 189rem;

  @media (max-width: 1500px) {
    padding: 3rem 4rem;
  }
`;

export const DayColumn = styled.div<ViewModeProps>`
  transition: all 5s;
  width: ${props => props.viewMode === 'column' ? '100%' : '19rem'};

  @media (max-width: 1500px) {
    width: ${props => props.viewMode === 'column' ? '100%' : '17rem'};
  }

  @media (max-width: 1285px) {
    width: ${props => props.viewMode === 'column' ? '100%' : '15rem'};
  }
`;

export const HourText = styled.span`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const PhoneNumber = styled.a`
  &,
  &:hover,
  &:visited,
  &:active {
    color: black;
    text-decoration: none;
  }
`;

export const ActionButton = styled(IconButton)`
  width: 3.5rem;
  height: 3.5rem;
`;

export const ViewButton = styled(IconButton)`
  width: 55px;
  height: 55px;
  margin: 1rem;
  &,&:hover {
    background: white;
  }
`;

export const TableModesContainer = styled.div`
  position: absolute;
  left: 5rem;
  top: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ViewOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;