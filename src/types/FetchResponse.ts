import { FetchError } from "../utils";

export interface FetchResponse<T> {
  success: boolean,
  data?: T,
  error?: FetchError
}