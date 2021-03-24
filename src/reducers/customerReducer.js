const customerReducer = (state, action) => {
  switch (action.type) {
    case 'first_name':
      return {
        ...state,
        first_name: action.payload,
      };
    case 'last_name':
      return {
        ...state,
        last_name: action.payload,
      };
    case 'email_address':
      return {
        ...state,
        email_address: action.payload,
      };
    default:
      return state;
  }
};

export default customerReducer;
