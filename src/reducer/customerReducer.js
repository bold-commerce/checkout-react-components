export const defaultCustomerState = {
  first_name: '',
  last_name: '',
  email_address: '',
};

export const customerReducer = (state, action) => {
  switch (action.type) {
    case 'setFirstName':
      return { ...state, first_name: action.payload };
    case 'setLastName':
      return { ...state, last_name: action.payload };
    case 'setEmail':
      return { ...state, email_address: action.payload };
    case 'updateCustomer':
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};
