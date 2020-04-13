const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const app = express()
const PORT = 3002
const connectionString = 'mongodb://127.0.0.1:27017/'


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

MongoClient.connect(connectionString, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
    .then((client) => {
        console.log('Connected to database')
        const db = client.db('TvSeries')
        const collection = db.collection('series')

        //READ
        app.get('/tv', (req, res) => {
            db.collection('series').find({}).toArray()
                .then((result) => {
                    res.status(200).json(result)
                }).catch((err) => {
                    res.status(500).json({
                        err: err.message
                    })
                });
        })

        //CREATE
        app.post('/tv', (req, res) => {
            collection.insertOne(req.body)
                .then((result) => {
                    res.status(201).json({ 
                        ...result.ops[0], _id: result.insertedId 
                    })
                }).catch((err) => {
                    res.status(500).json({
                        err: err.message
                    })
                });
        })

        //UPDATE
        app.put('/tv/:id', (req, res) => {
            collection.update({_id: ObjectId(req.params.id)}, {$set: req.body})
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
        app.delete('/tv/:id', (req, res) => {
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
            console.log(`Mongo TV Series listening to the server : ${PORT}`)
        });

    }).catch((err) => {
        console.log(err)
    });