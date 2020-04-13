import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { makeStyles } from '@material-ui/core/styles';
import CardComponent from './Card'
import {
    Container
} from '@material-ui/core'

const SERIES = gql`
    query {
        tv {
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`;

const useStyles = makeStyles({
    SerieContainer: {
        display: 'flex',
        paddingTop: '2em',
        flexDirection : "row",
        justifyContent: 'center',
        flexWrap: 'wrap',
        border: '1px solid black',
    }
  });

export default function SeriesList() {
    const classes = useStyles();
    const { loading, error, data } = useQuery(SERIES);

    if (loading) return <p>Loading Series...</p>
    if (error) return <p>Error</p>

    return (
        <Container className={classes.SerieContainer}>
            {data.tv.map(serie => (
                <CardComponent 
                key={serie.id} payload={serie}/>
            ))}
        </Container>
    );
}