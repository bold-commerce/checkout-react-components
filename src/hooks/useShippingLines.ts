import { useCallback, useContext, useMemo } from 'react';
import { fetchShippingLines, setShippingLine } from '../api';
import { CheckoutStore } from '../store';
import { CheckoutError } from '../types';
import { ActionType, ActionErrorType, LoadingState } from '../types/enums';
import { ShippingLine } from '../types/ShippingLine';
import { handleError, OrderError } from '../utils';

const useShippingLines = () : {
  data: {
    shippingLines: ShippingLine[],
    selectedShippingAmount: number,
    selectedShippingDescription: string,
    selectedShippingLineIndex: number,
  }, 
  errors: CheckoutError[] | null,
  loadingStatus: LoadingState,
  updateShippingLine: (index: number) => Promise<void>,
  getShippingLines: () => Promise<void>
} => {
  const { state, dispatch, onError } = useContext(CheckoutStore);
  const { token, apiPath, applicationState } = state;
  const shippingLines = applicationState.shipping?.available_shipping_lines ?? [];
  const selectedCountryCode = applicationState?.addresses?.shipping?.country_code;
  const shippingLinesLoadingStatus = state.loadingStatus.shippingLines;
  const selectedShippingLineIndex = parseInt(applicationState.shipping?.selected_shipping?.id ?? "0", 10);
  const selectedShippingAmount = applicationState.shipping?.selected_shipping?.amount ?? 0;
  const selectedShippingDescription = applicationState.shipping?.selected_shipping?.description ?? '';
  const shippingLineErrors = state.errors.shippingLines;
  const memoizedShippingLines = useMemo(() => shippingLines, [JSON.stringify(shippingLines)]);
  const memoizedShippingLineErrors = useMemo(() => shippingLineErrors, [JSON.stringify(shippingLineErrors)]);

  const updateShippingLine = useCallback(async (index): Promise<void> => {
    dispatch({
      type: ActionType.Checkout_ShippingLines_Setting,
    });

    try {
      const response = await setShippingLine(token, apiPath, index);
      const error = handleError(ActionErrorType.Checkout_ShippingLines_SetErrors, response);
      if (error) {
        if (onError) {
          onError(error.error);
        }

        dispatch({
          type: error.type, 
          payload: error.payload,
        });

        return Promise.reject(error.error);
      }

      if (response.data && response.data.application_state) {
        dispatch({
          type: ActionType.Checkout_ShippingLines_Set,
        });
        return dispatch({
          type: ActionType.Checkout_Update,
          payload: response.data.application_state,
        });
      }
    } catch (e) {
      if (onError) {
        onError(e);
      }

      dispatch({
        type: ActionErrorType.Checkout_Order_SetErrors ,
        payload: [{
          field: 'order',
          message: 'An error with your order has occurred, please try again',
        }],
      });

      return Promise.reject(new OrderError());
    }

    return dispatch({
      type: ActionType.Checkout_ShippingLines_Set,
    });
  }, [onError]);

  const getShippingLines = useCallback(async (): Promise<void> => {
    // Don't get shipping lines if shipping address is not set
    if (!selectedCountryCode) {
      return Promise.resolve();
    }

    dispatch({
      type: ActionType.Checkout_ShippingLines_Fetching,
    });
    try {
      const response = await fetchShippingLines(token, apiPath);
      const error = handleError(ActionErrorType.Checkout_ShippingLines_SetErrors, response);
      if (error) {
        if (onError) {
          onError(error.error);
        }

        dispatch({
          type: error.type,
          payload: error.payload,
        });

        return Promise.reject(error.error);
      }

      if (response.data && response.data.application_state) {
        dispatch({
          type: ActionType.Checkout_ShippingLines_Fetched,
        });
        return dispatch({
          type: ActionType.Checkout_Update,
          payload: response.data.application_state,
        });
      }
    } catch (e) {
      if (onError) {
        onError(e);
      }

      dispatch({
        type: ActionErrorType.Checkout_Order_SetErrors,
        payload: [{
          field: 'order',
          message: 'An error with your order has occurred, please try again',
        }],
      });

      return Promise.reject(new OrderError());
    }

    return dispatch({
      type: ActionType.Checkout_ShippingLines_Fetched,
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
