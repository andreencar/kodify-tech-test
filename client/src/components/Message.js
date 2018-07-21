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

class Message extends Component<MessageType, MessageState> {

  countdownInterval : IntervalID;

  componentDidMount () {
    if (this.props.countdownTime) {
      this.countdownInterval = setInterval(this.handleCountdown, 1000);
    }
  }

  componentWillUnmount () {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  handleCountdown = () => {
    if (this.state.counter === 1) {
      clearInterval(this.countdownInterval);
      this.props.onCountdownTimeFinished();
    }
    this.setState(this.decrementCounter);
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
        {this.state.counter && <span className="Message--countdown" >{this.state.counter}</span>}
        {this.props.value}
      </div>
    );
  }
}

export default Message;
