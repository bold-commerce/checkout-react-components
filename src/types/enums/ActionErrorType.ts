export enum ActionErrorType {

  Checkout_Customer_SetErrors = 'checkout/customer/setErrors',
  Checkout_ShippingAddress_SetErrors = 'checkout/shippingAddress/setErrors',
  Checkout_BillingAddress_SetErrors = 'checkout/billingAddress/setErrors',
  Checkout_ShippingLines_SetErrors = 'checkout/shippingLines/setErrors',
  Checkout_LineItem_SetErrors = 'checkout/lineItem/setErrors',
  Checkout_PaymentIframe_SetPaymentIframeErrors = 'checkout/paymentIframe/setPaymentIframe',
  Checkout_Order_SetErrors = 'checkout/order/setErrors',
  Checkout_Discount_SetErrors = 'checkout/discount/setErrors',
  Checkout_OrderMetadata_SetErrors = 'checkout/orderMetadata/setErrors',
  Checkout_Taxes_SetErrors = 'checkout/taxes/setErrors',
}