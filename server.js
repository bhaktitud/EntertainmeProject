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

        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html')
        })

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

        collection.find({}).toArray((err, result) => {
            if(err) console.log(err)

            console.log(result)
        })

        app.listen(PORT, () => {
            console.log(`Mongo listening to the server : ${PORT}`)
        })
    }).catch((err) => {
        console.log(err)
    });