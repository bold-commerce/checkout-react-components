export const defaultDiscountState = {
  discount_code: '',
};

export const discountReducer = (state, action) => {
  switch (action.type) {
    case 'setDiscount':
      return {
        ...state, discount_code: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
