// @flow
import type {ChatState} from "../types/types.js";
import * as ChatActionTypes from "../actions/ChatActionTypes.js";
import generateUUID from 'uuid/v4';

const initialState : ChatState = {
    nickname : "Kodify Tech Test",
    messages : [],
    currentUserId : generateUUID()
}

export default (state : ChatState = initialState, action : any) : ChatState => {
    switch( action.type ) {
        case ChatActionTypes.MESSAGE_RECEIVED: {
            return {...state, messages : [...state.messages, action.payload]};
        }
        default:
            return state;
    }
   
}