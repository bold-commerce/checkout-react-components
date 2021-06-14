import { useCallback, useContext, useMemo } from 'react';
import * as api from '../api';
import { CheckoutStore } from '../store';
import { getShippingLines } from './shared';

const useLineItems = () => {
  const { state, dispatch } = useContext(CheckoutStore);
  const { csrf, apiPath } = state;
  const countryCode = state.applicationState.addresses?.shipping?.country_code;
  const lineItems = state.applicationState.line_items;
  const memoizedLineItems = useMemo(() => lineItems, [JSON.stringify(lineItems)]);

  const removeLineItem = useCallback(async (lineItemKey) => {
    dispatch({
      type: 'checkout/lineItem/removing',
    });

    const response = await api.removeLineItem(csrf, apiPath, lineItemKey);

    dispatch({
      type: 'checkout/lineItem/removed',
    });

    dispatch({
      type: 'checkout/update',
      payload: response.data.application_state,
    });

    if (countryCode) {
      return getShippingLines(csrf, apiPath, dispatch);
    }
    return Promise.resolve();
  }, [countryCode]);

  const updateLineItemQuantity = useCallback(async (lineItemKey, quantity) => {
    const data = {
      quantity,
      line_item_key: lineItemKey,
    };

    dispatch({
      type: 'checkout/lineItem/setting',
    });

    const response = await api.updateLineItem(csrf, apiPath, data);

    dispatch({
      type: 'checkout/lineItem/set',
    });

    dispatch({
      type: 'checkout/update',
      payload: response.data.application_state,
    });

    if (countryCode) {
      return getShippingLines(csrf, apiPath, dispatch);
    }
    return Promise.resolve();
  }, [countryCode]);

  const addLineItem = useCallback(async (platformId, lineItemKey, quantity) => {
    const data = {
      platform_id: platformId,
      quantity,
      line_item_key: lineItemKey,
    };

    dispatch({
      type: 'checkout/lineItem/adding',
    });

    const response = await api.addLineItem(csrf, apiPath, data);

    dispatch({
      type: 'checkout/lineItem/added',
    });

    dispatch({
      type: 'checkout/update',
      payload: response.data.application_state,
    });

    if (countryCode) {
      return getShippingLines(csrf, apiPath, dispatch);
    }
    return Promise.resolve();
  }, [countryCode]);

  return {
    lineItems: memoizedLineItems,
    removeLineItem,
    updateLineItemQuantity,
    addLineItem,
  };
};

export default useLineItems;
