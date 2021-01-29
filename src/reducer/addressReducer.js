export const defaultAddressState = {
  first_name: '',
  last_name: '',
  address_line_1: '',
  address_line_2: '',
  city: '',
  country: '',
  province: '',
  country_code: '',
  province_code: '',
  postal_code: '',
  business_name: '',
  phone_number: '',
};

export const addressReducer = (state, action) => {
  switch (action.type) {
    case 'setFirstName':
      return { ...state, first_name: action.payload };
    case 'setLastName':
      return { ...state, last_name: action.payload };
    case 'setAddressLine1':
      return { ...state, address_line_1: action.payload };
    case 'setAddressLine2':
      return { ...state, address_line_2: action.payload };
    case 'setCity':
      return { ...state, city: action.payload };
    case 'setCountry':
      return { ...state, country_code: action.payload };
    case 'setProvince':
      return { ...state, province_code: action.payload };
    case 'setPostalCode':
      return { ...state, postal_code: action.payload };
    case 'setBusinessName':
      return { ...state, business_name: action.payload };
    case 'setPhoneNumber':
      return { ...state, phone_number: action.payload };
    case 'updateAddress':
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};
