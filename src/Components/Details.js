import React from 'react'
import {Typography} from '@material-ui/core'

function Details(props) {
    if (props.currently != undefined) {
        return (
            <div>
                <Typography variant='h6' style={{marginBottom: '10px', textAlign: 'left'}}>
                    Details:
                </Typography>
                <Typography style={{textAlign: 'left'}} variant='body1'> 
                    {props.currently.summary}
                </Typography>
                <Typography style={{textAlign: 'left'}} variant='body1'> 
                    Feels like {props.currently.apparentTemperature}
                </Typography>
                <Typography style={{textAlign: 'left'}} variant='body1'> 
                    {props.currently.humidity * 100}% Humidity
                </Typography>
                <Typography style={{textAlign: 'left'}} variant='body1'> 
                    {props.currently.precipProbability * 100}% Chance of Percipitation
                </Typography>
                <Typography style={{textAlign: 'left'}} variant='body1'> 
                    Winds are blowing at {props.currently.windSpeed} mph
                </Typography>
            </div>
        )
    } else {
        return null
    }
}

export default Details
