import { useCallback, useContext, useMemo } from 'react';
import * as api from '../api';
import { CheckoutStore } from '../store';
import { getShippingLines } from './shared';

const useLineItems = () => {
  const { state, dispatch, onError } = useContext(CheckoutStore);
  const { token, apiPath } = state;
  const countryCode = state.applicationState.addresses?.shipping?.country_code;
  const lineItems = state.applicationState.line_items;
  const memoizedLineItems = useMemo(() => lineItems, [JSON.stringify(lineItems)]);

  const removeLineItem = useCallback(async (lineItemKey) => {
    dispatch({
      type: 'checkout/lineItem/removing',
    });

    try {
      const response = await api.removeLineItem(token, apiPath, lineItemKey);
      if (!response.success) {
        if (response.error.errors) {
          dispatch({
            type: 'checkout/lineItem/setErrors',
            payload: response.error.errors,
          });
          return Promise.reject(response.error);
        }

        if (onError) {
          onError(response.error);
        }
        return Promise.reject(response.error);
      }

      dispatch({
        type: 'checkout/lineItem/removed',
      });

      dispatch({
        type: 'checkout/update',
        payload: response.data.application_state,
      });
    } catch (e) {
      if (onError) {
        onError(e);
      }

      return Promise.reject(e);
    }

    if (countryCode) {
      return getShippingLines(token, apiPath, dispatch);
    }
    return Promise.resolve();
  }, [countryCode, onError]);

  const updateLineItemQuantity = useCallback(async (lineItemKey, quantity) => {
    const data = {
      quantity,
      line_item_key: lineItemKey,
    };

    dispatch({
      type: 'checkout/lineItem/setting',
    });

    try {
      const response = await api.updateLineItem(token, apiPath, data);
      if (!response.success) {
        if (response.error.errors) {
          dispatch({
            type: 'checkout/lineItem/setErrors',
            payload: response.error.errors,
          });
          return Promise.reject(response.error);
        }

        if (onError) {
          onError(response.error);
        }
        return Promise.reject(response.error);
      }

      dispatch({
        type: 'checkout/lineItem/set',
      });

      dispatch({
        type: 'checkout/update',
        payload: response.data.application_state,
      });
    } catch (e) {
      if (onError) {
        onError(e);
      }

      return Promise.reject(e);
    }

    if (countryCode) {
      return getShippingLines(token, apiPath, dispatch);
    }
    return Promise.resolve();
  }, [countryCode, onError]);

  const addLineItem = useCallback(async (platformId, lineItemKey, quantity) => {
    const data = {
      platform_id: platformId,
      quantity,
      line_item_key: lineItemKey,
    };

    dispatch({
      type: 'checkout/lineItem/adding',
    });

    try {
      const response = await api.addLineItem(token, apiPath, data);
      if (!response.success) {
        if (response.error.errors) {
          dispatch({
            type: 'checkout/lineItem/setErrors',
            payload: response.error.errors,
          });
          return Promise.reject(response.error);
        }

        if (onError) {
          onError(response.error);
        }
        return Promise.reject(response.error);
      }

      dispatch({
        type: 'checkout/lineItem/added',
      });

      dispatch({
        type: 'checkout/update',
        payload: response.data.application_state,
      });
    } catch (e) {
      if (onError) {
        onError(e);
      }

      return Promise.reject(e);
    }

    if (countryCode) {
      return getShippingLines(token, apiPath, dispatch);
    }
    return Promise.resolve();
  }, [countryCode, onError]);

  return {
    lineItems: memoizedLineItems,
    removeLineItem,
    updateLineItemQuantity,
    addLineItem,
  };
};

export default useLineItems;
