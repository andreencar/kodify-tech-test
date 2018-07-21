// @flow
import React, { Component } from 'react';
import type { Message as MessageType } from '../types/types';
import '../styles/Message.css';

class Message extends Component<MessageType> {

  render() {
    return (
      <div className="Message">
        {this.props.userId} {this.props.value}
      </div>
    );
  }
}

export default Message;
