export type Message = {
    value : string;
    userId : string;
    messageId : string;
    isThink : ?boolean;
    isHighlight: ?boolean;
    isIncoming : ?boolean;
    isFade : ?boolean;
    countdownTime : number;
    timestamp : number;
}

export type ChatState = {
    nickname : string,
    messages : Array<Message>,
    currentUserId : string,
    lastTypingSentTimestamp : number,
    isTyping : boolean
}