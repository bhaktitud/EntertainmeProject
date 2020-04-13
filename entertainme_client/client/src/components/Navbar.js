import React from 'react';
import {
    AppBar,
    Typography,
    Breadcrumbs,
    Link,
    Container
} from '@material-ui/core';

import { useHistory } from "react-router-dom";

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
              <Link color="inherit" href="" onClick={(e) => navToMovies(e)}>
                Movies
              </Link>
              <Link color="inherit" href="" onClick={(e) => navToSeries(e)}>
                Series
              </Link>
            </Breadcrumbs>
          </Container>
        </AppBar>
    );
}