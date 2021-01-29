import {
  useState,
  useContext,
  useCallback,
} from 'react';
import CheckoutContext from '../components/Context';

const useDiscount = () => {
  const {
    apiPath,
    csrf,
    applicationState,
    setApplicationState,
  } = useContext(CheckoutContext);
  const [errors, setErrors] = useState();
  const [isLoading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(applicationState.discounts[0]?.code ?? '');
  const discountApplied = applicationState.discounts.length > 0;
  const discountCode = applicationState.discounts[0]?.code;

  const validateDiscount = useCallback(async () => fetch(`${apiPath}/validate_discount_code?discount_code=${discount}`, {
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
    }), [discount, csrf]);

  const submitDiscount = useCallback(async () => {
    fetch(`${apiPath}/discounts`, {
      mode: 'cors',
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrf,
      },
      body: JSON.stringify({
        code: discount,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setApplicationState(response.data.application_state);
      });
  }, [discount, csrf]);

  const handleSubmit = useCallback(async () => {
    setLoading(true);

    const validationErrors = await validateDiscount();
    setErrors(validationErrors);

    if (!validationErrors) {
      await submitDiscount();
    }

    setLoading(false);
  }, [discount, submitDiscount, validateDiscount]);

  const removeDiscount = useCallback(async () => {
    fetch(`${apiPath}/discounts`, {
      mode: 'cors',
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrf,
      },
      body: JSON.stringify({
        code: discount,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setApplicationState(response.data.application_state);
      });
  }, [discount, csrf]);

  return {
    discount,
    setDiscount,
    discountApplied,
    discountCode,
    removeDiscount,
    errors,
    isLoading,
    handleSubmit,
  };
};

export default useDiscount;
