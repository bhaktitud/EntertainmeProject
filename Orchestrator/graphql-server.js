const express = require('express')
const app = express()
// const { ApolloServer, gql, graphqlExpress } = require('apollo-server-express')
const {ApolloServer, gql} = require('apollo-server')
const PORT = 3000

const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const typeDefs = gql`
    type Movie {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Int
        tags: [String]
    }
    type Serie {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Int
        tags: [String]
    }

    input EventInput {
        title: String
        overview: String
        poster_path: String
        popularity: Int
        tags: [String]
    }

    type Mutation {
        insertMovie(eventInput: EventInput): Movie
        insertSerie(eventInput: EventInput): Serie
        deleteMovie(_id: String!): Movie
        deleteSerie(_id: String!): Serie

    }

    type Query {
        movies: [Movie]
        tv: [Serie]
    }
`;

const resolvers = {
    Query: {
        movies: () => 
            axios
                .get('http://localhost:3001/movies')
                .then(({ data }) => {
                    return data
                }).catch((err) => {
                    console.log(err)
                }),
        tv: () => 
            axios
                .get('http://localhost:3002/tv')
                .then(({ data }) => {
                    return data
                }).catch((err) => {
                    console.log(err)
                }),
    },

    Mutation: {
        insertMovie: (_, payload) => {
            const movieData = {
                title: payload.eventInput.title,
                overview: payload.eventInput.overview,
                poster_path: payload.eventInput.poster_path,
                popularity: payload.eventInput.popularity,
                tags: payload.eventInput.tags
            }
            axios
                .post('http://localhost:3001/movies', movieData)
                .then(({ data }) => {       
                    return data
                }).catch((err) => {
                    return err
                });
        },

        insertSerie: (_, payload) => {
            const serieData = {
                title: payload.eventInput.title,
                overview: payload.eventInput.overview,
                poster_path: payload.eventInput.poster_path,
                popularity: payload.eventInput.popularity,
                tags: payload.eventInput.tags
            }
            axios
                .post('http://localhost:3002/tv', serieData)
                .then(({ data }) => {       
                    return data
                }).catch((err) => {
                    return err
                });
        },

        deleteMovie: (_, payload) => {
            const { _id } = payload
            axios
                .delete(`http://localhost:3001/movies/${_id}`)
                .then(({ data }) => {
                    return _id
                }).catch((err) => {
                    return err
                });
        },

        deleteSerie: (_, payload) => {
            const { _id } = payload
            axios
                .delete(`http://localhost:3002/tv/${_id}`)
                .then(({ data }) => {
                    return _id
                }).catch((err) => {
                    return err
                });
        }
    }
}


const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

server.listen().then(({ url }) => {
    console.log(`Server up and running on ${url}`);
})