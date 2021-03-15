import {
  useState, useContext, useCallback,
} from 'react';
import CheckoutContext from '../components/Context';

const useCustomer = () => {
  const {
    apiPath, csrf, setApplicationState, customer, setCustomer,
  } = useContext(CheckoutContext);
  const [errors, setErrors] = useState();
  const [isLoading, setLoading] = useState(false);

  const validateCustomer = useCallback(async () => fetch(`${apiPath}/validate_email_address?email_address=${customer.email_address}`, {
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
    }), [customer, csrf]);

  const submitCustomer = useCallback(async () => {
    fetch(`${apiPath}/customer/guest`, {
      mode: 'cors',
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrf,
      },
      body: JSON.stringify({
        ...customer,
        platform_id: 1,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setApplicationState(response.data.application_state);
        setCustomer(response.data.customer);
      });
  }, [customer, csrf]);

  const handleSubmit = useCallback(async () => {
    setLoading(true);

    const validationErrors = await validateCustomer();
    setErrors(validationErrors);

    if (!validationErrors) {
      await submitCustomer();
    }

    setLoading(false);
  }, [customer, submitCustomer, validateCustomer]);

  const updateCustomer = (value) => {
    setCustomer((prevState) => ({
      ...prevState,
      ...value,
    }));
  };

  return {
    customer, setCustomer: updateCustomer, errors, isLoading, handleSubmit,
  };
};

export default useCustomer;
