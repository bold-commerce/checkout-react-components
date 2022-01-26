export default class PromiseError extends Error {
  body: Object;

  constructor(message: string, body: Object) {
    super(message);
    this.body = body;
  }
}
