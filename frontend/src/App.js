import React, { Component } from 'react';
import {  BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import About from './Components/About/About';
import allContainers from './Components/allContainers/allContainers';
import runningContainers from './Components/runningContainers/runningContainers';
import Header from './Components/Header/Header';

class App extends Component {
  render(){
    return (
      <Router>
      	<div>
      		<Header/>
          <Route exact path="/" component={allContainers}/>
          <Route path="/runningContainers" component={runningContainers}/>
        	<Route path="/about" component={About}/>
      	</div>
      </Router>
    );
  }
}

export default App;
