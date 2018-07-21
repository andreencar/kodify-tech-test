// @flow
import React, { Component } from 'react';
import '../styles/Chatbox.css';

type ChatboxProps = {
  handleSubmitMesssage : (message : string) => any,
  handleTextChange : Function
}

type ChatboxState = {
  textValue : string
}

class Chatbox extends Component<ChatboxProps> {

  state : ChatboxState = {
    textValue : ""
  }

  handleTextChange = (ev : SyntheticKeyboardEvent<HTMLInputElement>) => {
    const stateToUpdate : ChatboxState = {
      textValue : ev.currentTarget.value
    }; 
    this.setState(stateToUpdate);
    this.props.handleTextChange();
  }

  handleSubmitMessage = () => {
    if (this.props.handleSubmitMessage && this.state.textValue) {
      this.props.handleSubmitMessage(this.state.textValue);
      const stateToUpdate : ChatboxState = {
        textValue : ""
      }; 
      this.setState(stateToUpdate);
    }
  }

  handleKeyPress = (event : SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleSubmitMessage();
    }
  }

  render() {
    return (
      <div className="Chatbox">
        <input type="text" className={"Chatbox--input"} onChange={this.handleTextChange} onKeyPress={this.handleKeyPress} value={this.state.textValue}/>
        <div className="Chatbox--button-wrapper">
          <button className={"Chatbox--button"} onClick={this.handleSubmitMessage}>SEND</button>
        </div>
      </div>
    );
  }
}

export default Chatbox;
