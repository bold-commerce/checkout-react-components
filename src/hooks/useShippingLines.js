import { useCallback, useContext, useMemo } from 'react';
import { fetchShippingLines, setShippingLine } from '../api';
import { CheckoutStatus, CheckoutStore } from '../store';
import { handleError, OrderError } from '../utils';

const useShippingLines = () => {
  const { state, dispatch, onError } = useContext(CheckoutStore);
  const { statusState, dispatchStatus } = useContext(CheckoutStatus);
  const { token, apiPath, applicationState } = state;
  const shippingLines = applicationState.shipping.available_shipping_lines;
  const selectedCountryCode = applicationState?.addresses?.shipping?.country_code;
  const shippingLinesLoadingStatus = statusState.loadingStatus.shippingLines;
  const selectedShippingLineIndex = parseInt(applicationState.shipping?.selected_shipping?.id ?? 0, 10);
  const selectedShippingAmount = applicationState.shipping?.selected_shipping?.amount;
  const selectedShippingDescription = applicationState.shipping?.selected_shipping?.description;
  const shippingLineErrors = statusState.errors.shippingLines;
  const memoizedShippingLines = useMemo(() => shippingLines, [JSON.stringify(shippingLines)]);
  const memoizedShippingLineErrors = useMemo(() => shippingLineErrors, [JSON.stringify(shippingLineErrors)]);

  const updateShippingLine = useCallback(async (index) => {
    dispatchStatus({
      type: 'checkout/shippingLines/setting',
    });

    try {
      const response = await setShippingLine(token, apiPath, index);
      const error = handleError('shippingLines', response);
      if (error) {
        if (onError) {
          onError(error.error);
        }

        dispatchStatus({
          type: `checkout/${error.type}/setErrors`,
          payload: error.payload,
        });

        return Promise.reject(error.error);
      }

      if (response.data && response.data.application_state) {
        dispatchStatus({
          type: 'checkout/shippingLines/set',
        });
        return dispatch({
          type: 'checkout/update',
          payload: response.data.application_state,
        });
      }
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

    return dispatchStatus({
      type: 'checkout/shippingLines/set',
    });
  }, [onError]);

  const getShippingLines = useCallback(async () => {
    // Don't get shipping lines if shipping address is not set
    if (!selectedCountryCode) {
      return Promise.resolve();
    }

    dispatchStatus({
      type: 'checkout/shippingLines/fetching',
    });
    try {
      const response = await fetchShippingLines(token, apiPath);
      const error = handleError('shippingLines', response);
      if (error) {
        if (onError) {
          onError(error.error);
        }

        dispatchStatus({
          type: `checkout/${error.type}/setErrors`,
          payload: error.payload,
        });

        return Promise.reject(error.error);
      }

      if (response.data && response.data.application_state) {
        dispatchStatus({
          type: 'checkout/shippingLines/fetched',
        });
        return dispatch({
          type: 'checkout/update',
          payload: response.data.application_state,
        });
      }
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

    return dispatchStatus({
      type: 'checkout/shippingLines/fetched',
    });
  }, [selectedCountryCode, onError]);

  return {
    data: {
      shippingLines: memoizedShippingLines,
      selectedShippingAmount,
      selectedShippingDescription,
      selectedShippingLineIndex,
    },
    errors: memoizedShippingLineErrors,
    loadingStatus: shippingLinesLoadingStatus,
    updateShippingLine,
    getShippingLines,
  };
};

export default useShippingLines;
