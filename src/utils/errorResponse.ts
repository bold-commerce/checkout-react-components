export default interface ErrorResponse {
  type: string,
  payload: any
  error: Error
}