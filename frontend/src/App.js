import React, { Component } from 'react';
import {  BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import About from './Components/About/About';
import AllContainers from './Components/allContainers/allContainers';
import RunningContainers from './Components/runningContainers/runningContainers';
import Configuration from './Components/Configuration/Configuration';
import Header from './Components/Header/Header';

class App extends Component {

  render() {
    return (
      <Router>
      	<div>
      		<Header/>
          <Route exact path="/" component={AllContainers}/>
          <Route path="/runningContainers" component={RunningContainers}/>
          <Route path="/configuration" component={Configuration}/>
        	<Route path="/about" component={About}/>
      	</div>
      </Router>
    );
  }
}

export default App;
