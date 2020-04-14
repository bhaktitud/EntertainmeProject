import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container, 
  Avatar, 
  Chip,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography 
} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useDispatch } from 'react-redux';
import { setUpdateForm, setUpdateFormStatus } from '../store/actions'


const DELETE_DATA = gql`
    mutation($_id: String){
      deleteSerie(_id: $_id) {
        _id
      }
    }
`; // this part makes it hard to convert the component to be reusable

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
    width: '100%',
    height:'100%',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#181818',
    paddingLeft: '2%',
  },
  FrontCardContainer:{
    backgroundColor: '#181818'

  },
  media: {
    height: '20rem',
    maxHeight: '25rem',
    backgroundColor: '#1C1C1C',
    borderTopRightRadius: '30%',
    borderBottomLeftRadius: '25%'
  },
  CardActionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    
  },
  MovieDescription: {
    fontSize:'.9rem',
    fontWeight:'normal',
    color:'gray',
  },
  OverviewContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: '5%',
    padding: 0
  },
  FlippyContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#181818',
    marginTop: '2%',
  },
  FrontSide: {
    width: '15rem',
    backgroundColor: '#1C1C1C',
    borderRadius: '5%',
  },
  BackSide: {
    width: '15rem',
    backgroundColor: '#1C1C1C',
    borderRadius: '5%'
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: 'black',
    position: "absolute",
    top: '1rem',
    right: '1rem',
    fontFamily: "'Bangers', cursive"
  },
  chip: {
    color: 'white'
  },
  ChipContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: '5%'
  }
  
}));

export default function CardComponent(props) {
    const classes = useStyles();
    const { _id, title, overview, poster_path, popularity, tags } = props.payload
    const [ deleteSerie ] = useMutation(DELETE_DATA)
    

    const dispatch = useDispatch()

    const handleOnDelete = (id) => {
      deleteSerie({ 
        variables: { _id: id },
        update: (cache) => {
          const { tv } = cache.readQuery({ query: SERIES })
          const newTv = tv.filter(t => (t._id !== id));
          cache.writeQuery({
            query: SERIES,
            data: { tv: newTv }
          })
        }
      });
    }

    const handleOnUpdate = () => {
      console.log(props.payload)
      dispatch(setUpdateFormStatus(true))
      dispatch(setUpdateForm(props.payload))
    }

      return (
        <Flippy
        className={classes.FlippyContainer}
        flipOnHover={true} // default false
        flipOnClick={false} // default false
        flipDirection="horizontal" // horizontal or vertical
      >
        <FrontSide
          className={classes.FrontSide}
        >
          <Card className={classes.FrontCardContainer}>
            <CardActionArea>
              <CardMedia
              className={classes.media}
              image={poster_path}
              title={title}
            />
            </CardActionArea>
            <Avatar className={classes.orange}>{popularity}</Avatar>
          </Card>
        </FrontSide>
        <BackSide
          className={classes.BackSide}  
        >
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Container className={classes.OverviewContainer}>
                <p>Overview</p>
                <Typography variant="body2" component="p" className={classes.MovieDescription}>
                  {overview}
                </Typography>
              </Container>
              <Container className={classes.ChipContainer}>
                  {tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      variant='outlined'
                      className={classes.chip}
                      size="small"
                    />
                  ))}
              </Container>
            </CardContent>
            </CardActionArea>
            <CardActions className={classes.CardActionContainer}>
              <Button size="small" color="primary" onClick={() => handleOnUpdate() }>
                Update
              </Button>
              <Button size="small" color="primary" onClick={() => handleOnDelete(_id)}>
                Delete
              </Button>
            </CardActions>
        </Card>
        </BackSide>
      </Flippy>
  );
}
