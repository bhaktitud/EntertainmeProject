const express = require('express')
const app = express()
const PORT = 3000

const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/entertainme', (req, res) => {
    redis
        .get('entertainme')
        .then((reply) => {
            if(reply){
                res.status(200).json(JSON.parse(reply))
            } else {
                return axios
                    .all([
                        axios.get('http://localhost:3001/movie'),
                        axios.get('http://localhost:3002/tv')
                    ])
            }
        })
        .then( axios.spread((movies, series) => {
            const data = {
                movies: movies.data,
                series: series.data
            }
            // console.log(movies.data, 'movies', series.data, '<<<< series')
            redis.set('entertainme', JSON.stringify( data ))
                .then((_) => {
                    res.status(200).json(data)
                })
        }))
        .catch((err) => {
            res.status(500).json({
                err: err.message
            })
        });
})

app.get('/movies', (req, res) => {
    redis
        .get('movies')
        .then((reply) => {
            if(reply) {
                res.status(200).json(JSON.parse(reply))
            } else {
                return axios
                    .get('http://localhost:3001/movie')
            }
        }).then(({ data }) => {
            redis.set('movies', JSON.stringify( data ))
                .then((_) => {
                    res.status(200).json(data)
                })
        }).catch((err) => {
            res.status(500).json({
                err: err.message
            })
        });
})

app.get('/tv', (req, res) => {
    redis
        .get('tv')
        .then((reply) => {
            if(reply) {
                res.status(200).json(JSON.parse(reply))
            } else {
                return axios
                    .get('http://localhost:3002/tv')
            }
        }).then(({ data }) => {
            redis.set('tvSeries', JSON.stringify( data ))
                .then((_) => {
                    res.status(200).json(data)
                })
        }).catch((err) => {
            res.status(500).json({
                err: err.message
            })
        });
})

//post, put & delete
app.post('/movies', (req, res) => {
    axios
        .post('http://localhost:3001/movie', req.body)
        .then(({ data }) => {
            res.status(201).json(data)
        }).catch((err) => {
            res.status(500).json({
                err: err.message
            })
        });
})

app.post('/tv', (req, res) => {

    axios
        .post('http://localhost:3002/tv', req.body)
        .then(({ data }) => {
            res.status(201).json(data)
        }).catch((err) => {
            res.status(500).json({
                err: err.message
            })
        });
})

app.put('/movie', (req, res) => {
    axios
        .put(`http://localhost:3001/movie/${req.params.id}`, req.body)
        .then(({ data }) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json({
                err: err.message
            })
        });
})

app.put('/tv', (req, res) => {
    axios
        .put(`http://localhost:3002/tv/${req.params.id}`, req.body)
        .then(({ data }) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json({
                err: err.message
            })
        });
})

app.delete('/movie', (req, res) => {
    axios
        .delete(`http://localhost:3001/movie/${req.params.id}`)
        .then(({ data }) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json({
                err: err.message
            })
        });
})

app.delete('/tv', (req, res) => {
    axios
        .delete(`http://localhost:3002/tv/${req.params.id}`)
        .then(({ data }) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json({
                err: err.message
            })
        });
})



app.listen(PORT, () => {
    console.log(`Up and running on : ${PORT}`)
})