// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import '../styles/Message.css';

type MessageType = {
  value : string;
  userId : string;
  messageId : string;
  isThink : ?boolean;
  isHighlight: ?boolean;
  isIncoming : ?boolean;
  isFade : ?boolean;
  isLoading : ?boolean;
  counter : ?number;
  timestamp : number;
}

class Message extends Component<MessageType> {

  render() {
    const messageClass = classNames({
      Message: true,
      'Message--mine': !this.props.isIncoming,
      'Message--theirs': this.props.isIncoming,
      'Message--think': this.props.isThink,
      'Message--highlight' : this.props.isHighlight,
      'Message--fade': this.props.isFade
    });

    return (
      <div className={messageClass}>
        {this.props.counter && <span className="Message--countdown" >{this.props.counter}</span>}
        {this.props.value}
        {this.props.isLoading && <div className="Message--loading" />}
      </div>
    );
  }
}

export default Message;
