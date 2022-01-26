export default class PromiseError extends Error {
  body: any;

  constructor(message: string, body: any) {
    super(message);
    this.body = body;
  }
}
