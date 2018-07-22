// @flow
import * as ChatActionTypes from './ChatActionTypes';
import type {Message} from '../types/types';

export const handleDisplayMessage = (payload : Message) => {
    return {
        type : ChatActionTypes.MESSAGE_RECEIVED,
        payload: payload
    };
}

export const handleUpdateMessage = (message : Message) => {
    return {
        type : ChatActionTypes.MESSAGE_UPDATED,
        payload : message
    };
}

export const handleNicknameReceived = (nickname : string) => {
    return {
        type : ChatActionTypes.NICKNAME_SET,
        payload : nickname
    };
}

export const handleRemoveMessage = (messageId : string) => {
    return {
        type : ChatActionTypes.MESSAGE_REMOVED,
        payload : messageId
    } ;  
}

export const handleUserStartedTyping = () => {
    return {
        type : ChatActionTypes.USER_STARTED_TYPING
    } ;  
}

export const handleMessageTypingSent = () => {
    return {
        type : ChatActionTypes.TYPING_STARTED_MESSAGE_SENT,
        payload : new Date().getTime()
    } ;  
}

export const handleUserStoppedTyping = () => {
    return {
        type : ChatActionTypes.USER_STOPPED_TYPING
    } ;  
}


