// @flow
import type {ChatState} from "../types/types.js";
import * as ChatActionTypes from "../actions/ChatActionTypes.js";
import generateUUID from 'uuid/v4';

const initialState : ChatState = {
    nickname : "Kodify Tech Test",
    messages : [],
    currentUserId : generateUUID(),
    lastTypingSentTimestamp : null,
    lastTypingReceivedTimestamp : null,
    lastIncomingMessage : null,
    isTyping : false
}

export default (state : ChatState = initialState, action : any) : ChatState => {
    switch( action.type ) {
        case ChatActionTypes.MESSAGE_RECEIVED: {
            const lastIncomingMessage = action.payload.userId === state.currentUserId ? state.lastIncomingMessage : action.payload;
            return {...state, messages : [...state.messages, action.payload], lastIncomingMessage: lastIncomingMessage};
        }
        case ChatActionTypes.NICKNAME_SET: {
            return {...state, nickname : action.payload};
        }
        case ChatActionTypes.MESSAGE_REMOVED: {
            return {...state, messages : state.messages.filter((message) => { return message.messageId !== action.payload})}
        }
        case ChatActionTypes.MESSAGE_UPDATED: {
            return {...state, messages : state.messages.map((message) => { return message.messageId !== action.payload.messageId ? message : action.payload})}
        }
        case ChatActionTypes.TYPING_STARTED_MESSAGE_SENT: {
            return {...state, lastTypingSentTimestamp: action.payload};
        }
        case ChatActionTypes.USER_STARTED_TYPING: {
            return {...state, isTyping: true, lastTypingReceivedTimestamp: new Date().getTime()};
        }
        case ChatActionTypes.USER_STOPPED_TYPING: {
            return {...state, isTyping : false};
        }
        default:
            return state;
    }
}