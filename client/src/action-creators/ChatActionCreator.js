// @flow
import { Message, ChatState } from '../types/types';
import { handleNicknameReceived, handleDisplayMessage } from '../actions/ChatActions';
import generateUUID from 'uuid/v4';

export function handleSubmitMessage(payload : any) {
    return async (dispatch : any, getState : () => ChatState ) => {
        const messageToSubmit : Message = {
            messageId : generateUUID(),
            userId : getState().currentUserId,
            value : payload
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
    };
}

export function handleMessageReceived(message : Message) {
    return (dispatch : any, getState : () => ChatState )  => {
        if (message.value) {
            const isCommand : boolean = message.value.charAt(0) === "/";
            if (isCommand) {
                const commandArgs = message.value.split(" ");
                const commandName = commandArgs[0].substring(1);
                const stringAfterCommand = message.value.substr(message.value.indexOf(' ')+1);
                switch (commandName) {
                    case "nick": {
                        if (getState().currentUserId !== message.userId) {
                            dispatch(handleNicknameReceived(stringAfterCommand));
                        }
                    }
                    break;
                    case "think": {
                        const messageWithThink = {...message, value: stringAfterCommand, isThink : true}
                        dispatch(handleDisplayMessage(messageWithThink));
                    }
                    break;
                    default:
                        dispatch(handleDisplayMessage(message))
                        // TO IMPLEMENT
                }
            }
        }
    }
}