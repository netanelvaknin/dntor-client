import {makeStyles} from '@material-ui/styles';

export const useCheckboxStyles = makeStyles((theme) => ({
    disabled: {
        '& svg': {
            fill: '#e2e2e2'
        }
    }
}))