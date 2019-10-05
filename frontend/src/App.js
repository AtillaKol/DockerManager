import React, { Component } from 'react';
import {  BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import About from './Components/About/About';
import AllContainers from './Components/allContainers/allContainers';
import Configuration from './Components/Configuration/Configuration';
import DetailView from './Components/DetailView/DetailView';
import Header from './Components/Header/Header';
import RunningContainers from './Components/runningContainers/runningContainers';

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
          <Route path="/detailedView" component={DetailView}/>
      	</div>
      </Router>
    );
  }
}

export default App;
