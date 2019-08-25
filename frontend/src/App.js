import React, { Component } from 'react';
import {  BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import About from './Components/About/About';
import Header from './Components/Header/Header';

class App extends Component {
  render(){
    return (
      <Router>
      	<div>
      		<Header/>
        	<About/>
      	</div>
      </Router>
    );
  }
}

export default App;
