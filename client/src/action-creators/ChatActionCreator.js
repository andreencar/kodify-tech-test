// @flow
import { Message, ChatState } from '../types/types';
import MessageService from '../services/MessageService';

export function handleSubmitMessage(payload : any) {
    return async (dispatch : any, getState : () => ChatState ) => {
        await MessageService.SubmitMessage(getState().currentUserId, payload);
    };
}

export function handleMessageReceived(message : Message) {
    return (dispatch : any, getState : () => ChatState )  => {
        const actionToDispatch = MessageService.ProcessIncomingMessage(message, getState);
        if (actionToDispatch) {
            dispatch(actionToDispatch);
        }
    }
}