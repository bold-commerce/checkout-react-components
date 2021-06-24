import {
  useCallback, useContext, useMemo,
} from 'react';
import { CheckoutStore } from '../store';
import { updateCustomer, validateCustomer } from '../api';

const emptyCustomer = {
  first_name: null,
  last_name: null,
  email_address: null,
};

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
    if (!customerData.email_address) {
      dispatch({
        type: 'checkout/customer/setErrors',
        payload: [{
          field: 'email',
          message: 'Email address is required',
        }],
      });
      return Promise.reject();
    }

    const appCustomer = JSON.stringify({
      first_name: memoizedCustomer.first_name,
      last_name: memoizedCustomer.last_name,
      email_address: memoizedCustomer.email_address,
    });
    const localCustomer = JSON.stringify({
      ...emptyCustomer,
      ...customerData,
    });

    // Prevent customer from being resubmitted with same data
    if (appCustomer === localCustomer) {
      return Promise.resolve();
    }

    try {
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
    } catch (e) {
      dispatch({
        type: 'checkout/customer/setErrors',
        payload: [{
          field: 'order',
          message: e.message,
        }],
      });
      return Promise.reject(e);
    }

    const method = memoizedCustomer.email_address ? 'PUT' : 'POST';
    try {
      const customerResponse = await updateCustomer(csrf, apiPath, customerData, method);
      dispatch({
        type: 'checkout/customer/set',
        payload: customerResponse.data.customer,
      });

      return dispatch({
        type: 'checkout/update',
        payload: customerResponse.data.application_state,
      });
    } catch (e) {
      dispatch({
        type: 'checkout/customer/setErrors',
        payload: [{
          field: 'order',
          message: e.message,
        }],
      });
      return Promise.reject(e);
    }
  }, [memoizedCustomer, csrf, apiPath]);

  return {
    customer: memoizedCustomer,
    customerErrors: memoizedCustomerErrors,
    isAuthenticated,
    submitCustomer,
  };
};

export default useCustomer;
