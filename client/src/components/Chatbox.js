// @flow
import React, { Component } from 'react';
import '../styles/Chatbox.css';

type ChatboxProps = {
  handleSubmitMesssage : (message : string) => any
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

  render() {
    return (
      <div className="Chatbox">
        <input type="text" className={"Chatbox--input"} onChange={this.handleTextChange} value={this.state.textValue}/>
        <div className="Chatbox--button-wrapper">
          <button className={"Chatbox--button"} onClick={this.handleSubmitMessage}>SEND</button>
        </div>
      </div>
    );
  }
}

export default Chatbox;
