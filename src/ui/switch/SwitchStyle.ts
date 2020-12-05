import {makeStyles} from '@material-ui/core/styles';

export const useSwitchStyles = makeStyles((theme) => ({
    root: {
        width: 42,
        height: 21,
        padding: 0,
        margin: theme.spacing(1),
        overflow: 'inherit',
      },
      switchBase: {
        padding: 1,
        '&$checked': {
          transform: 'translate(20px, -1px)',
          color: '#FFF',
          '& + $track': {
            backgroundColor: theme.palette.primary.main,
            opacity: 1,
            border: 'none',
          },
        },
        '&$focusVisible $thumb': {
          color: '#52d869',
          border: '6px solid #fff',
        },
      },
      thumb: {
        width: 21,
        height: 21,
      },
      track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
      },
      checked: {},
      focusVisible: {},
}))