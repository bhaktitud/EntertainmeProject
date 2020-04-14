import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { makeStyles } from '@material-ui/core/styles';
import CardComponent from './CardSeries'
import {
    Container,
    Fab
} from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add';
import InsertSerie from './InsertSerieForm';
import UpdateSerieForm from './UpdateSerieForm'
import { useDispatch } from 'react-redux';
import { setModalForm } from '../store/actions'

const SERIES = gql`
    query {
        tv {
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
    SerieContainer: {
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

export default function SeriesList() {
    const classes = useStyles();
    const { loading, error, data } = useQuery(SERIES);

    const dispatch = useDispatch();

    const onOpenModal = () => {
        dispatch(setModalForm(true))
    }

    if (loading) return <p>Loading Series...</p>
    if (error) return <p>Error</p>

    return (
        <Container className={classes.SerieContainer}>
            <InsertSerie />
            <UpdateSerieForm />
            {data.tv.map((serie) => (
                <CardComponent 
                key={serie._id} payload={serie}/>
            ))}
            <Fab color="secondary" aria-label="add" className={classes.margin} onClick={() => onOpenModal()}>
                <AddIcon />
            </Fab>
        </Container>
    );
}