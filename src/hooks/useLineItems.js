import {
  useState,
  useContext,
  useCallback,
} from 'react';
import CheckoutContext from '../components/Context';

const useLineItems = () => {
  const {
    apiPath,
    csrf,
    applicationState,
    setApplicationState,
  } = useContext(CheckoutContext);
  const [isLoading, setLoading] = useState(false);


  const updateQuantity = useCallback(async (quantity, lineItemKey) => {
    const data = {
      quantity,
      line_item_key: lineItemKey,
    };

    if (csrf) {
      await fetch(`${apiPath}/items`, {
        mode: 'cors',
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrf,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          setApplicationState(response.data.application_state);
          setLoading(false);
        });
    }
  }, [csrf]);

  const removeLineItem = useCallback((lineItemKey) => {
    const data = {
      quantity: 0,
      line_item_key: lineItemKey,
    };
    if (csrf) {
      fetch(`${apiPath}/items`, {
        mode: 'cors',
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrf,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          setApplicationState(response.data.application_state);
          setLoading(false);
        });
    }
  }, [csrf]);

  return {
    lineItems: applicationState.line_items,
    isLoading,
    updateQuantity,
    removeLineItem,
  };
};

export default useLineItems;
