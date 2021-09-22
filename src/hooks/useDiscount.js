import { useCallback, useContext, useMemo } from 'react';
import { CheckoutStore } from '../store';
import * as api from '../api';

const useDiscount = () => {
  const { state, dispatch, onError } = useContext(CheckoutStore);
  const { token, apiPath } = state;
  const discounts = state.applicationState?.discounts;
  const memoizedDiscounts = useMemo(() => discounts, [JSON.stringify(discounts)]);
  const discountErrors = state.errors.discount;
  const memoizedDiscountErrors = useMemo(() => discountErrors, [JSON.stringify(discountErrors)]);

  const applyDiscount = useCallback(async (discount) => {
    dispatch({
      type: 'checkout/discount/adding',
    });

    try {
      const response = await api.addDiscount(token, apiPath, discount);
      if (!response.success) {
        if (response.error.errors) {
          dispatch({
            type: 'checkout/discount/setErrors',
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

      return Promise.reject(e);
    }
  }, [onError]);

  const removeDiscount = useCallback(async (code) => {
    dispatch({
      type: 'checkout/discount/removing',
    });

    try {
      const response = await api.removeDiscount(token, apiPath, code);
      if (!response.success) {
        if (response.error.errors) {
          dispatch({
            type: 'checkout/discount/setErrors',
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
      return Promise.reject(e);
    }
  }, [onError]);

  return {
    discounts: memoizedDiscounts,
    discountApplied: discounts?.length > 0,
    discountCode: discounts[0]?.code ?? '',
    discountTotal: discounts[0]?.value ?? 0,
    discountErrors: memoizedDiscountErrors,
    applyDiscount,
    removeDiscount,
  };
};

export default useDiscount;
