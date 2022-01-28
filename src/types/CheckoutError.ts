export interface CheckoutError {
  message: string,
  type?: string,
  field: string,
  severity?: string,
  sub_type?: string
};