import styled from 'styled-components/macro';
import {TextField} from '../../../ui/index';
import {Grid} from '@material-ui/core';
import {mobile} from '../../../utils/screen-sizes';
import { Card } from "../../../ui/index";
import TrashIcon from '../../../assets/icons/trash_icon.svg';
interface RightGridProps {
    $workingHoursLength: number;
}
export const RightGrid = styled(Grid)<RightGridProps>`
    margin: 0 auto;
    padding: 0rem 5rem 0rem;
    max-width: ${props => props.$workingHoursLength > 0 ? '28rem': 'auto'};

    @media ${mobile} {
        padding: 0;
    }
`;

export const LeftGrid = styled(Grid)`
    padding: 0rem 5rem 0rem;
    border-right: 1px solid #D7D7D7;

    @media ${mobile} {
        border-right: 0;
    }
`;

export const TimePicker = styled(TextField)`
    & .MuiInputBase-root.MuiInput-root {
        min-width: auto;
    }
`;

export const WorkingHourCard = styled(Card)`
    width: 24rem;
    height: 8.5rem;
    position: relative;

    &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: -3.5rem;
        background: red;
        width: 2rem;
        height: 2rem;
        background: url(${TrashIcon});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        transform: translateY(-50%);
        cursor: pointer;
    }
`;