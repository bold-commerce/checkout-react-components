import { useCallback, useContext, useMemo } from 'react';
import { CheckoutStore } from '../store';
import { updateCustomer, validateCustomer } from '../api';

const useCustomer = () => {
  const { state, dispatch } = useContext(CheckoutStore);
  const { csrf, apiPath } = state;
  const { customer } = state.applicationState;
  const customerErrors = state.errors.customer;
  const { isAuthenticated } = state;
  const emailAddress = customer?.email_address;
  const firstName = customer?.first_name;
  const lastName = customer?.last_name;

  const memoizedCustomer = useMemo(() => customer, [emailAddress, firstName, lastName]);
  const memoizedCustomerErrors = useMemo(() => customerErrors, [JSON.stringify(customerErrors)]);

  const submitCustomer = useCallback(async (customerData) => {
    if (!customerData.email_address) return Promise.resolve();
    const appCustomer = JSON.stringify({ ...customer });
    const localCustomer = JSON.stringify({
      ...customer,
      ...customerData,
    });

    // Prevent customer from being resubmitted with same data
    if (appCustomer === localCustomer) {
      return Promise.resolve();
    }

    const validationData = await validateCustomer(csrf, apiPath, customerData);
    dispatch({
      type: 'checkout/customer/setting',
    });

    if (validationData.errors) {
      dispatch({
        type: 'checkout/customer/setErrors',
        payload: validationData.errors,
      });
      return Promise.reject(new Error('Invalid customer'));
    }

    const method = memoizedCustomer.email_address ? 'PUT' : 'POST';
    const customerResponse = await updateCustomer(csrf, apiPath, customerData, method);
    dispatch({
      type: 'checkout/customer/set',
      payload: customerResponse.data.customer,
    });

    return dispatch({
      type: 'checkout/update',
      payload: customerResponse.data.application_state,
    });
  }, [memoizedCustomer, csrf, apiPath]);

  return {
    customer: memoizedCustomer,
    customerErrors: memoizedCustomerErrors,
    isAuthenticated,
    submitCustomer,
  };
};

export default useCustomer;
