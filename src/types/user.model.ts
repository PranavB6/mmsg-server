import { Message } from "./message.model";

export class User {
  constructor(public name: string, public room: string, public id: string) {}

  createMsg(text: string) {
    return {
      username: this.name,
      text,
      date: new Date(),
    };
  }
}
