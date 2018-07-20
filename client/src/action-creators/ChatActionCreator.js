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