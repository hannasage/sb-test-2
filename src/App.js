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
<<<<<<< Updated upstream
=======
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchBar from './Components/SearchBar';
import Panel from './Components/Panel';
import Snackbar from '@material-ui/core/Snackbar';
import SnackBarContentWrapper from './Components/SnackBarContentWrapper'
>>>>>>> Stashed changes


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

function App() {

<<<<<<< Updated upstream
  const [addressList, updateAddressList] = useState({})
  const [selectedAddress, updateSelectedAddress] = useState({})
=======
  const [appName, changeAppName] = useState('WeatherHub')
  const [city, updateCity] = useState('Sykesville, MD')
>>>>>>> Stashed changes
  const [forecast, updateForecast] = useState({})
  const [nearby, updateNearby] = useState([])
  const [lat, updateLat] = useState(36.9956066)
  const [lng, updateLng] = useState(-91.0145714)
  const [loaded, updateLoaded] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);

<<<<<<< Updated upstream
  // Runs on first render to get menu list of addresses from SalesBoomerange API
  useEffect(() => {
    axios.get('https://wgrau8p1s0.execute-api.us-east-1.amazonaws.com/production/%7Bskip%7D/%7Blimit%7D/')
      .then(response => {
        updateAddressList(response.data)
        updateSelectedAddress(response.data.rows[0])
      })
      .catch(error => console.log(error))
  }, [])
=======
  //SnackBar Open/Close
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackVar, setSnackVar] = useState('error')
  const [snackMsg, setSnackMsg] = useState('default message')

  const classes = useStyles();
  const open = Boolean(anchorEl);
  const testText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor non ipsum et feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis imperdiet nisl sed metus accumsan commodo. Maecenas urna orci, placerat ut lobortis eu, facilisis nec augue. Etiam eu odio quis ex luctus imperdiet sed eget mi. Fusce volutpat vel libero nec dapibus. In hac habitasse platea dictumst."

  useEffect(() => {
    updateLoaded(false)
    axios.get(`https://api.darksky.net/forecast/09b2001e4b878941580a9e3460cb83e4/${lat},${lng}`)
    .then(response => {
      updateForecast(response.data)
    })
  }, [lat, lng])
>>>>>>> Stashed changes

  //Runs on MenuItem click to grab basic information on location from the Google Places API
  useEffect(() => {
    if (loaded) {
      updateLoaded(false)
    }
    if (selectedAddress.primary_line != undefined) {
      let location = selectedAddress.city + ", " + selectedAddress.state

<<<<<<< Updated upstream
      axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + encodeURIComponent(location.trim()) +'&key=AIzaSyDoegpsR8Hm9Dh4ZZsTpJXO9gw3jnClO5k')
      .then(response => {
        if (response.data.status == 'OK') {
          var data = response.data.results[0]
          updateLat(data.geometry.location.lat)
          updateLng(data.geometry.location.lng)
          return axios.get(`https://api.darksky.net/forecast/09b2001e4b878941580a9e3460cb83e4/${lat},${lng}`)
        } else {
          console.log('From else' + response.status)
        }
      })
      .then(response => {
        updateForecast(response.data)
=======
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
>>>>>>> Stashed changes

        return axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=AIzaSyDoegpsR8Hm9Dh4ZZsTpJXO9gw3jnClO5k`)
      })
      .then(response => {
        updateNearby(response.data.results)
        console.log(response.data.results)
        updateLoaded(true)
      })
      .catch(error => console.log('From Second Error' + error))
    }
  }, [selectedAddress])


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
    // updateSelectedAddress(address.primary_line.replace('#', '') + " " + address.city + ", " + address.state)
    updateSelectedAddress(address)
    handleClose()
  };

  if (!loaded) {
    return(
      <div className={classes.root}>
      <AppBar className={classes.theme} position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6">
              SalesBoomerang
            </Typography>
            <Button className={classes.whiteText} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              {
                selectedAddress.primary_line != undefined ? selectedAddress.primary_line.replace('#', '') : 'Select Address'
              }
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {
                addressList.rows != undefined ? 
                addressList.rows.map(address => <MenuItem key={address.id} onClick={() => handleMenuClick(address)}>{address.primary_line.replace('#', '')}</MenuItem>) 
                : null
              }
            </Menu>
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
              SalesBoomerang
            </Typography>
            <Button className={classes.whiteText} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              {
                selectedAddress.primary_line != undefined ? selectedAddress.primary_line.replace('#', '') : 'Select Address'
              }
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {
                addressList.rows != undefined ? 
                addressList.rows.map(address => <MenuItem key={address.id} onClick={() => handleMenuClick(address)}>{address.primary_line.replace('#', '')}</MenuItem>) 
                : null
              }
            </Menu>
          </Toolbar>
        </AppBar>
        <Container className={classes.padded} maxWidth="lg">
          <Grid container direction='row' spacing={2}>
            <Grid item sm={12} md={4}>
              <Grid container direction='column' spacing={2}>
  
                <Grid item sm={12} md={12}>
                  <Paper className={classes.paperTheme}>
                    <LiveTemperature currently={forecast.currently} />
                  </Paper>
                </Grid>
  
                <Grid item sm={12} md={12}>
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
            <Grid item sm={12} md={8}>
              <Grid container direction='column' spacing={2}>

<<<<<<< Updated upstream
                <Grid item sm={12}>
                  <Paper className={classes.paper}>
                    <Grid container direction='row'>
                      <Grid item sm={11}>
                        <Typography className={classes.subtitle} style={{textAlign: 'left'}} variant='h5'>
                          {/* {selectedAddress} */}
                          {
                            selectedAddress.city != undefined ? 
                            selectedAddress.city + ", " + selectedAddress.state : null 
                          }
                        </Typography>
                        <Details currently={forecast.currently} />
                      </Grid>
                      <Grid item sm={1}>
                        <LocationOnIcon/> 
                      </Grid>
                    </Grid>
                  </Paper>
=======
                <Grid item>
                  <Panel data={forecast} icon='loc' variant='current-forecast-details' title={city} />
>>>>>>> Stashed changes
                </Grid>

              </Grid>
              <Grid container direction='row' spacing={2}>

                <Grid item sm={12} md={6}>
                  <NearbyList nearby={nearby} />
                </Grid>

                <Grid item sm={12} md={6}>
                  <Paper className={classes.paper}>
                    <Grid container direction='row'>
                      <Grid item sm={11}>
                        <Typography className={classes.subtitle} style={{textAlign: 'left'}} variant='h5'>
                          Information 
                        </Typography>
                      </Grid>
                      <Grid item sm={1}>
                        <HelpIcon /> 
                      </Grid>
                    </Grid>
                    <Typography variant='body1'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor non ipsum et feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis imperdiet nisl sed metus accumsan commodo. Maecenas urna orci, placerat ut lobortis eu, facilisis nec augue. Etiam eu odio quis ex luctus imperdiet sed eget mi. Fusce volutpat vel libero nec dapibus. In hac habitasse platea dictumst. 
                    </Typography>
                  </Paper>
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

export default App;
