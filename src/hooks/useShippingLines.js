import {
  useContext, useEffect, useState, useCallback,
} from 'react';
import CheckoutContext from '../components/Context';

const useShippingLines = () => {
  const {
    apiPath, csrf, applicationState, setApplicationState, shippingAddress, shippingLines, setShippingLines, shippingErrors, billingErrors,
  } = useContext(CheckoutContext);

  const [isLoading, setLoading] = useState(false);
  const localShippingAddress = {
    country_code: shippingAddress.country_code,
    province_code: shippingAddress.country_code,
    postal_code: shippingAddress.postal_code,
  };
  const applicationShippingAddress = {
    country_code: applicationState.addresses.shipping.country_code,
    province_code: applicationState.addresses.shipping.country_code,
    postal_code: applicationState.addresses.shipping.postal_code,
  };
  const [isEmpty, setIsEmpty] = useState(true);
  const lineItemQuantities = applicationState.line_items.map((line_item) => line_item.product_data.quantity);

  const updateShippingLines = useCallback((newApplicationState) => {
    let applicationShippingLines = [];
    if (newApplicationState.shipping.available_shipping_lines.length > 0) {
      applicationShippingLines = newApplicationState.shipping.available_shipping_lines.map((shippingLine) => {
        const selected = newApplicationState.shipping.selected_shipping ? shippingLine.id === newApplicationState.shipping.selected_shipping.id : false;

        return {
          ...shippingLine,
          selected,
        };
      });
    }
    const shippingLineAvailable = applicationShippingLines.every((item) => item.selected === false);
    setShippingLines(applicationShippingLines);
    if (shippingLineAvailable) {
      setShippingLine(0);
    }
  }, [csrf]);

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
          setLoading(false);
          if (response.data && response.data.application_state) {
            setApplicationState(response.data.application_state);
            updateShippingLines(response.data.application_state);
          }
        });
    }
  }, [csrf, updateShippingLines]);

  useEffect(() => {
    // debounces fetching shipping lines
    const timer = setTimeout(() => {
      if (csrf && JSON.stringify(localShippingAddress) === JSON.stringify(applicationShippingAddress) && !shippingErrors && !billingErrors) {
        setLoading(true);
        setIsEmpty(false);
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
            setLoading(false);
            if (response.data && response.data.application_state) {
              setApplicationState(response.data.application_state);
              updateShippingLines(response.data.application_state);
            }
          });
      } else {
        setShippingLines([]);
        setIsEmpty(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [csrf, updateShippingLines, applicationShippingAddress.country_code, applicationShippingAddress.province_code, applicationShippingAddress.postal_code, localShippingAddress.country_code, localShippingAddress.province_code, localShippingAddress.postal_code, JSON.stringify(lineItemQuantities), shippingErrors, billingErrors]);
  return {
    selectedShipping: applicationState.shipping.selected_shipping,
    shippingLines,
    setShippingLine,
    isLoading,
    isEmpty,
  };
};

export default useShippingLines;
