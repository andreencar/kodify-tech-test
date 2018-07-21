export type Message = {
    value : string;
    userId : string;
    messageId : string;
    isThink : ?boolean;
    timestamp : number;
}

export type ChatState = {
    nickname : string,
    messages : Array<Message>,
    currentUserId : string
}