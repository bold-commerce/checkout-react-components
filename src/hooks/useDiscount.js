import { useCallback, useContext, useMemo } from 'react';
import { CheckoutStore } from '../store';
import * as api from '../api';

const useDiscount = () => {
  const { state, dispatch } = useContext(CheckoutStore);
  const { csrf, apiPath } = state;
  const discounts = state.applicationState?.discounts;
  const memoizedDiscounts = useMemo(() => discounts, [JSON.stringify(discounts)]);
  const discountErrors = state.errors.discount;
  const memoizedDiscountErrors = useMemo(() => discountErrors, [JSON.stringify(discountErrors)]);

  const applyDiscount = useCallback(async (discount) => {
    dispatch({
      type: 'checkout/discount/adding',
    });

    try {
      const validationResponse = await api.validateDiscount(csrf, apiPath, discount);
      if (Array.isArray(validationResponse.errors)) {
        dispatch({
          type: 'checkout/discount/setErrors',
          payload: validationResponse.errors,
        });
        return Promise.reject(new Error('Invalid discount code'));
      }
    } catch (e) {
      dispatch({
        type: 'checkout/discount/setErrors',
        payload: [{
          field: 'order',
          message: e.message,
        }],
      });

      return Promise.reject(e);
    }

    try {
      const response = await api.addDiscount(csrf, apiPath, discount);

      dispatch({
        type: 'checkout/discount/added',
      });

      return dispatch({
        type: 'checkout/update',
        payload: response.data.application_state,
      });
    } catch (e) {
      dispatch({
        type: 'checkout/discount/setErrors',
        payload: [{
          field: 'order',
          message: e.message,
        }],
      });

      return Promise.reject(e);
    }
  }, []);

  const removeDiscount = useCallback(async (code) => {
    dispatch({
      type: 'checkout/discount/removing',
    });

    try {
      const response = await api.removeDiscount(csrf, apiPath, code);

      dispatch({
        type: 'checkout/discount/removed',
      });

      return dispatch({
        type: 'checkout/update',
        payload: response.data.application_state,
      });
    } catch (e) {
      dispatch({
        type: 'checkout/discount/setErrors',
        payload: [{
          field: 'order',
          message: e.message,
        }],
      });

      return Promise.reject(e);
    }
  }, []);

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
