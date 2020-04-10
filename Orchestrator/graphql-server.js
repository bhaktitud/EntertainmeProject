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
                    // console.log('tv series', data)
                    return data
                }).catch((err) => {
                    console.log(err)
                }),
    }
}


const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

server.listen().then(({ url }) => {
    console.log(`Server up and running on ${url}`);
})