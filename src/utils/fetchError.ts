import PromiseError from "./promiseError";

export default class FetchError extends PromiseError {
  status: number;
  
  constructor(status: number, message: string, body: any) {
    super(message, body);
    this.status = status;
  }
}
