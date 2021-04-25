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
    lineItems,
    setApplicationState,
  } = useContext(CheckoutContext);
  const [loadingLineItems, setLoadingLineItems] = useState(false);

  const addLineItem = useCallback((platformId, quantity, lineItemKey) => {
    const data = {
      platform_id: platformId,
      quantity,
      line_item_key: lineItemKey,
    };

    if (csrf) {
      fetch(`${apiPath}/items`, {
        mode: 'cors',
        method: 'POST',
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
          setLoadingLineItems(false);
        });
    }
  }, [csrf]);

  const updateLineItemQuantity = useCallback((quantity, lineItemKey) => {
    const data = {
      quantity,
      line_item_key: lineItemKey,
    };

    if (csrf) {
      fetch(`${apiPath}/items`, {
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
          setLoadingLineItems(false);
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
          setLoadingLineItems(false);
        });
    }
  }, [csrf]);

  return {
    lineItems,
    loadingLineItems,
    addLineItem,
    updateLineItemQuantity,
    removeLineItem,
  };
};

export default useLineItems;
