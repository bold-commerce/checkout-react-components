import {
  useState, useContext, useCallback,
} from 'react';
import CheckoutContext from '../components/Context';

const useCustomer = () => {
  const {
    apiPath, csrf, setApplicationState, customer, isAuthenticated,
  } = useContext(CheckoutContext);
  const [customerErrors, setCustomerErrors] = useState();
  const [loadingCustomer, setLoadingCustomer] = useState(false);

  const validateCustomer = useCallback((data) => fetch(`${apiPath}/validate_email_address?email_address=${data.email_address}`, {
    mode: 'cors',
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      if (Array.isArray(response.errors)) {
        return response.errors;
      }
      return null;
    }), [csrf]);

  const updateCustomer = useCallback((data) => {
    const method = customer.email_address ? 'PUT' : 'POST';

    fetch(`${apiPath}/customer/guest`, {
      mode: 'cors',
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrf,
      },
      body: JSON.stringify({
        ...data,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setApplicationState(response.data.application_state);
      });
  }, [customer, csrf]);

  const submitCustomer = useCallback(async (data) => {
    setLoadingCustomer(true);

    const validationErrors = await validateCustomer(data);
    setCustomerErrors(validationErrors);

    if (!validationErrors) {
      await updateCustomer(data);
    }

    setLoadingCustomer(false);
  }, [customer, updateCustomer, validateCustomer]);

  return {
    customer, customerErrors, loadingCustomer, submitCustomer, isAuthenticated,
  };
};

export default useCustomer;
