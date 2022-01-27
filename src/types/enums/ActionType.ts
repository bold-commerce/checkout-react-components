export enum ActionType {
  Checkout_Customer_SetErrors = 'checkout/customer/setErrors',
  Checkout_Customer_Setting = 'checkout/customer/setting',
  Checkout_Customer_Set = 'checkout/customer/set',

  Checkout_ShippingAddress_SetErrors = 'checkout/shippingAddress/setErrors',
  Checkout_ShippingAddress_SetIncomplete = 'checkout/shippingAddress/setIncomplete',
  Checkout_ShippingAddress_Setting = 'checkout/shippingAddress/setting',
  Checkout_ShippingAddress_Set = 'checkout/shippingAddress/set',

  Checkout_BillingAddress_SetErrors = 'checkout/billingAddress/setErrors',
  Checkout_BillingAddress_SetIncomplete = 'checkout/billingAddress/setIncomplete',
  Checkout_BillingAddress_Setting = 'checkout/billingAddress/setting',
  Checkout_BillingAddress_Set = 'checkout/billingAddress/set',
  Checkout_BillingAddress_SetBillingSameAsShipping = 'checkout/billingAddress/setBillingSameAsShipping',

  Checkout_ShippingLines_SetErrors = 'checkout/shippingLines/setErrors',
  Checkout_ShippingLines_Fetching = 'checkout/shippingLines/fetching',
  Checkout_ShippingLines_Fetched = 'checkout/shippingLines/fetched',
  Checkout_ShippingLines_Setting = 'checkout/shippingLines/setting',
  Checkout_ShippingLines_Set = 'checkout/shippingLines/set',

  Checkout_LineItem_SetErrors = 'checkout/lineItem/setErrors',
  Checkout_LineItem_Setting = 'checkout/lineItem/setting',
  Checkout_LineItem_Set = 'checkout/lineItem/set',
  Checkout_LineItem_Adding = 'checkout/lineItem/adding',
  Checkout_LineItem_Added = 'checkout/lineItem/added',
  Checkout_LineItem_Removing = 'checkout/lineItem/removing',
  Checkout_LineItem_Removed = 'checkout/lineItem/removed',

  Checkout_PaymentIframe_SetPaymentIframeErrors = 'checkout/paymentIframe/setPaymentIframe',
  Checkout_PaymentIframe_Fetching = 'checkout/paymentIframe/fetching',
  Checkout_PaymentIframe_Fetched = 'checkout/paymentIframe/fetched',
  Checkout_PaymentIframe_Authorizing = 'checkout/paymentIframe/authorizing',
  
  Checkout_Order_SetErrors = 'checkout/order/setErrors',
  Checkout_Order_Set = 'checkout/order/set',
  Checkout_Order_Processing = 'checkout/order/processing',
  Checkout_Order_Processed = 'checkout/order/processed',

  Checkout_Discount_SetErrors = 'checkout/discount/setErrors',
  Checkout_Discount_Adding = 'checkout/discount/adding',
  Checkout_Discount_Added = 'checkout/discount/added',
  Checkout_Discount_Removing = 'checkout/discount/removing',
  Checkout_Discount_Removed = 'checkout/discount/removed',

  Checkout_OrderMetadata_SetErrors = 'checkout/orderMetadata/setErrors',
  Checkout_OrderMetadata_Setting = 'checkout/orderMetadata/setting',
  Checkout_OrderMetadata_Set = 'checkout/orderMetadata/set',

  Checkout_Init = 'checkout/init',
  Checkout_Update = 'checkout/update'
}