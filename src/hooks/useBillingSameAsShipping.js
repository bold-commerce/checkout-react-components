import { useCallback, useContext, useMemo } from 'react';
import { CheckoutStatus, CheckoutStore } from '../store';
import { removeBillingAddress } from '../api';
import { OrderError } from '../utils';

const useBillingSameAsShipping = () => {
  const { state, dispatch, onError } = useContext(CheckoutStore);
  const { statusState, dispatchStatus } = useContext(CheckoutStatus);
  const { token, apiPath } = state;
  const billingAddressErrors = statusState.errors.billingAddress;
  const billingAddressLoadingStatus = statusState.loadingStatus.billingAddress;
  const memoizedBillingAddressErrors = useMemo(() => billingAddressErrors, [JSON.stringify(billingAddressErrors)]);
  const { billingSameAsShipping } = state.orderInfo;

  const setBillingSameAsShipping = useCallback(async (value) => {
    dispatch({
      type: 'checkout/billingAddress/setBillingSameAsShipping',
      payload: value,
    });

    dispatchStatus({
      type: 'checkout/billingAddress/setting',
    });

    try {
      // TODO: Remove this. This is a temporary hack
      await removeBillingAddress(token, apiPath);

      const response = await removeBillingAddress(token, apiPath);
      if (!response.success) {
        if (onError) {
          onError(response.error);
        }

        if (response.error?.body?.errors) {
          dispatchStatus({
            type: 'checkout/billingAddress/setErrors',
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

      dispatch({
        type: 'checkout/update',
        payload: response.data.application_state,
      });

      return dispatchStatus({
        type: 'checkout/billingAddress/set',
        payload: response.data.address,
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
  }, [onError]);

  return {
    data: billingSameAsShipping,
    errors: memoizedBillingAddressErrors,
    loadingStatus: billingAddressLoadingStatus,
    setBillingSameAsShipping,
  };
};

export default useBillingSameAsShipping;
