import { useContext, useCallback } from 'react';
import { CheckoutStore } from '../store';
import { deleteOrderMetadata, postOrderMetadata, patchOrderMetadata } from '../api';

const useOrderMetadata = () => {
  const { state, dispatch } = useContext(CheckoutStore);
  const { csrf, apiPath } = state;
  const orderMetadata = state.applicationState.order_meta_data;
  const orderMetadataLoadingStatus = state.loadingStatus.orderMetadata;
  const orderMetadataErrors = state.errors.orderMetadata;

  const clearOrderMetadata = useCallback(async () => {
    try {
      dispatch({
        type: 'checkout/orderMetadata/setting',
      });
      const response = await deleteOrderMetadata(csrf, apiPath);
      if (!response.success) {
        if (response.error.errors) {
          dispatch({
            type: 'checkout/orderMetadata/setErrors',
            payload: response.error.errors,
          });
          return Promise.reject(response.error);
        }

        // TODO: Handle server error
        return Promise.reject(response.error);
      }

      dispatch({
        type: 'checkout/orderMetadata/set',
      });
      return dispatch({
        type: 'checkout/update',
        payload: response.data.application_state,
      });
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }, [csrf, apiPath]);

  const overwriteOrderMetadata = useCallback(async (newOrderMetadata) => {
    try {
      dispatch({
        type: 'checkout/orderMetadata/setting',
      });
      const response = await postOrderMetadata(csrf, apiPath, newOrderMetadata);
      if (!response.success) {
        if (response.error.errors) {
          dispatch({
            type: 'checkout/orderMetadata/setErrors',
            payload: response.error.errors,
          });
          return Promise.reject(response.error);
        }

        // TODO: Handle server error
        return Promise.reject(response.error);
      }

      dispatch({
        type: 'checkout/orderMetadata/set',
      });
      return dispatch({
        type: 'checkout/update',
        payload: response.data.application_state,
      });
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }, [csrf, apiPath]);

  const appendOrderMetadata = useCallback(async (propertyName, propertyValue) => {
    try {
      const requestBody = {
        [propertyName]: propertyValue,
      };

      dispatch({
        type: 'checkout/orderMetadata/setting',
      });
      const response = await patchOrderMetadata(csrf, apiPath, requestBody);
      if (!response.success) {
        if (response.error.errors) {
          dispatch({
            type: 'checkout/orderMetadata/setErrors',
            payload: response.error.errors,
          });
          return Promise.reject(response.error);
        }

        // TODO: Handle server error
        return Promise.reject(response.error);
      }

      dispatch({
        type: 'checkout/orderMetadata/set',
      });
      return dispatch({
        type: 'checkout/update',
        payload: response.data.application_state,
      });
    } catch (e) {
      console.error(e);
      Promise.reject(e);
    }
  }, [csrf, apiPath]);

  return {
    orderMetadata,
    orderMetadataLoadingStatus,
    orderMetadataErrors,
    clearOrderMetadata,
    overwriteOrderMetadata,
    appendOrderMetadata,
  };
};

export default useOrderMetadata;
