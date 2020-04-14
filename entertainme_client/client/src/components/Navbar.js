import React from 'react';
import {
    AppBar,
    Typography,
    Breadcrumbs,
    Link,
    Container
} from '@material-ui/core';

import { useHistory } from "react-router-dom";
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import HomeIcon from '@material-ui/icons/Home';


import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      alignSelf: 'center',
      justifyContent: 'center',
      paddingTop: '.5%',
      fontSize: '2rem',
      fontFamily: 'Special Elite',
      color: '#010101',
    },
  }));

export default function Navbar () {
    const classes = useStyles();

    let history = useHistory();

    const navToMovies = (e) => {
      e.preventDefault()
      history.push('/movies')
    }
    
    const navToSeries = (e) => {
      e.preventDefault()
      history.push('/series')
    }

    const navToHome = (e) => {
      e.preventDefault()
      history.push('/')
    }

    return (
        <AppBar position="static">
          <Container>
            <Typography variant="h6" className={classes.title}>
                MOVIESxSERIES Library
            </Typography>
          </Container>
          <Container>
            <Breadcrumbs aria-label="breadcrumb">
              <Typography color="textPrimary">Navigate To >></Typography>
              <Link color="inherit" href="" onClick={(e) => navToHome(e)}>
                <Container style={{display: 'flex', paddingLeft: '0', paddingRight: '0'}}>
                  <HomeIcon /> Home
                </Container>
              </Link>
              <Link color="inherit" href="" onClick={(e) => navToMovies(e)}>
                <Container style={{display: 'flex', paddingLeft: '0', paddingRight: '0'}}>
                  <MovieIcon /> Movies
                </Container>
              </Link>
              <Link color="inherit" href="" onClick={(e) => navToSeries(e)}>
              <Container style={{display: 'flex', paddingLeft: '0', paddingRight: '0'}}>
                <TvIcon /> Series
              </Container>  
              </Link>
            </Breadcrumbs>
          </Container>
        </AppBar>
    );
}