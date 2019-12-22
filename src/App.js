import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home'
import Movies from './components/Movies'
import Tv from './components/Tv'
import Person from './components/Person'
import Details from './components/Details';
import PersonDetails from './components/PersonDetails';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id/" component={Details} exact />
        <Route path="/movie/" component={Movies} exact />
        <Route path="/tv/:id/" component={Details} exact />
        <Route path="/tv/" component={Tv} exact />
        <Route path="/person/" component={Person} exact />
        <Route path="/person/:id/" component={PersonDetails} exact />
      </div>
    </BrowserRouter>
  );
}

export default App;
