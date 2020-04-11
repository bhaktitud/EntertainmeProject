const express = require('express')
const app = express()
// const { ApolloServer, gql, graphqlExpress } = require('apollo-server-express')
const {ApolloServer, gql} = require('apollo-server')
const PORT = 3000

const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()


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

    input UpdateInput {
        _id: ID!
        title: String
        overview: String
        poster_path: String
        popularity: Int
        tags: [String]
    }

    type Mutation {
        insertMovie(eventInput: EventInput): Movie
        insertSerie(eventInput: EventInput): Serie
        updateMovie(eventInput: UpdateInput): Movie
        updateSerie(eventInput: UpdateInput): Serie
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
                    // console.log(data)
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
        insertMovie: (_, payload) => 
            axios
                .post('http://localhost:3001/movies', payload.eventInput)
                .then(({ data }) => {
                    return payload.eventInput
                }).catch((err) => {
                    return err
                }),

        insertSerie: (_, payload) => 
            axios
                .post('http://localhost:3002/tv', payload.eventInput)
                .then(({ data }) => {       
                    return payload.eventInput
                }).catch((err) => {
                    return err
                }),

        updateMovie: (_, payload) =>
            axios
                .put(`http://localhost:3001/movies/${payload.eventInput._id}`, {
                    title: payload.eventInput.title,
                    overview: payload.eventInput.overview,
                    poster_path: payload.eventInput.poster_path,
                    popularity: payload.eventInput.popularity,
                    tags: payload.eventInput.tags,
                })
                .then(function ({ data }) {
                    return payload.eventInput
                }).catch((err) => {
                    return err
                }), 

        updateSerie: (_, payload) => 
            axios
                .put(`http://localhost:3002/tv/${payload.eventInput._id}`, {
                    title: payload.eventInput.title,
                    overview: payload.eventInput.overview,
                    poster_path: payload.eventInput.poster_path,
                    popularity: payload.eventInput.popularity,
                    tags: payload.eventInput.tags,
                })
                .then(({ data }) => {
                    return payload.eventInput
                }).catch((err) => {
                    return err
                }),

        deleteMovie: (_, payload) =>
            axios
                .delete(`http://localhost:3001/movies/${payload._id}`)
                .then(({ data }) => {
                    return payload
                }).catch((err) => {
                    return err
                }),

        deleteSerie: (_, payload) =>
            axios
                .delete(`http://localhost:3002/tv/${payload._id}`)
                .then(({ data }) => {
                    return payload
                }).catch((err) => {
                    return err
                })
        
    }
}

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
})

// server.applyMiddleware({app})

server.listen().then(({ url }) => {
    console.log(`🚀 Server up and running on ${url}`);
})

// app.listen({ port: 4000 }, () =>
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
// );