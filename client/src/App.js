import React, { Component } from 'react';
import Header from './components/Header';
import Chatbox from './components/Chatbox';

import './App.css';

class App extends Component {

  componentDidMount () {
    
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Chatbox />
      </div>
    );
  }
}

export default App;
