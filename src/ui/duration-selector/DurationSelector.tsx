import {hours, minutes} from './duration-data';
import {IconButton} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {TimeItem} from './DurationSelectorStyle';

interface ValueProps {
    hours: string,
    minutes: string
}

interface DurationSelectorProps {
    value: ValueProps;
    className?: string;
    onChange: (h: string, m: string) => void;
}

export const DurationSelector = ({
                                     value,
                                     className,
                                     onChange
                                 }: DurationSelectorProps) => {
    return (
        <div className={className} style={{display: 'flex', alignItems: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <IconButton
                        type="button"
                        onClick={() => {
                            const index = minutes.findIndex(
                                (minute) => value.minutes === minute
                            );

                            if (onChange && minutes[index + 1] !== minutes[minutes.length]) {
                                onChange(value.hours, minutes[index + 1]);
                            }
                        }}
                    >
                        <AddIcon/>
                    </IconButton>
                    <IconButton
                        type="button"
                        onClick={() => {
                            const index = minutes.findIndex(
                                (minute) => value.minutes === minute
                            );

                            if (onChange && minutes[index - 1] !== minutes[0 - 1]) {
                                onChange(value.hours, minutes[index - 1]);
                            }
                        }}
                    >
                        <RemoveIcon/>
                    </IconButton>
                </div>
                <TimeItem>
                    <p style={{fontSize: '1.3rem'}}>דקות</p>
                    <p style={{fontSize: '2rem'}}>{value.minutes}</p>
                </TimeItem>
            </div>

            <strong>:</strong>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <TimeItem>
                    <p style={{fontSize: '1.3rem'}}>שעות</p>
                    <p style={{fontSize: '2rem'}}>{value.hours}</p>
                </TimeItem>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <IconButton
                        type="button"
                        onClick={() => {
                            const index = hours.findIndex((hour) => value.hours === hour);

                            if (onChange && hours[index + 1] !== hours[hours.length]) {
                                onChange(hours[index + 1], value.minutes);
                            }
                        }}
                    >
                        <AddIcon/>
                    </IconButton>
                    <IconButton
                        type="button"
                        onClick={() => {
                            const index = hours.findIndex((hour) => value.hours === hour);

                            if (onChange && hours[index - 1] !== hours[0 - 1]) {
                                onChange(hours[index - 1], value.minutes);
                            }
                        }}
                    >
                        <RemoveIcon/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default DurationSelector;
