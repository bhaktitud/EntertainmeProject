const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const app = express()
const PORT = 3002
const connectionString = 'mongodb://127.0.0.1:27017/'


app.use(express.urlencoded({ extended: false }))

MongoClient.connect(connectionString, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
    .then((client) => {
        console.log('Connected to database')
        const db = client.db('TvSeries')
        const collection = db.collection('series')

        //READ
        app.get('/', (req, res) => {
            db.collection('series').find({}).toArray()
                .then((result) => {
                    console.log(result)
                    // res.sendFile(__dirname + '/index.html')
                    res.json(result)
                }).catch((err) => {
                    console.log(err)
                });
        })

        //CREATE
        app.post('/tvseries', (req, res) => {
            console.log(req.body)
            collection.insertOne(req.body)
                .then((result) => {
                    console.log(result)
                    res.redirect('/')
                }).catch((err) => {
                    console.log(err)
                });
        })

        //UPDATE
        app.put('/tvseries/:id', (req, res) => {
            collection.update({_id: ObjectId(req.params.id)}, {$set: req.body})
                .then((result) => {
                    console.log('data has been updated')
                    res.redirect('/')
                }).catch((err) => {
                    console.log(err)
                });
        })

        //DELETE
        app.delete('/tvseries/:id', (req, res) => {
            collection.remove({_id: ObjectId(req.params.id)})
                .then((result) => {
                    console.log('TV Series deleted')
                    res.redirect('/')
                }).catch((err) => {
                    console.log(err)
                });
        })

        app.listen(PORT, () => {
            console.log(`Mongo TV Series listening to the server : ${PORT}`)
        });

    }).catch((err) => {
        console.log(err)
    });