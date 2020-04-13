import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './App.css';
import MovieList  from './components/MovieList';
import SeriesList from './components/SeriesList';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


const client = new ApolloClient({
  uri: 'http://localhost:4000'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/movies'>
            <MovieList />
          </Route>
          <Route path='/series'>
            <SeriesList />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>  
  );
}

export default App;
