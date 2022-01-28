import { CheckoutError } from "../types";
import { ActionErrorType } from "../types/enums";

export default interface ErrorResponse {
  type: ActionErrorType,
  payload: CheckoutError[]
  error: Error
}