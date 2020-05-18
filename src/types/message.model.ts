export class Message {
  private time: Date;

  constructor(private from: string, private text: string) {
    this.time = new Date();
  }
}
