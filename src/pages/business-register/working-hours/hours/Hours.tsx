import React from 'react';
import {Grid, IconButton} from '@material-ui/core';
import {TimePickerSelector} from '../../../../ui';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {useSmallScreen} from "../../../../hooks/useSmallScreen";

interface HoursProps {
    hours: any;
    setHours: any;
}

const Hours = ({
                   hours,
                   setHours,
               }: HoursProps) => {
    const {
        sunday,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday
    } = hours;
    const isSmallScreen = useSmallScreen();

    return (
        <Grid md={6}
              sm={6}
              container
              item
              direction="column"
              justify="flex-start"
              alignItems="center"
              style={{margin: "0 auto"}}>
            {hours.sunday && (
                <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    style={{
                        margin: '1rem 0',
                        border: '1px solid gray',
                        borderRadius: '22px',
                        padding: '2rem',
                        maxWidth: isSmallScreen ? '96%' : 'auto'
                    }}>
                    <Grid item container>
                        <Grid xs={1} item container justify="center" alignItems="center">
                            <strong>א'</strong>
                        </Grid>

                        <Grid xs={5} item container direction="column" alignItems="center">
                            <div style={{marginBottom: '.7rem'}}>התחלה</div>
                            <TimePickerSelector
                                time={sunday.from}
                                onTimeChange={(h: any) =>
                                    setHours({
                                        ...hours,
                                        sunday: {
                                            ...sunday,
                                            from: `${h.hour}:${h.minute}`
                                        }
                                    })
                                }
                            />
                        </Grid>

                        <Grid xs={5} item container direction="column" alignItems="center">
                            <div style={{marginBottom: '.7rem'}}>סיום</div>
                            <TimePickerSelector
                                time={sunday.to}
                                onTimeChange={(h: any) =>
                                    setHours({
                                        ...hours,
                                        sunday: {
                                            ...sunday,
                                            to: `${h.hour}:${h.minute}`
                                        }
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>

                    <Grid container>
                        {sunday.breaks.map((b: any, i: number) => {
                            return (
                                <Grid container item style={{marginTop: '2rem'}} key={i}>
                                    <Grid xs={1} item container justify="center" alignItems="center">
                                        <strong>{i + 1}</strong>
                                    </Grid>

                                    <Grid xs={5} item container direction="column" alignItems="center">
                                        <div style={{marginBottom: '.7rem'}}>התחלה</div>
                                        <TimePickerSelector
                                            time={sunday.breaks[i].from}
                                            onTimeChange={(h: any) => {
                                                const copy = {...hours};
                                                copy.sunday.breaks[i] = {
                                                    from: `${h.hour}:${h.minute}`,
                                                    to: sunday.breaks[i].to
                                                };
                                                setHours(copy);
                                            }}
                                        />
                                    </Grid>

                                    <Grid xs={5} item container direction="column" alignItems="center">
                                        <div style={{marginBottom: '.7rem'}}>סיום</div>
                                        <TimePickerSelector
                                            time={sunday.breaks[i].to}
                                            onTimeChange={(h: any) => {
                                                const copy = {...hours};
                                                copy.sunday.breaks[i] = {
                                                    to: `${h.hour}:${h.minute}`,
                                                    from: sunday.breaks[i].from
                                                };
                                                setHours(copy);
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={1} container direction="column" alignItems="center" justify="center">
                                        <IconButton onClick={() => {
                                            const copy = {...hours};
                                            copy.sunday.breaks.splice(i, 1);
                                            setHours(copy);
                                        }}>
                                            <DeleteOutlineIcon/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>

                    {sunday.breaks.length < 2 && (
                        <Grid item container justify="center" alignItems="center" style={{marginTop: '1rem'}}>
                            <Grid item>
                                <IconButton onClick={() => {
                                    if (sunday.breaks.length <= 3) {
                                        setHours({
                                            ...hours,
                                            sunday: {
                                                ...sunday,
                                                breaks: [...sunday.breaks, {from: '12:00', to: '13:00'}]
                                            }
                                        })
                                    }
                                }}>
                                    <AddCircleOutlineIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                            <span style={{cursor: 'pointer'}} onClick={() => {
                                if (sunday.breaks.length <= 3) {
                                    setHours({
                                        ...hours,
                                        sunday: {
                                            ...sunday,
                                            breaks: [...sunday.breaks, {from: '12:00', to: '13:00'}]
                                        }
                                    })
                                }
                            }}>הוספת הפסקה</span>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            )}


            {hours.monday && (
                <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    style={{
                        margin: '1rem 0',
                        border: '1px solid gray',
                        borderRadius: '22px',
                        padding: '2rem',
                        maxWidth: isSmallScreen ? '96%' : 'auto'
                    }}>
                    <Grid item container>
                        <Grid xs={1} item container justify="center" alignItems="center">
                            <strong> ב'</strong>
                        </Grid>

                        <Grid xs={5} item container direction="column" alignItems="center">
                            <div style={{marginBottom: '.7rem'}}>התחלה</div>
                            <TimePickerSelector
                                time={monday.from}
                                onTimeChange={(h: any) =>
                                    setHours({
                                        ...hours,
                                        monday: {
                                            ...monday,
                                            from: `${h.hour}:${h.minute}`
                                        }
                                    })
                                }
                            />
                        </Grid>

                        <Grid xs={5} item container direction="column" alignItems="center">
                            <div style={{marginBottom: '.7rem'}}>סיום</div>
                            <TimePickerSelector
                                time={monday.to}
                                onTimeChange={(h: any) =>
                                    setHours({
                                        ...hours,
                                        monday: {
                                            ...monday,
                                            to: `${h.hour}:${h.minute}`
                                        }
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>

                    <Grid container>
                        {monday.breaks.map((b: any, i: number) => {
                            return (
                                <Grid container item style={{marginTop: '2rem'}} key={i}>
                                    <Grid xs={1} item container justify="center" alignItems="center">
                                        <strong>{i + 1}</strong>
                                    </Grid>

                                    <Grid xs={5} item container direction="column" alignItems="center">
                                        <div style={{marginBottom: '.7rem'}}>התחלה</div>
                                        <TimePickerSelector
                                            time={monday.breaks[i].from}
                                            onTimeChange={(h: any) => {
                                                const copy = {...hours};
                                                copy.monday.breaks[i] = {
                                                    from: `${h.hour}:${h.minute}`,
                                                    to: monday.breaks[i].to
                                                };
                                                setHours(copy);
                                            }}
                                        />
                                    </Grid>

                                    <Grid xs={5} item container direction="column" alignItems="center">
                                        <div style={{marginBottom: '.7rem'}}>סיום</div>
                                        <TimePickerSelector
                                            time={monday.breaks[i].to}
                                            onTimeChange={(h: any) => {
                                                const copy = {...hours};
                                                copy.monday.breaks[i] = {
                                                    to: `${h.hour}:${h.minute}`,
                                                    from: monday.breaks[i].from
                                                };
                                                setHours(copy);
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={1} container direction="column" alignItems="center" justify="center">
                                        <IconButton onClick={() => {
                                            const copy = {...hours};
                                            copy.monday.breaks.splice(i, 1);
                                            setHours(copy);
                                        }}>
                                            <DeleteOutlineIcon/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>

                    {monday.breaks.length < 2 && (
                        <Grid item container justify="center" alignItems="center" style={{marginTop: '1rem'}}>
                            <Grid item>
                                <IconButton onClick={() => {
                                    if (monday.breaks.length <= 3) {
                                        setHours({
                                            ...hours,
                                            monday: {
                                                ...monday,
                                                breaks: [...monday.breaks, {from: '12:00', to: '13:00'}]
                                            }
                                        })
                                    }
                                }}>
                                    <AddCircleOutlineIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                            <span style={{cursor: 'pointer'}} onClick={() => {
                                if (monday.breaks.length <= 3) {
                                    setHours({
                                        ...hours,
                                        monday: {
                                            ...monday,
                                            breaks: [...monday.breaks, {from: '12:00', to: '13:00'}]
                                        }
                                    })
                                }
                            }}>הוספת הפסקה</span>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            )}

            {hours.tuesday && (
                <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    style={{
                        margin: '1rem 0',
                        border: '1px solid gray',
                        borderRadius: '22px',
                        padding: '2rem',
                        maxWidth: isSmallScreen ? '96%' : 'auto'
                    }}>
                    <Grid item container>
                        <Grid xs={1} item container justify="center" alignItems="center">
                            <strong> ג'</strong>
                        </Grid>

                        <Grid xs={5} item container direction="column" alignItems="center">
                            <div style={{marginBottom: '.7rem'}}>התחלה</div>
                            <TimePickerSelector
                                time={tuesday.from}
                                onTimeChange={(h: any) =>
                                    setHours({
                                        ...hours,
                                        tuesday: {
                                            ...tuesday,
                                            from: `${h.hour}:${h.minute}`
                                        }
                                    })
                                }
                            />
                        </Grid>

                        <Grid xs={5} item container direction="column" alignItems="center">
                            <div style={{marginBottom: '.7rem'}}>סיום</div>
                            <TimePickerSelector
                                time={tuesday.to}
                                onTimeChange={(h: any) =>
                                    setHours({
                                        ...hours,
                                        tuesday: {
                                            ...tuesday,
                                            to: `${h.hour}:${h.minute}`
                                        }
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>

                    <Grid container>
                        {tuesday.breaks.map((b: any, i: number) => {
                            return (
                                <Grid container item style={{marginTop: '2rem'}} key={i}>
                                    <Grid xs={1} item container justify="center" alignItems="center">
                                        <strong>{i + 1}</strong>
                                    </Grid>

                                    <Grid xs={5} item container direction="column" alignItems="center">
                                        <div style={{marginBottom: '.7rem'}}>התחלה</div>
                                        <TimePickerSelector
                                            time={tuesday.breaks[i].from}
                                            onTimeChange={(h: any) => {
                                                const copy = {...hours};
                                                copy.tuesday.breaks[i] = {
                                                    from: `${h.hour}:${h.minute}`,
                                                    to: tuesday.breaks[i].to
                                                };
                                                setHours(copy);
                                            }}
                                        />
                                    </Grid>

                                    <Grid xs={5} item container direction="column" alignItems="center">
                                        <div style={{marginBottom: '.7rem'}}>סיום</div>
                                        <TimePickerSelector
                                            time={tuesday.breaks[i].to}
                                            onTimeChange={(h: any) => {
                                                const copy = {...hours};
                                                copy.tuesday.breaks[i] = {
                                                    to: `${h.hour}:${h.minute}`,
                                                    from: tuesday.breaks[i].from
                                                };
                                                setHours(copy);
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={1} container direction="column" alignItems="center" justify="center">
                                        <IconButton onClick={() => {
                                            const copy = {...hours};
                                            copy.tuesday.breaks.splice(i, 1);
                                            setHours(copy);
                                        }}>
                                            <DeleteOutlineIcon/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>

                    {tuesday.breaks.length < 2 && (
                        <Grid item container justify="center" alignItems="center" style={{marginTop: '1rem'}}>
                            <Grid item>
                                <IconButton onClick={() => {
                                    if (tuesday.breaks.length <= 3) {
                                        setHours({
                                            ...hours,
                                            tuesday: {
                                                ...tuesday,
                                                breaks: [...tuesday.breaks, {from: '12:00', to: '13:00'}]
                                            }
                                        })
                                    }
                                }}>
                                    <AddCircleOutlineIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                            <span style={{cursor: 'pointer'}} onClick={() => {
                                if (tuesday.breaks.length <= 3) {
                                    setHours({
                                        ...hours,
                                        tuesday: {
                                            ...tuesday,
                                            breaks: [...tuesday.breaks, {from: '12:00', to: '13:00'}]
                                        }
                                    })
                                }
                            }}>הוספת הפסקה</span>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            )}

            {hours.wednesday && (
                <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    style={{
                        margin: '1rem 0',
                        border: '1px solid gray',
                        borderRadius: '22px',
                        padding: '2rem',
                        maxWidth: isSmallScreen ? '96%' : 'auto'
                    }}>
                    <Grid item container>
                        <Grid xs={1} item container justify="center" alignItems="center">
                            <strong> ד'</strong>
                        </Grid>

                        <Grid xs={5} item container direction="column" alignItems="center">
                            <div style={{marginBottom: '.7rem'}}>התחלה</div>
                            <TimePickerSelector
                                time={wednesday.from}
                                onTimeChange={(h: any) =>
                                    setHours({
                                        ...hours,
                                        wednesday: {
                                            ...wednesday,
                                            from: `${h.hour}:${h.minute}`
                                        }
                                    })
                                }
                            />
                        </Grid>

                        <Grid xs={5} item container direction="column" alignItems="center">
                            <div style={{marginBottom: '.7rem'}}>סיום</div>
                            <TimePickerSelector
                                time={wednesday.to}
                                onTimeChange={(h: any) =>
                                    setHours({
                                        ...hours,
                                        wednesday: {
                                            ...wednesday,
                                            to: `${h.hour}:${h.minute}`
                                        }
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>

                    <Grid container>
                        {wednesday.breaks.map((b: any, i: number) => {
                            return (
                                <Grid container item style={{marginTop: '2rem'}} key={i}>
                                    <Grid xs={1} item container justify="center" alignItems="center">
                                        <strong>{i + 1}</strong>
                                    </Grid>

                                    <Grid xs={5} item container direction="column" alignItems="center">
                                        <div style={{marginBottom: '.7rem'}}>התחלה</div>
                                        <TimePickerSelector
                                            time={wednesday.breaks[i].from}
                                            onTimeChange={(h: any) => {
                                                const copy = {...hours};
                                                copy.wednesday.breaks[i] = {
                                                    from: `${h.hour}:${h.minute}`,
                                                    to: wednesday.breaks[i].to
                                                };
                                                setHours(copy);
                                            }}
                                        />
                                    </Grid>

                                    <Grid xs={5} item container direction="column" alignItems="center">
                                        <div style={{marginBottom: '.7rem'}}>סיום</div>
                                        <TimePickerSelector
                                            time={wednesday.breaks[i].to}
                                            onTimeChange={(h: any) => {
                                                const copy = {...hours};
                                                copy.wednesday.breaks[i] = {
                                                    to: `${h.hour}:${h.minute}`,
                                                    from: wednesday.breaks[i].from
                                                };
                                                setHours(copy);
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={1} container direction="column" alignItems="center" justify="center">
                                        <IconButton onClick={() => {
                                            const copy = {...hours};
                                            copy.wednesday.breaks.splice(i, 1);
                                            setHours(copy);
                                        }}>
                                            <DeleteOutlineIcon/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>

                    {wednesday.breaks.length < 2 && (
                        <Grid item container justify="center" alignItems="center" style={{marginTop: '1rem'}}>
                            <Grid item>
                                <IconButton onClick={() => {
                                    if (wednesday.breaks.length <= 3) {
                                        setHours({
                                            ...hours,
                                            wednesday: {
                                                ...wednesday,
                                                breaks: [...wednesday.breaks, {from: '12:00', to: '13:00'}]
                                            }
                                        })
                                    }
                                }}>
                                    <AddCircleOutlineIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                            <span style={{cursor: 'pointer'}} onClick={() => {
                                if (wednesday.breaks.length <= 3) {
                                    setHours({
                                        ...hours,
                                        wednesday: {
                                            ...wednesday,
                                            breaks: [...wednesday.breaks, {from: '12:00', to: '13:00'}]
                                        }
                                    })
                                }
                            }}>הוספת הפסקה</span>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            )}


            {hours.thursday && (
                <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    style={{
                        margin: '1rem 0',
                        border: '1px solid gray',
                        borderRadius: '22px',
                        padding: '2rem',
                        maxWidth: isSmallScreen ? '96%' : 'auto'
                    }}>
                    <Grid item container>
                        <Grid xs={1} item container justify="center" alignItems="center">
                            <strong> ה'</strong>
                        </Grid>

                        <Grid xs={5} item container direction="column" alignItems="center">
                            <div style={{marginBottom: '.7rem'}}>התחלה</div>
                            <TimePickerSelector
                                time={thursday.from}
                                onTimeChange={(h: any) =>
                                    setHours({
                                        ...hours,
                                        thursday: {
                                            ...thursday,
                                            from: `${h.hour}:${h.minute}`
                                        }
                                    })
                                }
                            />
                        </Grid>

                        <Grid xs={5} item container direction="column" alignItems="center">
                            <div style={{marginBottom: '.7rem'}}>סיום</div>
                            <TimePickerSelector
                                time={thursday.to}
                                onTimeChange={(h: any) =>
                                    setHours({
                                        ...hours,
                                        thursday: {
                                            ...thursday,
                                            to: `${h.hour}:${h.minute}`
                                        }
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>

                    <Grid container>
                        {thursday.breaks.map((b: any, i: number) => {
                            return (
                                <Grid container item style={{marginTop: '2rem'}} key={i}>
                                    <Grid xs={1} item container justify="center" alignItems="center">
                                        <strong>{i + 1}</strong>
                                    </Grid>

                                    <Grid xs={5} item container direction="column" alignItems="center">
                                        <div style={{marginBottom: '.7rem'}}>התחלה</div>
                                        <TimePickerSelector
                                            time={thursday.breaks[i].from}
                                            onTimeChange={(h: any) => {
                                                const copy = {...hours};
                                                copy.thursday.breaks[i] = {
                                                    from: `${h.hour}:${h.minute}`,
                                                    to: thursday.breaks[i].to
                                                };
                                                setHours(copy);
                                            }}
                                        />
                                    </Grid>

                                    <Grid xs={5} item container direction="column" alignItems="center">
                                        <div style={{marginBottom: '.7rem'}}>סיום</div>
                                        <TimePickerSelector
                                            time={thursday.breaks[i].to}
                                            onTimeChange={(h: any) => {
                                                const copy = {...hours};
                                                copy.thursday.breaks[i] = {
                                                    to: `${h.hour}:${h.minute}`,
                                                    from: thursday.breaks[i].from
                                                };
                                                setHours(copy);
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={1} container direction="column" alignItems="center" justify="center">
                                        <IconButton onClick={() => {
                                            const copy = {...hours};
                                            copy.thursday.breaks.splice(i, 1);
                                            setHours(copy);
                                        }}>
                                            <DeleteOutlineIcon/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>

                    {thursday.breaks.length < 2 && (
                        <Grid item container justify="center" alignItems="center" style={{marginTop: '1rem'}}>
                            <Grid item>
                                <IconButton onClick={() => {
                                    if (thursday.breaks.length <= 3) {
                                        setHours({
                                            ...hours,
                                            thursday: {
                                                ...thursday,
                                                breaks: [...thursday.breaks, {from: '12:00', to: '13:00'}]
                                            }
                                        })
                                    }
                                }}>
                                    <AddCircleOutlineIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                            <span style={{cursor: 'pointer'}} onClick={() => {
                                if (thursday.breaks.length <= 3) {
                                    setHours({
                                        ...hours,
                                        thursday: {
                                            ...thursday,
                                            breaks: [...thursday.breaks, {from: '12:00', to: '13:00'}]
                                        }
                                    })
                                }
                            }}>הוספת הפסקה</span>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            )}


            {hours.friday && (
                <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    style={{
                        margin: '1rem 0',
                        border: '1px solid gray',
                        borderRadius: '22px',
                        padding: '2rem',
                        maxWidth: isSmallScreen ? '96%' : 'auto'
                    }}>
                    <Grid item container>
                        <Grid xs={1} item container justify="center" alignItems="center">
                            <strong> ו'</strong>
                        </Grid>

                        <Grid xs={5} item container direction="column" alignItems="center">
                            <div style={{marginBottom: '.7rem'}}>התחלה</div>
                            <TimePickerSelector
                                time={friday.from}
                                onTimeChange={(h: any) =>
                                    setHours({
                                        ...hours,
                                        friday: {
                                            ...friday,
                                            from: `${h.hour}:${h.minute}`
                                        }
                                    })
                                }
                            />
                        </Grid>

                        <Grid xs={5} item container direction="column" alignItems="center">
                            <div style={{marginBottom: '.7rem'}}>סיום</div>
                            <TimePickerSelector
                                time={friday.to}
                                onTimeChange={(h: any) =>
                                    setHours({
                                        ...hours,
                                        friday: {
                                            ...friday,
                                            to: `${h.hour}:${h.minute}`
                                        }
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>

                    <Grid container>
                        {friday.breaks.map((b: any, i: number) => {
                            return (
                                <Grid container item style={{marginTop: '2rem'}} key={i}>
                                    <Grid xs={1} item container justify="center" alignItems="center">
                                        <strong>{i + 1}</strong>
                                    </Grid>

                                    <Grid xs={5} item container direction="column" alignItems="center">
                                        <div style={{marginBottom: '.7rem'}}>התחלה</div>
                                        <TimePickerSelector
                                            time={friday.breaks[i].from}
                                            onTimeChange={(h: any) => {
                                                const copy = {...hours};
                                                copy.friday.breaks[i] = {
                                                    from: `${h.hour}:${h.minute}`,
                                                    to: friday.breaks[i].to
                                                };
                                                setHours(copy);
                                            }}
                                        />
                                    </Grid>

                                    <Grid xs={5} item container direction="column" alignItems="center">
                                        <div style={{marginBottom: '.7rem'}}>סיום</div>
                                        <TimePickerSelector
                                            time={friday.breaks[i].to}
                                            onTimeChange={(h: any) => {
                                                const copy = {...hours};
                                                copy.friday.breaks[i] = {
                                                    to: `${h.hour}:${h.minute}`,
                                                    from: friday.breaks[i].from
                                                };
                                                setHours(copy);
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={1} container direction="column" alignItems="center" justify="center">
                                        <IconButton onClick={() => {
                                            const copy = {...hours};
                                            copy.friday.breaks.splice(i, 1);
                                            setHours(copy);
                                        }}>
                                            <DeleteOutlineIcon/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>

                    {friday.breaks.length < 2 && (
                        <Grid item container justify="center" alignItems="center" style={{marginTop: '1rem'}}>
                            <Grid item>
                                <IconButton onClick={() => {
                                    if (friday.breaks.length <= 3) {
                                        setHours({
                                            ...hours,
                                            friday: {
                                                ...friday,
                                                breaks: [...friday.breaks, {from: '12:00', to: '13:00'}]
                                            }
                                        })
                                    }
                                }}>
                                    <AddCircleOutlineIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                            <span style={{cursor: 'pointer'}} onClick={() => {
                                if (friday.breaks.length <= 3) {
                                    setHours({
                                        ...hours,
                                        friday: {
                                            ...friday,
                                            breaks: [...friday.breaks, {from: '12:00', to: '13:00'}]
                                        }
                                    })
                                }
                            }}>הוספת הפסקה</span>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            )}


            {hours.saturday && (
                <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    style={{
                        margin: '1rem 0',
                        border: '1px solid gray',
                        borderRadius: '22px',
                        padding: '2rem',
                        maxWidth: isSmallScreen ? '96%' : 'auto'
                    }}>
                    <Grid item container>
                        <Grid xs={1} item container justify="center" alignItems="center">
                            <strong> ש'</strong>
                        </Grid>

                        <Grid xs={5} item container direction="column" alignItems="center">
                            <div style={{marginBottom: '.7rem'}}>התחלה</div>
                            <TimePickerSelector
                                time={saturday.from}
                                onTimeChange={(h: any) =>
                                    setHours({
                                        ...hours,
                                        saturday: {
                                            ...saturday,
                                            from: `${h.hour}:${h.minute}`
                                        }
                                    })
                                }
                            />
                        </Grid>

                        <Grid xs={5} item container direction="column" alignItems="center">
                            <div style={{marginBottom: '.7rem'}}>סיום</div>
                            <TimePickerSelector
                                time={saturday.to}
                                onTimeChange={(h: any) =>
                                    setHours({
                                        ...hours,
                                        saturday: {
                                            ...saturday,
                                            to: `${h.hour}:${h.minute}`
                                        }
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>

                    <Grid container>
                        {saturday.breaks.map((b: any, i: number) => {
                            return (
                                <Grid container item style={{marginTop: '2rem'}} key={i}>
                                    <Grid xs={1} item container justify="center" alignItems="center">
                                        <strong>{i + 1}</strong>
                                    </Grid>

                                    <Grid xs={5} item container direction="column" alignItems="center">
                                        <div style={{marginBottom: '.7rem'}}>התחלה</div>
                                        <TimePickerSelector
                                            time={saturday.breaks[i].from}
                                            onTimeChange={(h: any) => {
                                                const copy = {...hours};
                                                copy.saturday.breaks[i] = {
                                                    from: `${h.hour}:${h.minute}`,
                                                    to: saturday.breaks[i].to
                                                };
                                                setHours(copy);
                                            }}
                                        />
                                    </Grid>

                                    <Grid xs={5} item container direction="column" alignItems="center">
                                        <div style={{marginBottom: '.7rem'}}>סיום</div>
                                        <TimePickerSelector
                                            time={saturday.breaks[i].to}
                                            onTimeChange={(h: any) => {
                                                const copy = {...hours};
                                                copy.saturday.breaks[i] = {
                                                    to: `${h.hour}:${h.minute}`,
                                                    from: saturday.breaks[i].from
                                                };
                                                setHours(copy);
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={1} container direction="column" alignItems="center" justify="center">
                                        <IconButton onClick={() => {
                                            const copy = {...hours};
                                            copy.saturday.breaks.splice(i, 1);
                                            setHours(copy);
                                        }}>
                                            <DeleteOutlineIcon/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>

                    {saturday.breaks.length < 2 && (
                        <Grid item container justify="center" alignItems="center" style={{marginTop: '1rem'}}>
                            <Grid item>
                                <IconButton onClick={() => {
                                    if (saturday.breaks.length <= 3) {
                                        setHours({
                                            ...hours,
                                            saturday: {
                                                ...saturday,
                                                breaks: [...saturday.breaks, {from: '12:00', to: '13:00'}]
                                            }
                                        })
                                    }
                                }}>
                                    <AddCircleOutlineIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                            <span style={{cursor: 'pointer'}} onClick={() => {
                                if (saturday.breaks.length <= 3) {
                                    setHours({
                                        ...hours,
                                        saturday: {
                                            ...saturday,
                                            breaks: [...saturday.breaks, {from: '12:00', to: '13:00'}]
                                        }
                                    })
                                }
                            }}>הוספת הפסקה</span>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            )}
        </Grid>
    );
};

export default Hours;