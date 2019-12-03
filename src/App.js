import React, { useState, useEffect } from 'react';
import './App.css';
import { makeStyles, rgbToHex, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import { Icon, CircularProgress, LinearProgress } from '@material-ui/core';
import { sizing } from '@material-ui/system';
import ForecastListItem from './Components/ForecastListItem'
import LiveTemperature from './Components/LiveTemperature';
import Details from './Components/Details';
import NearbyList from './Components/NearbyList';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchBar from './Components/SearchBar';
import Panel from './Components/Panel';
import Snackbar from '@material-ui/core/Snackbar';
import SnackBarContentWrapper from './Components/SnackBarContentWrapper'


const useStyles = makeStyles(theme => ({
  theme: {
    backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff'
  },
  card: {
    maxWidth: '345',
    textAlign: 'left'
  },
  whiteText: {
    color: '#ffffff'
  },
  root: {
    flexGrow: 1,
    backgroundColor: '#f7f7f7',
    height: '100vh',
    width: '100vw'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  subtitle: {
    marginBottom: '20px',
  },
  padded: {
    padding: theme.spacing(3, 2)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  paperTheme: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#ffffff',
    backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  loader: {
    display: 'block',
    margin: 'auto'
  }
}));

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#667eea',
  },
  barColorPrimary: {
    backgroundColor: '#764ba2',
  },
})(LinearProgress);

export default function App() {

  const [appName, changeAppName] = useState('WeatherHub')
  const [city, updateCity] = useState('Sykesville, MD')
  const [forecast, updateForecast] = useState({})
  const [nearby, updateNearby] = useState([])
  const [lat, updateLat] = useState(36.9956066)
  const [lng, updateLng] = useState(-91.0145714)
  const [loaded, updateLoaded] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);

  //SnackBar Open/Close
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackVar, setSnackVar] = useState('error')
  const [snackMsg, setSnackMsg] = useState('default message')

  const classes = useStyles();
  const open = Boolean(anchorEl);
  const testText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor non ipsum et feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis imperdiet nisl sed metus accumsan commodo. Maecenas urna orci, placerat ut lobortis eu, facilisis nec augue. Etiam eu odio quis ex luctus imperdiet sed eget mi. Fusce volutpat vel libero nec dapibus. In hac habitasse platea dictumst."

  useEffect(() => {
    updateLoaded(false)
    axios.get(`/forecast/09b2001e4b878941580a9e3460cb83e4/${lat},${lng}`)
    .then(response => {
      updateForecast(response.data)
    })
  }, [lat, lng])

  useEffect(() => {
    if (forecast.currently != undefined) {
      updateLoaded(true)
    }
  }, [forecast])

  const searchCallback = search => {
    if (!search) {
      handleSnackOpen('error', 'Invalid search, please try again.')
    } else {
      axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${search}`)
      .then(response => {
        var data = response.data

        if (data.records[0] != undefined) {
          updateCity(data.records[0].fields.city + ", " + data.records[0].fields.state)
          updateLat(data.records[0].fields.latitude)
          updateLng(data.records[0].fields.longitude)
        } else {
          handleSnackOpen('error', `Zip-code not found: ${search}`);
        }
      })
    }
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleSnackOpen = (variant, message) => {
    setSnackVar(variant)
    setSnackMsg(message)
    setSnackOpen(true)
  }
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClick = (address) => {
    handleClose()
  };

  if (!loaded) {
    return(
      <div className={classes.root}>
      <AppBar className={classes.theme} position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6">
              {appName}
            </Typography>
          </Toolbar>
        </AppBar>
        <ColorLinearProgress />
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
  
      <AppBar className={classes.theme} position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6">
              {appName}
            </Typography>
            <SearchBar searchListener={searchCallback} />
            <IconButton
              edge="end"
              aria-label="display more actions"
              aria-haspopup="true"
              onClick={handleMenuClick}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Metric</MenuItem>
              <MenuItem onClick={handleClose}>Imperial</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Container className={classes.padded} maxWidth="lg">
          <Grid container direction='row' spacing={2}>

            <Grid item xs={12} md={4}>
              <Grid container direction='column' spacing={2}>
  
                <Grid item>
                  <Paper className={classes.paperTheme}>
                    <LiveTemperature currently={forecast.currently} />
                  </Paper>
                </Grid>
  
                <Grid item>
                  <Paper className={classes.paper}>
                    <Grid container direction='column' alignItems='flex-start'>
                      <Grid item>
                        <Typography variant='h5'>
                          7 Day Forecast
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant='body1' className={classes.subtitle}>
                          {forecast.daily.summary}
                        </Typography>
                      </Grid>
                      {
                        forecast.daily != undefined ? 
                        forecast.daily.data.map((day) => 
                        <ForecastListItem key={day.time} day={day} />)
                        : null
                      }
                    </Grid>
                  </Paper>
                </Grid>
  
              </Grid>
            </Grid>
            <Grid item md={8}>

              <Grid container direction='column' spacing={2}>

                <Grid item>
                  <Panel data={forecast} icon='loc' variant='current-forecast-details' title={city} />
                </Grid>

                <Grid item>
                  <Grid container direction='row' spacing={2}>

                    <Grid item md={6}>
                      <Panel data={testText} icon='help' variant='text' title="Information" />
                    </Grid>

                    <Grid item md={6}>
                      <Panel data={testText} icon='help' variant='text' title="Information" />
                    </Grid>

                  </Grid>
                </Grid>

              </Grid>
              
            </Grid>

          </Grid>
        </Container>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={snackOpen}
          autoHideDuration={3000}
          onClose={handleSnackClose}
        >
          <SnackBarContentWrapper
            onClose={handleSnackClose}
            variant={snackVar}
            message={snackMsg}
          />
        </Snackbar>
        
      </div>
    );
  }
}
