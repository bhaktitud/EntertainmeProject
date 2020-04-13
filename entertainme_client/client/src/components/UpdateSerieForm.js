import React, { useState, useEffect } from 'react';
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
import {setUpdateFormStatus} from '../store/actions';

const UPDATE_SERIE = gql`
    mutation(
        $eventInput: UpdateInput
    ) {
        updateSerie(eventInput: $eventInput) {
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
        justifyContent: 'center',
        flexWrap: 'wrap'
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

export default function UpdateSerieForm () {

    const classes = useStyles();

    const [updateSerie ] = useMutation(UPDATE_SERIE)
    
    const dispatch = useDispatch()
    const open = useSelector(state => state.updateStatus)
    const data = useSelector(state => state.data)

    //localState
    const [ newTitle, setNewTitle ] = useState('')
    const [ newOverview, setNewOverview ] = useState('')
    const [ newPoster, setNewPoster ] = useState('')
    const [ newPopularity, setNewPopularity ] = useState('')
    const [ newTags, setNewTags ] = useState([])

    const handleAddChip = (chips) => {
        setNewTags(chips)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        // console.log(movie._id, newTitle, newOverview, newPoster, newPopularity, newTags)
        updateSerie({
            variables: {
                eventInput: {
                    _id: data._id,
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
        dispatch(setUpdateFormStatus(false))
    }

    useEffect(() => {
        console.log(data)
        setNewTitle(data.title)
        setNewOverview(data.overview)
        setNewPopularity(data.popularity)
        setNewPoster(data.poster_path)
        setNewTags(data.tags)
    }, [data])

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
                    Update Serie
                </Typography>
                <CardContent className={classes.InputContainer}>
                    <TextField id="serie-title" label="title" defaultValue={data.title} onChange={(e) => setNewTitle(e.target.value)}/>
                    <TextField id="serie-overview" label="overview" defaultValue={data.overview} onChange={(e) => setNewOverview(e.target.value)} />
                    <TextField id="serie-poster" label="poster path" defaultValue={data.poster_path} onChange={(e) => setNewPoster(e.target.value)} />
                    <TextField id="serie-popularity" label="popularity" defaultValue={data.popularity} onChange={(e) => setNewPopularity(Number(e.target.value))}/>
                    <ChipInput
                    className={classes.ChipInputStyle}
                        defaultValue={data.tags}
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