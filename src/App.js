
import './App.css'; 

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Details from './Components/Details/Details';

const App = () => {
  return (
  <Switch>
  <Route exact path="/" component={Home} />
  <Route path="/shows/:id" component={Details} />
</Switch>
  );
}

export default App;

