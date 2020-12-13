import styled from 'styled-components/macro';
import {TextField} from '../../../ui/index';

export const TimePicker = styled(TextField)`
    & .MuiInputBase-root.MuiInput-root {
        min-width: auto;
    }
`;