const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const app = express()
const routes = require('./routes')
const PORT = 3000
const connectionString = 'mongodb://127.0.0.1:27017/'


app.use(express.urlencoded({ extended: false }))

MongoClient.connect(connectionString, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
    .then((client) => {
        console.log('Connected to database')
        const db = client.db('entertainme')
        const collection = db.collection('Movies')

        //READ
        app.get('/', (req, res) => {
            db.collection('Movies').find({}).toArray()
                .then((result) => {
                    console.log(result)
                    // res.sendFile(__dirname + '/index.html')
                    res.json(result)
                }).catch((err) => {
                    console.log(err)
                });
        })

        //CREATE
        app.post('/movie', (req, res) => {
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
        app.put('/movie/:id', (req, res) => {
            collection.update({_id: ObjectId(req.params.id)}, {$set: req.body})
                .then((result) => {
                    console.log('data has been updated')
                    res.redirect('/')
                }).catch((err) => {
                    console.log(err)
                });
        })

        //DELETE
        app.delete('/movie/:id', (req, res) => {
            collection.remove({_id: ObjectId(req.params.id)})
                .then((result) => {
                    console.log('Movie deleted')
                    res.redirect('/')
                }).catch((err) => {
                    console.log(err)
                });
        })
        
        app.listen(PORT, () => {
            console.log(`Mongo listening to the server : ${PORT}`)
        })
    }).catch((err) => {
        console.log(err)
    });