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

function LiveTemperature(props) {
    return (
        <div>
            <Grid container direction='column' alignItems='center'>
                <Grid item>
                    {
                        props.currently != undefined ?
                        Icon(props.currently.icon) : null
                    }
                </Grid> 
                <Grid item>
                    <Typography style={{fontSize: '35px'}} variant='body1'>
                        {
                            props.currently != undefined ? 
                            props.currently.temperature : null
                        }
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default LiveTemperature
