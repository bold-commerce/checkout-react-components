import {
  useContext, useState, useCallback,
} from 'react';
import CheckoutContext from '../components/Context';

const useShippingLines = () => {
  const {
    apiPath, csrf, selectedShipping, shippingLines, setApplicationState, shippingErrors, billingErrors,
  } = useContext(CheckoutContext);

  const [loadingShippingLines, setLoadingShippingLines] = useState(false);
  const [emptyShippingLines, setEmptyShippingLines] = useState(true);

  const getShippingLines = useCallback(() => {
    if (csrf && !shippingErrors && !billingErrors) {
      setLoadingShippingLines(true);
      setEmptyShippingLines(false);
      fetch(`${apiPath}/shipping_lines`, {
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
          setLoadingShippingLines(false);
          if (response.data && response.data.application_state) {
            setApplicationState(response.data.application_state);
            setEmptyShippingLines(false);
          }
        })
        .catch(() => {
          setEmptyShippingLines(true);
        });
    } else {
      setEmptyShippingLines(true);
    }
  }, [csrf, shippingErrors, billingErrors]);

  const setShippingLine = useCallback((shippingLine) => {
    if (csrf) {
      fetch(`${apiPath}/shipping_lines`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrf,
        },
        body: JSON.stringify({
          index: shippingLine.toString(),
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          setLoadingShippingLines(false);
          if (response.data && response.data.application_state) {
            setApplicationState(response.data.application_state);
          }
        });
    }
  }, [csrf]);

  return {
    selectedShipping,
    shippingLines,
    setShippingLine,
    getShippingLines,
    loadingShippingLines,
    emptyShippingLines,
  };
};

export default useShippingLines;
