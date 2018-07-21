// @flow
import React, { Component } from 'react';
import type { Message as MessageType } from '../types/types';
import classNames from 'classnames';
import '../styles/Message.css';

class Message extends Component<MessageType> {

  render() {
    const messageClass = classNames({
      Message: true,
      'Message--mine': !this.props.isIncoming,
      'Message--theirs': this.props.isIncoming
    });

    return (
      <div className={messageClass}>
        {this.props.userId} {this.props.value}
      </div>
    );
  }
}

export default Message;
