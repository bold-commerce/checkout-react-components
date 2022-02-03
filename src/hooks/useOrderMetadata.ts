import { useContext, useCallback, useMemo } from 'react';
import { CheckoutStore } from '../store';
import { deleteOrderMetadata, postOrderMetadata, patchOrderMetadata } from '../api';
import { handleError, OrderError } from '../utils';
import { CheckoutError, OrderMetaData } from '../types';
import { ActionErrorType, ActionType, LoadingState } from '../types/enums';

const useOrderMetadata = () : {
  data: OrderMetaData | null,
  errors: CheckoutError[] | null,
  loadingStatus: LoadingState,
  appendOrderMetadata: (data: OrderMetaData) => Promise<void>,
  overwriteOrderMetadata: (newOrderMetadata: OrderMetaData) => Promise<void>,
  clearOrderMetadata: () => Promise<void>,
} => {
  const { state, dispatch, onError } = useContext(CheckoutStore);
  const { token, apiPath } = state;
  const orderMetadata = state.applicationState.order_meta_data;
  const orderMetadataLoadingStatus = state.loadingStatus.orderMetadata;
  const orderMetadataErrors = state.errors.orderMetadata;
  const memoizedOrderMetadata = useMemo(() => orderMetadata, [JSON.stringify(orderMetadata)]);
  const memoizedOrderMetadataErrors = useMemo(() => orderMetadataErrors, [JSON.stringify(orderMetadataErrors)]);

  const clearOrderMetadata = useCallback(async (): Promise<void> => {
    try {
      dispatch({
        type: ActionType.Checkout_OrderMetadata_Setting,
      });
      const response = await deleteOrderMetadata(token, apiPath);
      const error = handleError(ActionErrorType.Checkout_OrderMetadata_SetErrors, response);
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

      dispatch({
        type: ActionType.Checkout_OrderMetadata_Set,
      });

      if(response.data?.application_state){
        return dispatch({
          type: ActionType.Checkout_Update,
          payload: response.data.application_state,
        });
      } else {
        return Promise.reject(new OrderError());
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
  }, [token, apiPath]);

  const overwriteOrderMetadata = useCallback(async (newOrderMetadata: OrderMetaData): Promise<void> => {
    try {
      dispatch({
        type: ActionType.Checkout_OrderMetadata_Setting,
      });
      const response = await postOrderMetadata(token, apiPath, newOrderMetadata);
      const error = handleError(ActionErrorType.Checkout_OrderMetadata_SetErrors, response);
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

      dispatch({
        type: ActionType.Checkout_OrderMetadata_Set,
      });

      if(response.data?.application_state){
        return dispatch({
          type: ActionType.Checkout_Update,
          payload: response.data.application_state,
        });
      } else {
        return Promise.reject(new OrderError());
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
  }, [token, apiPath]);

  const appendOrderMetadata = useCallback(async (data: OrderMetaData): Promise<void> => {
    try {
      dispatch({
        type: ActionType.Checkout_OrderMetadata_Setting,
      });
      const response = await patchOrderMetadata(token, apiPath, data);
      const error = handleError(ActionErrorType.Checkout_OrderMetadata_SetErrors, response);
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

      dispatch({
        type: ActionType.Checkout_OrderMetadata_Set,
      });
      
      if(response.data?.application_state){
        return dispatch({
          type: ActionType.Checkout_Update,
          payload: response.data.application_state,
        });
      } else {
        return Promise.reject(new OrderError());
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
