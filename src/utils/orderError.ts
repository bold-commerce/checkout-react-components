import PromiseError from './promiseError';

export default class OrderError extends PromiseError {
  constructor() {
    super('Something went wrong', {
      errors: [
        {
          field: 'order',
          message: 'An error with your order has occurred, please try again',
        },
      ],
    });
  }
}
