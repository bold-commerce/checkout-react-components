import React, { useCallback, useReducer } from 'react';
import useCustomer from '../../hooks/useCustomer';
import customerReducer from '../../reducers/customerReducer';

const withCustomerLogic = (Component) => {
  const WithCustomerLogic = (props) => {
    const {
      customer, customerErrors, submitCustomer, isAuthenticated,
    } = useCustomer();

    const [customerInfo, dispatch] = useReducer(customerReducer, customer);

    const handleSubmit = useCallback(() => {
      submitCustomer(customerInfo);
    }, [submitCustomer, customerInfo]);

    const updatedProps = {
      ...props,
      customer: customerInfo,
      isAuthenticated,
      dispatch,
      errors: customerErrors,
      submit: handleSubmit,
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...updatedProps} />;
  };

  return WithCustomerLogic;
};

export default withCustomerLogic;
