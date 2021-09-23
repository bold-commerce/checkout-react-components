import { useCallback, useContext, useMemo } from 'react';
import * as api from '../api';
import { CheckoutStatus, CheckoutStore } from '../store';
import { OrderError } from '../utils';
import { getShippingLines } from './shared';

const useLineItems = () => {
  const { state, dispatch, onError } = useContext(CheckoutStore);
  const { statusState, dispatchStatus } = useContext(CheckoutStatus);
  const { token, apiPath } = state;
  const countryCode = state.applicationState.addresses?.shipping?.country_code;
  const lineItems = state.applicationState.line_items;
  const lineItemsLoadingStatus = statusState.loadingStatus.lineItems;
  const lineItemErrors = statusState.errors.lineItems;
  const memoizedLineItemErrors = useMemo(() => lineItemErrors, [JSON.stringify(lineItemErrors)]);
  const memoizedLineItems = useMemo(() => lineItems, [JSON.stringify(lineItems)]);

  const removeLineItem = useCallback(async (lineItemKey) => {
    dispatchStatus({
      type: 'checkout/lineItem/removing',
    });

    try {
      const response = await api.removeLineItem(token, apiPath, lineItemKey);
      if (!response.success) {
        if (onError) {
          onError(response.error);
        }

        if (response.error?.body?.errors) {
          dispatchStatus({
            type: 'checkout/lineItem/setErrors',
            payload: response.error.body.errors,
          });
          return Promise.reject(response.error);
        }

        dispatchStatus({
          type: 'checkout/order/setErrors',
          payload: [{
            field: 'order',
            message: 'An error with your order has occured, please try again',
          }],
        });

        return Promise.reject(new OrderError());
      }

      dispatchStatus({
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

      dispatchStatus({
        type: 'checkout/order/setErrors',
        payload: [{
          field: 'order',
          message: 'An error with your order has occured, please try again',
        }],
      });

      return Promise.reject(new OrderError());
    }

    if (countryCode) {
      return getShippingLines(token, apiPath, dispatch, dispatchStatus);
    }
    return Promise.resolve();
  }, [countryCode, onError]);

  const updateLineItemQuantity = useCallback(async (lineItemKey, quantity) => {
    const data = {
      quantity,
      line_item_key: lineItemKey,
    };

    dispatchStatus({
      type: 'checkout/lineItem/setting',
    });

    try {
      const response = await api.updateLineItem(token, apiPath, data);
      if (!response.success) {
        if (onError) {
          onError(response.error);
        }

        if (response.error?.body?.errors) {
          dispatchStatus({
            type: 'checkout/lineItem/setErrors',
            payload: response.error.body.errors,
          });
          return Promise.reject(response.error);
        }

        dispatchStatus({
          type: 'checkout/order/setErrors',
          payload: [{
            field: 'order',
            message: 'An error with your order has occured, please try again',
          }],
        });

        return Promise.reject(new OrderError());
      }

      dispatchStatus({
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

      dispatchStatus({
        type: 'checkout/order/setErrors',
        payload: [{
          field: 'order',
          message: 'An error with your order has occured, please try again',
        }],
      });

      return Promise.reject(new OrderError());
    }

    if (countryCode) {
      return getShippingLines(token, apiPath, dispatch, dispatchStatus);
    }
    return Promise.resolve();
  }, [countryCode, onError]);

  const addLineItem = useCallback(async (platformId, lineItemKey, quantity) => {
    const data = {
      platform_id: platformId,
      quantity,
      line_item_key: lineItemKey,
    };

    dispatchStatus({
      type: 'checkout/lineItem/adding',
    });

    try {
      const response = await api.addLineItem(token, apiPath, data);
      if (!response.success) {
        if (onError) {
          onError(response.error);
        }

        if (response.error?.body?.errors) {
          dispatchStatus({
            type: 'checkout/lineItem/setErrors',
            payload: response.error.body.errors,
          });
          return Promise.reject(response.error);
        }

        dispatchStatus({
          type: 'checkout/order/setErrors',
          payload: [{
            field: 'order',
            message: 'An error with your order has occured, please try again',
          }],
        });

        return Promise.reject(new OrderError());
      }

      dispatchStatus({
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

      dispatchStatus({
        type: 'checkout/order/setErrors',
        payload: [{
          field: 'order',
          message: 'An error with your order has occured, please try again',
        }],
      });

      return Promise.reject(new OrderError());
    }

    if (countryCode) {
      return getShippingLines(token, apiPath, dispatch, dispatchStatus);
    }
    return Promise.resolve();
  }, [countryCode, onError]);

  return {
    data: memoizedLineItems,
    errors: memoizedLineItemErrors,
    loadingStatus: lineItemsLoadingStatus,
    addLineItem,
    updateLineItemQuantity,
    removeLineItem,
  };
};

export default useLineItems;
