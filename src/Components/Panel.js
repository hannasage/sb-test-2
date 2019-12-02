import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HelpIcon from '@material-ui/icons/Help';
import Details from './Details';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    subtitle: {
      marginBottom: '20px',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    }
  }));

function Panel(props) {

    // Pass in data to be displayed through props, along with Component type and Icon

    const classes = useStyles();

    const useIcon = type => {
        switch (type) {
            case 'loc':
                return <LocationOnIcon/>
            case 'help':
                return <HelpIcon /> 
            default:
                return <LocationOnIcon />
        }
    }

    const useVariant = type => {
        switch (type) {
            case 'current-forecast-details':
                if (props.data.currently != undefined) {
                    return <Details currently={props.data.currently} />
                } else {
                    return <Typography variant='body1'>Error with data!</Typography>
                }
            case 'text': 
                if (props.data != undefined) {
                    return <Typography variant='body1'>{props.data}</Typography>
                } else {
                    return <Typography variant='body1'>Error with data!</Typography>
                }
            default:
                return <h1>Error with Variant type!</h1>
        }
    }

    return (
        <Paper className={classes.paper}>
            <Grid container direction='row'>
                <Grid item xs={11}>
                    <Grid container direction='column'>
                        <Grid item>
                            <Typography className={classes.subtitle} style={{textAlign: 'left'}} variant='h5'>
                                {props.title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            {useVariant(props.variant)}
                            {/* Conditionally render icon through props */}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1}>
                    {useIcon(props.icon)} 
                </Grid> 
            </Grid>
            
        </Paper>
    )
}

export default Panel
