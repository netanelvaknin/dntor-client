import { makeStyles } from '@material-ui/core/styles';

export const useButtonStyles = makeStyles((theme) => ({
    root: {
      minWidth: '10rem',
      lineHeight: 0                                 
    },
    outlined: {
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.08)',
      background: '#FFF',
      borderRadius: '2.8rem'
    },
    text: {
        padding: '0',
        '& .MuiButton-label': {
            textDecoration: 'underline'
        },
        '&.MuiButton-root:hover': {
          background: 'none'
        }
    },
    contained: {
      '&, &.MuiButton-contained:hover': {
        background: theme.palette.primary.main,
        boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.08)'
      },
      borderRadius: '3.1rem',
      '& .MuiButton-label': {
        color: '#fff'
      }
    },
    disabled: {
      '& .MuiButton-label': {
        color: '#b1b1b1'
      }
    }
  }));