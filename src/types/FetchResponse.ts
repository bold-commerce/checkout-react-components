import { FetchError } from "../utils";

export interface FetchResponse {
  success: boolean,
  data?: any,
  error?: FetchError
}