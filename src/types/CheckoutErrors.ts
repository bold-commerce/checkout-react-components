import { CheckoutError } from "./CheckoutError";

export interface CheckoutErrors {
  customer: CheckoutError[] | null,
  shippingAddress: CheckoutError[] | null,
  billingAddress: CheckoutError[] | null,
  shippingLines: CheckoutError[] | null,
  lineItems: CheckoutError[] | null,
  orderMetadata: CheckoutError[] | null,
  discount: CheckoutError[] | null,
  paymentIframe: CheckoutError[] | null,
  order: CheckoutError[] | null
};