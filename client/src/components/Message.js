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
  countdownTime : number;
  timestamp : number;
  onCountdownTimeFinished : Function
}

type MessageState = {
  counter : ?number;
}

class Message extends Component<MessageType> {

  countdownInterval : IntervalID;

  componentDidMount () {
    if (this.props.countdownTime) {
      this.countdownInterval = setInterval(
        () => this.setState(this.decrementCounter),
        1000
      );
    }
  }

  componentWillUnmount () {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  decrementCounter = (prevState : any) : $Shape<MessageState> => {
    var result : $Shape<MessageState> = {};
    if (prevState.counter) {
      result = {
        counter : prevState.counter - 1
      };
    }
    return result;
  }

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
        {this.props.value}
      </div>
    );
  }
}

export default Message;
