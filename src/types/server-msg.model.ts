import { Message } from "./message.model";

const SERVER_NAME = "MM";

export class ServerMsg {
    constructor() {}

    create(text: string): Message {
        return new Message(SERVER_NAME, text);
    }
}
