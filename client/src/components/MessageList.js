// @flow
import React, { Component } from 'react';
import MessageHOC from './HOC/MessageHOC';
import type { Message as MessageType} from '../types/types';
import '../styles/MessageList.css';

type MessageListProps = {
    messages : Array<MessageType>,
    isTyping : boolean
}

class MessageList extends Component<MessageListProps> {
  shouldGoBottom : boolean;
  scrollBottomChatRef : any;
  messageListRef : any;

componentWillUpdate(prevProps : MessageListProps) {
  const isAtBottom = this.messageListRef.scrollHeight - this.messageListRef.scrollTop === this.messageListRef.clientHeight;
  this.shouldGoBottom = prevProps.messages !== this.props.messages || (this.props.isTyping !== prevProps.isTyping && isAtBottom);
}

  componentDidUpdate() {
    if (this.shouldGoBottom) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    this.scrollBottomChatRef.scrollIntoView({behavior: 'smooth'});     
  }

  render() {
    return (
      <div className={"MessageList--wrapper"} ref={(ref) => this.messageListRef = ref}>
        <div className={"MessageList"} >
          { this.props.messages.map((message) => {
            return (<MessageHOC key={message.messageId} {...message}/>);
          })}
          {this.props.isTyping && <MessageHOC isIncoming={true} isLoading={true} />}
          <div ref={(ref) => this.scrollBottomChatRef = ref} />
        </div>
      </div>
    );
  }
}

export default MessageList;
