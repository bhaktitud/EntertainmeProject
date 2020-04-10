const express = require('express')
const app = express()
const PORT = 3000

const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/entertainme', (req, res, next) => {
    try {
        redis
            .get('entertainme')
            .then((reply) => {
                if(reply){
                    res.status(200).json(JSON.parse(reply))
                } else {
                    return axios
                        .all([
                            axios.get('http://localhost:3001/movies'),
                            axios.get('http://localhost:3002/tv')
                        ])
                }
            })
            .then( axios.spread((...responses) => {
                const data = {
                    movies: responses[0].data,
                    series: responses[1].data
                }
                redis.set('entertainme', JSON.stringify( data ), (err) => {
                    if (err) {
                        throw err
                    } else {
                        res.status(200).json(data)
                    }
                })
            }))
            .catch((err) => {
                res.status(500).json({
                    err: err.message
                })
            });
    } catch (error) {
        console.log('masuk sini errornyaaaaa .>>>>>>>')
    }
})

app.get('/movies', (req, res) => {
    redis
        .get('movies')
        .then((reply) => {
            if(reply) {
                res.status(200).json(JSON.parse(reply))
            } else {
                return axios
                    .get('http://localhost:3001/movies')
            }
        }).then(({ data }) => {
            redis.set('movies', JSON.stringify( data ), (err) => {
                if (err) {
                    throw err
                } else {
                    res.status(200).json(data)
                }
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
            redis.set('tvSeries', JSON.stringify( data ), (err) => {
                if (err) {
                    throw err
                } else {
                    res.status(200).json(data)
                }
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
        .post('http://localhost:3001/movies', req.body)
        .then(({ data }) => {
            return redis.flushall((err) => {
                if(err) throw err
                res.status(200).json({
                    status: 'Movie added'
                })
            })
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
            return redis.flushall((err) => {
                if(err) throw err
                res.status(200).json({
                    status: 'Tv Series added'
                })
            })
        }).catch((err) => {
            res.status(500).json({
                err: err.message
            })
        });
})

app.put('/movie/:id', (req, res) => {
    axios
        .put(`http://localhost:3001/movies/${req.params.id}`, req.body)
        .then(({ data }) => {
            return redis.flushall((err) => {
                if(err) throw err
                res.status(200).json({
                    status: 'Movie updated'
                })
            })
        }).catch((err) => {
            res.status(500).json({
                err: err.message
            })
        });
})

app.put('/tv/:id', (req, res) => {
    axios
        .put(`http://localhost:3002/tv/${req.params.id}`, req.body)
        .then(({ data }) => {
            return redis.flushall((err) => {
                if(err) throw err
                res.status(200).json({
                    status: 'TV Series updated'
                })
            })
        }).catch((err) => {
            res.status(500).json({
                err: err.message
            })
        });
})

app.delete('/movie/:id', (req, res) => {
    console.log(req.params.id)
    axios
        .delete(`http://localhost:3001/movies/${req.params.id}`)
        .then((_) => {
            return redis.flushall((err) => {
                if(err) throw err
                res.status(200).json({
                    status: 'Movie deleted'
                })
            })
        }).catch((err) => {
            res.status(500).json({
                err: err.message
            })
        });
})

app.delete('/tv/:id', (req, res) => {
    axios
        .delete(`http://localhost:3002/tv/${req.params.id}`)
        .then((_) => {
            return redis.flushall((err) => {
                if(err) throw err
                res.status(200).json({
                    status: 'TV Serie deleted'
                })
            })
        }).catch((err) => {
            res.status(500).json({
                err: err.message
            })
        });
})



app.listen(PORT, () => {
    console.log(`Up and running on : ${PORT}`)
})