const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const app = express()
const PORT = 3001
const connectionString = 'mongodb://127.0.0.1:27017/'


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

MongoClient.connect(connectionString, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
    .then((client) => {
        console.log('Connected to database')
        const db = client.db('Movies')
        const collection = db.collection('movie')

        //READ
        app.get('/movies', (req, res) => {
            db.collection('movie').find({}).toArray()
                .then((result) => {
                    res.status(200).json(result)
                }).catch((err) => {
                    res.status(500).json({
                        err: err.message
                    })
                });
        })

        //CREATE
        app.post('/movies', (req, res) => {
            db.collection('movie').insertOne(req.body)
                .then((result) => {
                    console.log(result)
                    res.status(201).json({ ...result.ops[0], _id: result.insertedId })
                }).catch((err) => {
                    res.status(500).json({
                        err: err.message
                    })
                });
        })

        //UPDATE
        app.put('/movies/:id', (req, res) => {
            db.collection('movie').update({_id: ObjectId(req.params.id)}, {$set: req.body})
                .then((result) => {
                    res.status(200).json({
                        result
                    })
                }).catch((err) => {
                    res.status(500).json({
                        err: err.message
                    })
                });
        })

        //DELETE
        app.delete('/movies/:id', (req, res) => {
            collection.remove({_id: ObjectId(req.params.id)})
                .then((result) => {
                    res.status(200).json({
                        result
                    })
                }).catch((err) => {
                    res.status(500).json({
                        err: err.message
                    })
                });
        })

        app.listen(PORT, () => {
            console.log(`Mongo Movie listening to the server : ${PORT}`)
        });

    }).catch((err) => {
        console.log(err)
    });