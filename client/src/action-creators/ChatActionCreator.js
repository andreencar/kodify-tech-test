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

export function handleUserStartedTyping() {
    return async (dispatch : any, getState : () => ChatState ) => {
        const sentTimestamp : number = getState().lastTypingSentTimestamp
        const hasEnoughTimePassed = !(sentTimestamp && new Date().getTime() - sentTimestamp < 5000);
        if (hasEnoughTimePassed) {
            await MessageService.SubmitMessage(getState().currentUserId, "/typing");
        }
    };
}

export function handleOpenNewSite(url : string) {
    return ()  => {
        window.open(url, '_blank');
    }
}