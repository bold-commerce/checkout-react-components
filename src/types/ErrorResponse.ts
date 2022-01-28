import { CheckoutError } from "./CheckoutError";
import { ActionErrorType } from "./enums";

export interface ErrorResponse {
  type: ActionErrorType,
  payload: CheckoutError[]
  error: Error
}