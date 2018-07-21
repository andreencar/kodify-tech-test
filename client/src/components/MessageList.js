// @flow
import React, { Component } from 'react';
import MessageHOC from './HOC/MessageHOC';
import type { Message as MessageType} from '../types/types';
import '../styles/MessageList.css';


type MessageListProps = {
    messages : Array<MessageType>,
}

class MessageList extends Component<MessageListProps> {

  render() {
    return (
      <div className={"MessageList"}>
        { this.props.messages.map((message) => {
          return (<MessageHOC key={message.messageId} {...message}/>);
        })}
      </div>
    );
  }
}

export default MessageList;
