export class Message {
  private time: Date;

  constructor(private from: string, private text: string, private fromSelf: boolean = false) {
    this.time = new Date();
  }
}
