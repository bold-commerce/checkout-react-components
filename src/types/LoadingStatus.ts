import { LoadingState } from "./enums/LoadingState";

export interface LoadingStatus {
  customer: LoadingState,
  shippingAddress: LoadingState,
  billingAddress: LoadingState,
  shippingLines: LoadingState,
  paymentIframe: LoadingState,
  lineItems: LoadingState,
  discount: LoadingState,
  orderMetadata: LoadingState,
  isLoading: boolean
};