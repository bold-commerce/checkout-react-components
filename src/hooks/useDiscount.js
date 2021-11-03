import { useCallback, useContext, useMemo } from 'react';
import { CheckoutStatus, CheckoutStore } from '../store';
import * as api from '../api';
import { PromiseError } from '../utils';

const useDiscount = () => {
  const { state, dispatch, onError } = useContext(CheckoutStore);
  const { statusState, dispatchStatus } = useContext(CheckoutStatus);
  const { token, apiPath } = state;
  const discounts = state.applicationState?.discounts;
  const memoizedDiscounts = useMemo(() => discounts, [JSON.stringify(discounts)]);
  const discountLoadingStatus = statusState.loadingStatus.discount;
  const discountErrors = statusState.errors.discount;
  const memoizedDiscountErrors = useMemo(() => discountErrors, [JSON.stringify(discountErrors)]);

  const applyDiscount = useCallback(async (discount) => {
    dispatch({
      type: 'checkout/discount/adding',
    });

    try {
      const response = await api.addDiscount(token, apiPath, discount);
      if (!response.success) {
        if (onError) {
          onError(response.error);
        }

        if (response.error?.body?.errors) {
          dispatchStatus({
            type: 'checkout/discount/setErrors',
            payload: response.error.body.errors,
          });
          return Promise.reject(response.error);
        }

        dispatchStatus({
          type: 'checkout/discount/setErrors',
          payload: [{
            field: 'order',
            message: 'An error with your order has occured, please try again',
          }],
        });

        return Promise.reject(response.error);
      }

      dispatchStatus({
        type: 'checkout/discount/added',
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
        type: 'checkout/discount/setErrors',
        payload: [{
          field: 'order',
          message: 'An error with your order has occured, please try again',
        }],
      });

      return Promise.reject(new PromiseError('Something went wrong', {
        errors: [
          {
            field: 'discount',
            message: 'An error with your order has occured, please try again',
          },
        ],
      }));
    }
  }, [onError]);

  const removeDiscount = useCallback(async (code) => {
    dispatchStatus({
      type: 'checkout/discount/removing',
    });

    try {
      const response = await api.removeDiscount(token, apiPath, code);
      if (!response.success) {
        if (onError) {
          onError(response.error);
        }

        if (response.error?.body?.errors) {
          dispatchStatus({
            type: 'checkout/discount/setErrors',
            payload: response.error.body.errors,
          });
          return Promise.reject(response.error);
        }

        dispatchStatus({
          type: 'checkout/discount/setErrors',
          payload: [{
            field: 'order',
            message: 'An error with your order has occured, please try again',
          }],
        });

        return Promise.reject(response.error);
      }

      dispatchStatus({
        type: 'checkout/discount/removed',
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
        type: 'checkout/discount/setErrors',
        payload: [{
          field: 'order',
          message: 'An error with your order has occured, please try again',
        }],
      });

      return Promise.reject(new PromiseError('Something went wrong', {
        errors: [
          {
            field: 'discount',
            message: 'An error with your order has occured, please try again',
          },
        ],
      }));
    }
  }, [onError]);

  return {
    data: {
      discounts: memoizedDiscounts,
      discountApplied: discounts?.length > 0,
      discountCode: discounts[0]?.code ?? '',
      discountTotal: discounts[0]?.value ?? 0,
    },
    errors: memoizedDiscountErrors,
    loadingStatus: discountLoadingStatus,
    applyDiscount,
    removeDiscount,
  };
};

export default useDiscount;
