import React from 'react'
import { Grid, Typography } from '@material-ui/core'

import Brightness5Icon from '@material-ui/icons/Brightness5';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CloudIcon from '@material-ui/icons/Cloud';

function Icon(icon) {
    if (icon == "rain") {
        return <CloudIcon />
    } else if (icon == "partly-cloudy-day") {
        return <CloudIcon />
    } else if (icon == "cloudy") {
        return <CloudIcon />
    } else if (icon == "clear-day") {
        return <Brightness5Icon />
    } else {
        return <Brightness5Icon />
    }
}

function ForecastListItem(props) {
    return (
        <div key={props.day.time}>
            <Grid container direction='column' alignItems='flex-start' style={{padding: '8px'}}>
                <Grid item>
                    <Grid container direction='row' justify="center" spacing={2}>
                        <Grid item>
                            {Icon(props.day.icon)}
                        </Grid>
                        <Grid item>
                            <Typography variant='body1'>
                                {props.day.temperatureLow} / {props.day.temperatureHigh}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant='body2'>
                        {props.day.summary}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default ForecastListItem
