const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()
const routes = require('./routes')
const PORT = 3000
const connectionString = 'mongodb://127.0.0.1:27017/'


app.use(express.urlencoded({ extended: false }))
app.use(routes)

MongoClient.connect(connectionString, {
    useNewUrlParser:true,
    useUnifiedTopology: true
}, (err, client) => {
    if(err){
        console.log(err)
        throw err
    }

    const db = client.db('entertainme')
    const collection = db.collection('Movies')
    collection.insert([
        {
            title: "Rambo V",
            overview: "Petualangan Rambo",
            poster_path: "http://www.google.com/rambo",
            popularity: 4,
            tags: [
                "action",
                "Drama"
            ]

        }
    ], (err, result) => {
        if(err) throw err

        console.log('insert new data')
    })
})

app.listen(PORT, () => {
    console.log(`listen to port: ${PORT}`)
})