import MessageService from "./services/MessageService";
import * as ChatActionTypes from "./actions/ChatActionTypes";
import CommandEnum from './enums/CommandEnum';

import type Message from "./types/types";

describe("When /oops command is received", () => {
    it('should return action to remove last message from user who sent /oops', () => {
        const state = () => {
            return {
                messages : [{
                    messageId : "123",
                    userId : "teste"
                }]
            };
        };
        const message : Message = {
            userId : "teste",
            value : CommandEnum.removemessage
        };
        const result : any = MessageService.ProcessIncomingMessage(message, state);
        expect(result).toBeTruthy();
        expect(result.type).toBe(ChatActionTypes.MESSAGE_REMOVED);
        expect(result.payload).toEqual("123");
    });
});