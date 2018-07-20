// @flow

import React, { Component } from 'react';
import '../styles/Chatbox.css';

type ChatboxProps = {
  handleSubmitMesssage : (message : string) => any
}

class Chatbox extends Component<ChatboxProps> {

  render() {
    return (
      <div className="Chatbox">
        <input type="text" className={"Chatbox--input"} />
        <button className={"Chatbox--button"}>SEND</button>
      </div>
    );
  }
}

export default Chatbox;
