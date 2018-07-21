// @flow
import _ from 'lodash';
import generateUUID from 'uuid/v4';

import { handleNicknameReceived, handleDisplayMessage, handleRemoveMessage } from '../actions/ChatActions';

import { Message, ChatState } from '../types/types';

class MessageService {
    ProcessIncomingMessage = (receivedMessage : Message, getState : () => ChatState  ) => {
        if (receivedMessage.value) {
            const message = {...receivedMessage, isIncoming: getState().currentUserId !== receivedMessage.userId};
            const isCommand : boolean = message.value.charAt(0) === "/";
            if (isCommand) {
                const commandArgs = message.value.split(" ");
                const commandName = commandArgs[0].substring(1);
                const stringAfterCommand = message.value.substr(message.value.indexOf(' ')+1);
                switch (commandName) {
                    case "nick": {
                        if (getState().currentUserId !== message.userId && commandArgs.length > 1) {
                            return handleNicknameReceived(stringAfterCommand);
                        }
                    }
                    break;
                    case "think": {
                        if (commandArgs.length > 1) {
                            const messageWithThink = {...message, value: stringAfterCommand, isThink : true}
                            return handleDisplayMessage(messageWithThink);
                        }
                    }
                    break;
                    case "oops": {
                        const orderedMessages = _.orderBy(getState().messages, ['timestamp'],['asc']);
                        const messageToRemove = _.findLast(orderedMessages, (msg) => { return msg.userId === message.userId});
                        if (messageToRemove) {
                            return handleRemoveMessage(messageToRemove.messageId);
                        }
                    }
                    break;
                    case "highlight": {
                        if (commandArgs.length > 1) {
                            const messageWithHighlight = {...message, value: stringAfterCommand, isHighlight : true}
                            return handleDisplayMessage(messageWithHighlight);
                        }
                    }
                    break;
                    default:
                    return handleDisplayMessage(message);
                }
            } else {
                return handleDisplayMessage(message);
            }
        }
    }
    
    SubmitMessage = async (userId : string, message : string) => {
        const messageToSubmit : Message = {
            messageId : generateUUID(),
            userId : userId,
            value : message,
            timestamp : new Date().getTime()
        };
        await fetch("http://localhost:8080/api/chat", {
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body : JSON.stringify({
                message : messageToSubmit
            })
        });
    }
}

const messageService = new MessageService();
export default messageService;