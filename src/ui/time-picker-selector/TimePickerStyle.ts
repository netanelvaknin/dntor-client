import {makeStyles} from '@material-ui/core/styles';
import styled from 'styled-components/macro';

export const useTimePickerStyles = makeStyles((theme) => ({
    input: {
        width: '100px',
        height: '30px',
        borderRadius: '28px',
        background: 'white',
        paddingRight: '0',
        boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.08)',
        '& .MuiInputBase-input': {
            textAlign: 'center'
        },
        '& .MuiInputAdornment-root': {
            '& .MuiButtonBase-root': {
                display: 'none'
            }
        }
    },
    MuiInputAdornment: {
        root: {
            '& .MuiButtonBase-root': {
                display: 'none'
            }
        }
    },
}));

export const TimePickerStyle = styled.div`
  min-width: 10rem;
  max-width: 10rem;
  .time_picker_container {
    max-width: 10rem;
    height: 3rem;
    /* margin: 0 auto; */
    direction: ltr;

    .preview_container {
      padding-left: 0;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .react_times_button {
      border-radius: 20px;
      height: 3rem;
    }

    .modal_container {
      max-height: 18rem;
    }
  }

  .classic_theme_container .classic_time.light.active, .classic_theme_container .classic_time.light:hover {
    background: ${props => props.theme.palette.primary.main};
  }

  svg {
    display: none;
  }
`;