// @flow
import * as ChatActionTypes from './ChatActionTypes';
import type {Message} from '../types/types';

export const handleDisplayMessage = (payload : Message) => {
    return {
        type : ChatActionTypes.MESSAGE_RECEIVED,
        payload: payload
      };
  }

  export const handleNicknameReceived = (nickname : string) => {
      return {
          type : ChatActionTypes.NICKNAME_SET,
          payload : nickname
      }
  }