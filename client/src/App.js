// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type {ChatState} from "./types/types";
import Header from './components/Header';
import Chatbox from './components/Chatbox';

import './App.css';

type AppProps = {
  nickname: string
}

class App extends Component<AppProps> {


  render() {
    return (
      <div className="App">
        <Header title= {this.props.nickname} />
        <Chatbox />
      </div>
    );
  }
}

function mapStateToProps(state : ChatState) : AppProps {
  return {
    nickname: state.nickname,
  };
}

export default connect(mapStateToProps)(App);
