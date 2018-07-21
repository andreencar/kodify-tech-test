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

export function handleSendTypingMessage() {
    return async (dispatch : any, getState : () => ChatState ) => {
        const sentTimestamp : number = getState().lastTypingSentTimestamp;
        const userId : string = getState().currentUserId;
        const actionToDispatch = await MessageService.SubmitTypingStarted(userId, sentTimestamp);
        if (actionToDispatch) {
            dispatch(actionToDispatch);
        }
    };
}

export function handleOpenNewSite(url : string) {
    return ()  => {
        window.open(url, '_blank');
    }
}