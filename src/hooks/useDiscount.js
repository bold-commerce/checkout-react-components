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
    discountCode,
    discountApplied,
    setApplicationState,
  } = useContext(CheckoutContext);
  const [discountErrors, setDiscountErrors] = useState();
  const [loadingDiscount, setLoadingDiscount] = useState(false);

  const validateDiscount = useCallback((discount) => fetch(`${apiPath}/validate_discount_code?discount_code=${discount}`, {
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

  const updateDiscount = useCallback((discount) => {
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
  }, [csrf]);

  const submitDiscount = useCallback(async (discount) => {
    setLoadingDiscount(true);

    const validationErrors = await validateDiscount(discount);
    setDiscountErrors(validationErrors);

    if (!validationErrors) {
      await updateDiscount(discount);
    }

    setLoadingDiscount(false);
  }, [updateDiscount, validateDiscount]);

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
        code: discountCode,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setApplicationState(response.data.application_state);
      });
  }, [csrf, discountCode]);

  return {
    discountApplied,
    discountCode,
    removeDiscount,
    discountErrors,
    loadingDiscount,
    submitDiscount,
  };
};

export default useDiscount;
