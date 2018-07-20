export type Message = {
    value : string;
    userId : string;
    messageId : string;
}

export type ChatState = {
    nickname : string,
    messages : Array<Message>,
    currentUserId : string
}