import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { makeStyles } from '@material-ui/core/styles';
import CardComponent from './CardMovies'
import {
    Container,
    Fab
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import InsertMovie from './InsertMovieForm';
import UpdateMovieForm from './UpdateMovieForm';
import Loading from './Loading'
import { useDispatch } from 'react-redux';
import { setModalForm } from '../store/actions'

const MOVIES = gql`
    query {
        movies {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`;

const useStyles = makeStyles((theme) => ({
    MovieContainer: {
        display: 'flex',
        paddingTop: '2em',
        flexDirection : "row",
        justifyContent: 'center',
        flexWrap: 'wrap',
        border: '1px solid black',
    },
    margin: {
        margin: theme.spacing(1),
        position: 'fixed',
        left: '90%',
        top: '90%'
      },
  }));



export default function MovieList() {
    const classes = useStyles();
    const { loading, error, data } = useQuery(MOVIES);

    const dispatch = useDispatch();

    const onOpenModal = () => {
        dispatch(setModalForm(true))
    }
    
    if (loading) return <Loading />
    if (error) return <p>Error</p>

    return (
        <Container className={classes.MovieContainer}>
            <InsertMovie />
            <UpdateMovieForm />
            {data.movies.map((movie, index) => (
                <CardComponent 
                key={movie._id} payload={movie}/>
            ))}
            <Fab color="secondary" aria-label="add" className={classes.margin} onClick={() => onOpenModal()}>
                <AddIcon />
            </Fab>
        </Container>
    );
}