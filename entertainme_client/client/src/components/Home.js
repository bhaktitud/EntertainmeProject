import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    CarouselContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '2%',
        height: '50%',
        width: '100%',
    },
    ImageStyle: {
        width: '100%',
        borderRadius: '5%'
    }
}))


export default function Home () {
    const classes = useStyles();

    const imageList = [
        {
            name : "Captain America",
            url: 'https://wallpapersite.com/images/pages/pic_w/98.jpg'
        },
        {
            name : "Wolverine",
            url: 'https://2.bp.blogspot.com/-0M2qp8bad0k/WDE1Ivp7yII/AAAAAAAAA84/Oz7PeiWBux8v2J7u9FNtWz5f7IB48eV3ACEw/s1600/maxresdefault.jpg'
        },
        {
            name : 'Series',
            url : 'https://lifegoeson360.online/wp-content/uploads/2019/09/tv-series.jpg'
        }
    ]

    return (
        <Container className={classes.CarouselContainer}>
            <Carousel className={classes.CarouselContainer}>
                {
                    imageList.map((image) => (
                        <img src={image.url} className={classes.ImageStyle}></img>
                    ))
                }
            </Carousel>
        </Container>
    )
}