// @flow
export function handleSubmitMessage(payload : any) {
    return async () => {
        await fetch("http://localhost:8080/api/chat"), {
            method : "POST",
            body : JSON.stringify({
                message : payload
            })
        }
    };
}