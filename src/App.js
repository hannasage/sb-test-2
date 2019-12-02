import React, { useState, useEffect } from 'react';
import './App.css';
import { makeStyles, rgbToHex, withStyles, fade } from '@material-ui/core/styles';
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
import { LinearProgress } from '@material-ui/core';
import ForecastListItem from './Components/ForecastListItem'
import LiveTemperature from './Components/LiveTemperature';
import Details from './Components/Details';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchBar from './Components/SearchBar';
import Panel from './Components/Panel';


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
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
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

  const [appName, changeAppName] = useState('WeatherHub')
  const [addressList, updateAddressList] = useState({})
  const [selectedAddress, updateSelectedAddress] = useState({})
  const [forecast, updateForecast] = useState({})
  const [system, changeSystem] = useState('c') // c = celcius, f = farenheit
  const [nearby, updateNearby] = useState([])
  const [lat, updateLat] = useState(39.45672)
  const [lng, updateLng] = useState(-76.969601)
  const [loaded, updateLoaded] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const open = Boolean(anchorEl);

  const testText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor non ipsum et feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis imperdiet nisl sed metus accumsan commodo. Maecenas urna orci, placerat ut lobortis eu, facilisis nec augue. Etiam eu odio quis ex luctus imperdiet sed eget mi. Fusce volutpat vel libero nec dapibus. In hac habitasse platea dictumst."

  useEffect(() => {
    axios.get(`https://api.darksky.net/forecast/09b2001e4b878941580a9e3460cb83e4/${lat},${lng}`)
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
    console.log('From Parent: ' + search)
  }

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
              onClick={handleMenu}
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
                  <Panel data={forecast} icon='loc' variant='current-forecast-details' title={`Lat: ${lat}, Lon: ${lng}`} />
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
        
      </div>
    );
  }

  
}

export default App;
