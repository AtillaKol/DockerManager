import React, { Component } from 'react';
import './App.css';

import About from './Components/About/About';
import Header from './Components/Header/Header';

class App extends Component {
  render(){
    return (
      <div>
      	<Header/>
        <About/>
      </div>
    );
  }
}

export default App;
