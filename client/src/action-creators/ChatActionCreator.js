// @flow
import { Message, ChatState } from '../types/types';
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

export function handleReceiveMessage(message : Message) {
    return (dispatch : any, getState : () => ChatState )  => {
        if (message.value) {
            const isCommand : boolean = message.value.charAt(0) === "/";
            if (isCommand) {
                const commandArgs = message.split(" ");
                const commandName = commandArgs[0].substring(1);
            }
        }
    }
}