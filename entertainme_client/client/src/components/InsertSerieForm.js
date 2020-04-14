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

const INSERT_DATA_TV = gql`
    mutation(
        $eventInput: EventInput
    ) {
        insertSerie(eventInput: $eventInput) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`;

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

export default function InsertSerieForm () {

    const classes = useStyles();

    const [insertSerie ] = useMutation(INSERT_DATA_TV, {
        update(cache, { data : { insertSerie } }) {
            const { tv } = cache.readQuery({ query: SERIES });
            cache.writeQuery({
                query: SERIES,
                data: { tv: tv.concat([insertSerie]) }
            })
        }
    })

    //localState
    const [ newTitle, setNewTitle ] = useState('')
    const [ newOverview, setNewOverview ] = useState('')
    const [ newPoster, setNewPoster ] = useState('')
    const [ newPopularity, setNewPopularity ] = useState(0)
    const [ newTags, setNewTags ] = useState([])

    const dispatch = useDispatch()
    const open = useSelector(state => state.modalStatus)

    const handleAddChip = (chips) => {
        setNewTags([...newTags, ...chips])
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        insertSerie({
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
        <Card className={classes.root}>
        <form 
            className={classes.root} 
            noValidate autoComplete="off"
            onSubmit={e => handleOnSubmit(e)}
        >
                <Typography component='p' variant="h5">
                    New TV Series
                </Typography>
                <CardContent className={classes.InputContainer}>
                    <TextField id="serie-title" label="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                    <TextField id="serie-overview" label="overview" value={newOverview} onChange={(e) => setNewOverview(e.target.value)} />
                    <TextField id="serie-poster" label="poster path" value={newPoster} onChange={(e) => setNewPoster(e.target.value)} />
                    <TextField id="serie-popularity" label="popularity" value={newPopularity} onChange={(e) => setNewPopularity(Number(e.target.value))}/>
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
                </form>
            </Card>
        </Fade>
      </Modal>
    
    );
}