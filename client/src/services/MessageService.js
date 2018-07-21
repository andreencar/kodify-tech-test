// @flow
import _ from 'lodash';
import generateUUID from 'uuid/v4';
import emoji from "emoji-dictionary";

import { handleNicknameReceived, handleDisplayMessage, handleRemoveMessage, handleUpdateMessage } from '../actions/ChatActions';

import { Message, ChatState } from '../types/types';

class MessageService {
    ProcessIncomingMessage = (receivedMessage : Message, getState : () => ChatState  ) => {
        if (receivedMessage.value) {
            const emojiValue : string = this.ProcessEmoji(receivedMessage.value);
            const isIncoming : boolean = getState().currentUserId !== receivedMessage.userId;
            const message = {...receivedMessage, value : emojiValue , isIncoming : isIncoming};
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
                        const messageToRemove = this.GetLastMessageFromUser(getState().messages, message.userId);
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
                    case "fadelast": {
                        const messageToFade = this.GetLastMessageFromUser(getState().messages, message.userId);
                        if (messageToFade) {
                            const messageWithFade = {...messageToFade, isFade : true};
                            return handleUpdateMessage(messageWithFade);
                        }
                    }
                    break;
                    case "countdown": {
                        if (commandArgs.length > 2) {
                            const countdownMessage = {...message, value: commandArgs[2], countdownTimer : commandArgs[1]}
                            return handleDisplayMessage(countdownMessage);
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

    GetLastMessageFromUser = (messages : Array<Message>, userId : string) : Message => {
        const orderedMessages = _.orderBy(messages, ['timestamp'],['asc']);
        const lastUserMessage = _.findLast(orderedMessages, (msg) => { return msg.userId === userId});
        return lastUserMessage;
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

    ProcessEmoji = (messageValue : string) => {
        return messageValue.replace(/\(([^\)]+)\)/g, (match, name) => {
            const unicode = emoji.getUnicode(name);
            if (unicode) {
                return unicode;
            } else {
                return match;
            }
        });
    }
}

const messageService = new MessageService();
export default messageService;