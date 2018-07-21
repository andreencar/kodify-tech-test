// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type {ChatState, Message as MessageType} from "./types/types";
import Header from './components/Header';
import Chatbox from './components/Chatbox';
import MessageList from './components/MessageList';
import {handleSubmitMessage, handleMessageReceived} from "./action-creators/ChatActionCreator";

import './App.css';

declare class EventSource extends EventTarget {
  constructor(url: string): EventSource;
}

type AppProps = {
  nickname: string,
  messages : Array<MessageType>,
  handleMessageReceived : Function,
  handleSubmitMessage : (message : string) => any 
}

type AppState = {
  source : EventSource
}

class App extends Component<AppProps, AppState> {

  componentDidMount() {
    var source : EventSource = new EventSource("http://localhost:8080/api/chat/sse");
    this.setState({
      source : source
    });
    source.addEventListener("message_submited", (e : any) => {
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
        <div className="App--MessageList--wrapper" >
          <MessageList messages={this.props.messages} />
        </div>
        <Chatbox handleSubmitMessage={this.props.handleSubmitMessage} />
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

export default connect(mapStateToProps, {handleMessageReceived, handleSubmitMessage})(App);
