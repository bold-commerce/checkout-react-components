import { PromiseError } from ".";

export default class FetchError extends PromiseError {
  status: number;
  
  constructor(status: number, message: string, body: any) {
    super(message, body);
    this.status = status;
  }
}
