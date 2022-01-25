export interface LoadingStatus {
  customer: string,
  shippingAddress: string,
  billingAddress: string,
  shippingLines: string,
  paymentIframe: string,
  lineItems: string,
  discount: string,
  orderMetadata: string,
  isLoading: boolean
}