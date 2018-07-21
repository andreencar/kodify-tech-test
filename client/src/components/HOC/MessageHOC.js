// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from "../Message";
import { handleOpenNewSite as onCountdownTimeFinished} from "../../action-creators/ChatActionCreator";

type MessageHOCType = {
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

class MessageHOC extends Component<MessageHOCType, MessageState> {

  state = {
      counter : null
  }

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
    return (
        <Message {...{...this.props, counter : this.state.counter}} />
    );
  }
}

export default connect(null, {onCountdownTimeFinished})(MessageHOC);
