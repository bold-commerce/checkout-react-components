const errorsReducer = (state, action) => {
  switch (action.type) {
    // Customer Actions
    case 'checkout/customer/setErrors':
      return {
        ...state,
        customer: action.payload.reduce((errors, error) => ({ ...errors, [error.field]: error.message }), {}),
      };
    case 'checkout/customer/set':
      return {
        ...state,
        customer: null,
      };

    // Shipping Address Actions
    case 'checkout/shippingAddress/setErrors':
      return {
        ...state,
        shippingAddress: action.payload.reduce((errors, error) => ({ ...errors, [error.field]: error.message }), {}),
      };
    case 'checkout/shippingAddress/set':
      return {
        ...state,
        shippingAddress: null,
      };

    // Billing Address Actions
    case 'checkout/billingAddress/setErrors':
      return {
        ...state,
        billingAddress: action.payload.reduce((errors, error) => ({ ...errors, [error.field]: error.message }), {}),
      };
    case 'checkout/billingAddress/set':
      return {
        ...state,
        billingAddress: null,
      };

    // Payment Iframe Actions
    case 'checkout/paymentIframe/setPaymentIframeErrors':
      return {
        ...state,
        paymentIframe: action.payload.reduce((errors, error) => ({ ...errors, [error.field]: error.message }), {}),
      };

    // Discount Actions
    case 'checkout/discount/setErrors':
      return {
        ...state,
        discount: action.payload.reduce((errors, error) => ({ ...errors, [error.field]: error.message }), {}),
      };
    case 'checkout/discount/added':
      return {
        ...state,
        discount: null,
      };
    case 'checkout/discount/removed':
      return {
        ...state,
        discount: null,
      };

    default:
      return state;
  }
};

export default errorsReducer;
