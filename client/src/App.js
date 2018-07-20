// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type {ChatState, Message} from "./types/types";
import Header from './components/Header';
import Chatbox from './components/Chatbox';
import {handleMessageReceived} from "./actions/ChatActions";

import './App.css';

type AppProps = {
  nickname: string,
  messages : Array<Message>,
  handleMessageReceived : Function
}

class App extends Component<AppProps> {

  componentDidMount() {
    var source : EventSource = new EventSource("http://localhost:8080/api/chat/sse");
    this.setState(source);
    source.addEventListener("message_submited", (e) => {
      if (e.data) {
        var messageObject = JSON.parse(e.data);
        this.props.handleMessageReceived(messageObject);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Header title= {this.props.nickname} />
        { this.props.messages.map((message) => {
          return (<div key={message.messageId}>{message.value}</div>);
        })}
        <Chatbox />
      </div>
    );
  }
}

function mapStateToProps(state : ChatState) : $Shape<AppProps> {
  return {
    nickname: state.nickname,
    messages : state.messages
  };
}

export default connect(mapStateToProps, {handleMessageReceived})(App);
