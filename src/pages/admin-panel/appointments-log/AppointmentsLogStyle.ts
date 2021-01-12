import {makeStyles} from '@material-ui/core/styles';

export const useDatepickerStyles = makeStyles({
    staticWrapperRoot: {
        maxWidth: '32rem',
        margin: '2rem auto 0',
        '& .MuiToolbar-root': {
            display: 'none'
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
