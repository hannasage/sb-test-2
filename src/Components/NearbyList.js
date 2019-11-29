import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
    //   justifyContent: 'space-around',
    //   overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        height: 450,
    },
    title: {
      color: '#ffffff',
    },
    titleBar: {
      background:
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
  }));

function NearbyList(props) {
    const classes = useStyles();
    const [img, updateImg] = useState()

    if (props.nearby.length > 0) {
        return (
            <div className={classes.root}>
                <GridList className={classes.gridList} key="Subheader" cols={2}>
                    {props.nearby.map(tile => (
                    <GridListTile key={tile.img}>
                        <img src={tile.icon} alt={tile.name} />
                        <GridListTileBar
                        title={tile.name}
                        classes={{
                            root: classes.titleBar,
                            title: classes.title,
                        }}
                        actionIcon={
                            <IconButton aria-label={`star ${tile.name}`}>
                            <StarBorderIcon className={classes.title} />
                            </IconButton>
                        }
                        />
                    </GridListTile>
                    ))}
                </GridList>
            </div>
        )
    } else {
        return null
    }
}

export default NearbyList
