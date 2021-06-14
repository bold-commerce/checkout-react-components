const csrfReducer = (state, action) => {
  switch (action.type) {
    case 'checkout/init':
      return action.payload;
    default:
      return state;
  }
};

export default csrfReducer;
