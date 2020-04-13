import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Avatar, Chip } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

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
  ChipTags: {
    color: 'white'
  }
  
}));

export default function CardComponent(props) {
    const classes = useStyles();
    const { title, overview, poster_path, popularity, tags } = props.payload
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
              <Typography variant="body2" component="p">
                
              </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions className={classes.CardActionContainer}>
              <Button size="small" color="primary">
                Update
              </Button>
              <Button size="small" color="primary">
                Delete
              </Button>
            </CardActions>
        </Card>
        </BackSide>
      </Flippy>
  );
}
