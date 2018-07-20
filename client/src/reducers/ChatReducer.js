// @flow
import type {ChatState} from "../types/types.js";
import generateUUID from 'uuid/v4';

const initialState : ChatState = {
    nickname : "Kodify Tech Test",
    messages : [],
    currentUserId : generateUUID()
}

export default (state : ChatState = initialState, action : any) => {

}