const express = require('express')
const app = express()
const PORT = 3000

const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

app.get('/movies', (req, res) => {

    axios
        .get('http://localhost:3001/movie')
        .then(({ data }) => {
            res.json(data)
        }).catch((err) => {
            console.log(err)
        });
})

app.get('/tv', (req, res) => {

    axios
        .get('http://localhost:3001/tv')
        .then(({ data }) => {
            res.json(data)
        }).catch((err) => {
            console.log(err)
        });
})

app.listen(PORT, () => {
    console.log(`Up and running on : ${PORT}`)
})