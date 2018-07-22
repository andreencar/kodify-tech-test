// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type {ChatState, Message as MessageType} from "./types/types";
import Header from './components/Header';
import Chatbox from './components/Chatbox';
import MessageList from './components/MessageList';
import {handleUserStoppedTyping} from './actions/ChatActions';
import {handleSubmitMessage, handleMessageReceived, handleSendTypingMessage, handle} from "./action-creators/ChatActionCreator";

import './App.css';

declare class EventSource extends EventTarget {
  constructor(url: string): EventSource;
}

type AppProps = {
  nickname: string,
  messages : Array<MessageType>,
  isTyping : boolean,
  lastTypingReceivedTimestamp : number,
  lastIncomingMessage : MessageType,
  handleMessageReceived : Function,
  handleSubmitMessage : (message : string) => any,
  handleSendTypingMessage : Function,
  handleUserStoppedTyping : Function
}

class App extends Component<AppProps> {

  source : EventSource;

  stopTypingTimeout : IntervalId;

  componentDidMount() {
    this.source = new EventSource("http://localhost:8080/api/chat/sse");
    this.source.addEventListener("message_submited", (e : any) => {
      if (e.data) {
        var messageObject = JSON.parse(e.data);
        this.props.handleMessageReceived(messageObject);
      }
    });
  }

  componentDidUpdate(prevProps : AppProps) {
    if (this.props.lastTypingReceivedTimestamp !== prevProps.lastTypingReceivedTimestamp) {
      if (this.stopTypingTimeout) {
        clearTimeout(this.stopTypingTimeout);
      } 
      this.stopTypingTimeout = setTimeout(this.stopUserTyping, 4000);
    }
    if (prevProps.lastIncomingMessage !== this.props.lastIncomingMessage) {
      this.props.handleUserStoppedTyping();
    }
  }

  stopUserTyping = () => {
    this.props.handleUserStoppedTyping();
    this.stopTypingTimeout = null;
  }

  componentWillUnmount() {
    this.source.removeEventListener("message_submited");
  }

  render() {
    return (
      <div className="App">
        <Header title= {this.props.nickname} />
        <div className="App--MessageList--wrapper" >
          <MessageList messages={this.props.messages} isTyping={this.props.isTyping}/>
        </div>
        <Chatbox handleSubmitMessage={this.props.handleSubmitMessage} handleTextChange={this.props.handleSendTypingMessage} />
      </div>
    );
  }
}

function mapStateToProps(state : ChatState) : $Shape<AppProps> {
  return {
    nickname: state.nickname,
    messages : state.messages,
    isTyping : state.isTyping,
    lastTypingReceivedTimestamp : state.lastTypingReceivedTimestamp,
    lastIncomingMessage : state.lastIncomingMessage
  };
}

export default connect(mapStateToProps, {handleMessageReceived, handleSubmitMessage, handleSendTypingMessage, handleUserStoppedTyping})(App);
