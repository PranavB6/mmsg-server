import { Message } from "./message.model";

export class User {
    constructor(public name: string, public room: string, public id: string) {}

    createMsg(text: string): Message {
        return new Message(this.name, text);
    }
}
