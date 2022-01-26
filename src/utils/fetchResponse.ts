import { FetchError } from ".";

export interface FetchResponse {
  success: boolean,
  data?: any,
  error?: FetchError
}