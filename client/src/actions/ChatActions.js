// @flow
import * as ChatActionTypes from './ChatActionTypes';
import type {Message} from '../types/types';

export const addNewMessage = (payload : Message) => {
    return {
        type : ChatActionTypes.MESSAGE_RECEIVED,
        payload: payload
      };
  }