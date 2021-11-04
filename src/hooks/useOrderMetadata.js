import { useContext, useCallback, useMemo } from 'react';
import { CheckoutStatus, CheckoutStore } from '../store';
import { deleteOrderMetadata, postOrderMetadata, patchOrderMetadata } from '../api';
import { OrderError } from '../utils';

const useOrderMetadata = () => {
  const { state, dispatch, onError } = useContext(CheckoutStore);
  const { statusState, dispatchStatus } = useContext(CheckoutStatus);
  const { token, apiPath } = state;
  const orderMetadata = state.applicationState.order_meta_data;
  const orderMetadataLoadingStatus = statusState.loadingStatus.orderMetadata;
  const orderMetadataErrors = statusState.errors.orderMetadata;
  const memoizedOrderMetadata = useMemo(() => orderMetadata, [JSON.stringify(orderMetadata)]);
  const memoizedOrderMetadataErrors = useMemo(() => orderMetadataErrors, [JSON.stringify(orderMetadataErrors)]);

  const clearOrderMetadata = useCallback(async () => {
    try {
      dispatchStatus({
        type: 'checkout/orderMetadata/setting',
      });
      const response = await deleteOrderMetadata(token, apiPath);
      if (!response.success) {
        if (response.error?.body?.errors) {
          dispatchStatus({
            type: 'checkout/orderMetadata/setErrors',
            payload: response.error.body.errors,
          });
          return Promise.reject(response.error);
        }

        if (onError) {
          onError(response.error);
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
        type: 'checkout/orderMetadata/set',
      });
      return dispatch({
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
  }, [token, apiPath]);

  const overwriteOrderMetadata = useCallback(async (newOrderMetadata) => {
    try {
      dispatchStatus({
        type: 'checkout/orderMetadata/setting',
      });
      const response = await postOrderMetadata(token, apiPath, newOrderMetadata);
      if (!response.success) {
        if (response.error?.body?.errors) {
          dispatchStatus({
            type: 'checkout/orderMetadata/setErrors',
            payload: response.error.body.errors,
          });
          return Promise.reject(response.error);
        }

        if (onError) {
          onError(response.error);
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
        type: 'checkout/orderMetadata/set',
      });
      return dispatch({
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
  }, [token, apiPath]);

  const appendOrderMetadata = useCallback(async (data) => {
    try {
      dispatchStatus({
        type: 'checkout/orderMetadata/setting',
      });
      const response = await patchOrderMetadata(token, apiPath, data);
      if (!response.success) {
        if (response.error?.body?.errors) {
          dispatchStatus({
            type: 'checkout/orderMetadata/setErrors',
            payload: response.error.body.errors,
          });
          return Promise.reject(response.error);
        }

        if (onError) {
          onError(response.error);
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
        type: 'checkout/orderMetadata/set',
      });
      return dispatch({
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
  }, [token, apiPath]);

  return {
    data: memoizedOrderMetadata,
    errors: memoizedOrderMetadataErrors,
    loadingStatus: orderMetadataLoadingStatus,
    appendOrderMetadata,
    overwriteOrderMetadata,
    clearOrderMetadata,
  };
};

export default useOrderMetadata;
