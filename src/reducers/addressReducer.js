const addressReducer = (state, action) => {
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
    case 'business_name':
      return {
        ...state,
        business_name: action.payload,
      };
    case 'address_line_1':
      return {
        ...state,
        address_line_1: action.payload,
      };
    case 'city':
      return {
        ...state,
        city: action.payload,
      };
    case 'phone_number':
      return {
        ...state,
        phone_number: action.payload,
      };
    case 'country_code':
      return {
        ...state,
        country_code: action.payload,
      };
    case 'province_code':
      return {
        ...state,
        province_code: action.payload,
      };
    case 'postal_code':
      return {
        ...state,
        postal_code: action.payload,
      };
    default:
      return state;
  }
};

export default addressReducer;
