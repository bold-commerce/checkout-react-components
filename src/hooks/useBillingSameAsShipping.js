import { useCallback, useContext, useMemo } from 'react';
import { CheckoutStatus, CheckoutStore } from '../store';
import { updateBillingAddress } from '../api';

const useBillingSameAsShipping = () => {
  const { state, dispatch, onError } = useContext(CheckoutStore);
  const { statusState, dispatchStatus } = useContext(CheckoutStatus);
  const { token, apiPath } = state;
  const shippingAddress = state.applicationState?.addresses?.shipping;
  const billingAddressErrors = statusState.errors.billingAddress;
  const billingAddressLoadingStatus = statusState.loadingStatus.billingAddress;
  const memoizedBillingAddressErrors = useMemo(() => billingAddressErrors, [JSON.stringify(billingAddressErrors)]);
  const memoizedShippingAddress = useMemo(() => shippingAddress, [JSON.stringify(shippingAddress)]);
  const { billingSameAsShipping } = state.orderInfo;

  const setBillingSameAsShipping = useCallback(async (value) => {
    dispatch({
      type: 'checkout/billingAddress/setBillingSameAsShipping',
      payload: value,
    });

    if (value) {
      if (memoizedShippingAddress?.country_code) {
        dispatchStatus({
          type: 'checkout/billingAddress/setting',
        });

        try {
          const response = await updateBillingAddress(token, apiPath, memoizedShippingAddress);
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
              type: 'checkout/billingAddress/setErrors',
              payload: [{
                field: 'order',
                message: 'Something went wrong',
              }],
            });

            return Promise.reject(response.error);
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
            type: 'checkout/billingAddress/setErrors',
            payload: [{
              field: 'order',
              message: 'Something went wrong',
            }],
          });
          return Promise.reject(e);
        }
      }
    }

    return Promise.resolve();
  }, [memoizedShippingAddress, onError]);

  return {
    data: billingSameAsShipping,
    errors: memoizedBillingAddressErrors,
    loadingStatus: billingAddressLoadingStatus,
    setBillingSameAsShipping,
  };
};

export default useBillingSameAsShipping;
