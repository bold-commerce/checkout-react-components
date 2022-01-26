import { FetchError } from ".";

export default interface FetchResponse {
  success: boolean,
  data?: any,
  error?: FetchError
}