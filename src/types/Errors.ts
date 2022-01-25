import { Error } from "./Error";

export interface Errors {
  customer: Error | null,
  shippingAddress: Error | null,
  billingAddress: Error | null,
  shippingLines: Error | null,
  lineItems: Error | null,
  orderMetadata: Error | null,
  discount: Error | null,
  paymentIframe: Error | null,
  order: Error | null
};