import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'

import { makeStyles } from '@material-ui/core/styles';
import {
    TextField, 
    Button,
    Typography,
    Modal,
    Backdrop,
    Fade,
    Card,
    CardContent,
    CardActions
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import {setModalForm} from '../store/actions';

const INSERT_DATA = gql`
    mutation(
        $eventInput: EventInput
    ) {
        insertMovie(eventInput: $eventInput) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`;

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
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '20%'
    },
    ActionContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    InputContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '5%'
    },
    ChipInputStyle: {
        width: '55%'
    }
  }));

export default function InsertMovieForm () {

    const classes = useStyles();

    const [insertMovie ] = useMutation(INSERT_DATA, {
        update(cache, { data : { insertMovie } }) {
            const { movies } = cache.readQuery({ query: MOVIES });
            cache.writeQuery({
                query: MOVIES,
                data: { movies: movies.concat([insertMovie]) }
            })
        }
    })

    //localState
    const [ newTitle, setNewTitle ] = useState('')
    const [ newOverview, setNewOverview ] = useState('')
    const [ newPoster, setNewPoster ] = useState('')
    const [ newPopularity, setNewPopularity ] = useState(0)
    const [ newTags, setNewTags ] = useState(['movie'])

    const dispatch = useDispatch()
    const open = useSelector(state => state.modalStatus)

    const handleAddChip = (chips) => {
        setNewTags([...newTags, ...chips])
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        // console.log(newTitle, newOverview, newPoster, newPopularity, newTags[newTags.length-1])
        insertMovie({
            variables: {
                eventInput: {
                    title: newTitle,
                    overview: newOverview,
                    poster_path: newPoster,
                    popularity: newPopularity,
                    tags: newTags
                }
            }
        })
    }

    const handleOnCancel = () => {
        dispatch(setModalForm(false))
    }

    return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <form 
            className={classes.root} 
            noValidate autoComplete="off"
            onSubmit={e => handleOnSubmit(e)}
        >
            <Card className={classes.InputContainer}>
                <Typography component='p' variant="h5">
                    New Movie
                </Typography>
                <CardContent className={classes.InputContainer}>
                    <TextField id="movie-title" label="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                    <TextField id="movie-overview" label="overview" value={newOverview} onChange={(e) => setNewOverview(e.target.value)} />
                    <TextField id="movie-poster" label="poster path" value={newPoster} onChange={(e) => setNewPoster(e.target.value)} />
                    <TextField id="movie-popularity" label="popularity" value={newPopularity} onChange={(e) => setNewPopularity(Number(e.target.value))}/>
                    <ChipInput
                        className={classes.ChipInputStyle}
                        value={newTags}
                        onChange={(chips) => handleAddChip(chips)}
                        label="tag"
                        allowDuplicates={false}
                        fullWidth={true}
                    />
                </CardContent>
                <CardActions className={classes.ActionContainer}>
                    <Button variant="contained" style={{marginRight: '1%'}} onClick={() => handleOnCancel()}>Cancel</Button>
                    <Button type="submit" variant="contained" style={{marginLeft: '1%'}} color="primary" onClick={() => handleOnCancel()}>
                        Submit
                    </Button>
                </CardActions>
            </Card>
        </form>
        </Fade>
      </Modal>
    
    );
}