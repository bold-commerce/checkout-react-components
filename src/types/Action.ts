import { ApplicationState } from "./ApplicationState";
import { CheckoutError } from "./CheckoutError";
import { ActionType, ActionErrorType } from "./enums";

export type Action = 
| { 
  type: ActionType.Checkout_Customer_Setting |
   ActionType.Checkout_Customer_Set |
   ActionType.Checkout_ShippingAddress_SetIncomplete |
   ActionType.Checkout_ShippingAddress_Setting |
   ActionType.Checkout_ShippingAddress_Set |
   ActionType.Checkout_BillingAddress_SetIncomplete |
   ActionType.Checkout_BillingAddress_Setting |
   ActionType.Checkout_BillingAddress_Set |
   ActionType.Checkout_ShippingLines_Fetching |
   ActionType.Checkout_ShippingLines_Fetched |
   ActionType.Checkout_ShippingLines_Setting |
   ActionType.Checkout_ShippingLines_Set |
   ActionType.Checkout_LineItem_Setting |
   ActionType.Checkout_LineItem_Set |
   ActionType.Checkout_LineItem_Adding |
   ActionType.Checkout_LineItem_Added |
   ActionType.Checkout_LineItem_Removing |
   ActionType.Checkout_LineItem_Removed |
   ActionType.Checkout_PaymentIframe_Fetching |
   ActionType.Checkout_PaymentIframe_Fetched |
   ActionType.Checkout_PaymentIframe_Authorizing |
   ActionType.Checkout_Discount_Adding |
   ActionType.Checkout_Discount_Added |
   ActionType.Checkout_Discount_Removing |
   ActionType.Checkout_Discount_Removed |
   ActionType.Checkout_Order_Processing |
   ActionType.Checkout_Order_Processed |
   ActionType.Checkout_Order_Set |
   ActionType.Checkout_OrderMetadata_Setting |
   ActionType.Checkout_OrderMetadata_Set 
} 
| {
  type: ActionType.Checkout_Update | ActionType.Checkout_Init,
  payload: ApplicationState
} 
| {
  type: ActionType.Checkout_BillingAddress_SetBillingSameAsShipping,
  payload: boolean
}
| { 
  type: ActionErrorType
  payload: CheckoutError[]
} 