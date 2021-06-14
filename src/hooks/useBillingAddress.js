import { useCallback, useContext, useMemo } from 'react';
import { updateBillingAddress, validateBillingAddress } from '../api';
import { CheckoutStore } from '../store';

const useBillingAddress = () => {
  const { state, dispatch } = useContext(CheckoutStore);
  const { csrf, apiPath } = state;
  const billingAddress = state.applicationState.addresses.billing;
  const billingAddressErrors = state.errors.billingAddress;
  const countryInfo = state.initialData.country_info;
  const { billingSameAsShipping } = state.orderInfo;
  const shippingAddress = state.applicationState?.addresses?.shipping;

  const memoizedBillingAddress = useMemo(() => billingAddress, [JSON.stringify(billingAddress)]);
  const memoizedBillingAddressErrors = useMemo(() => billingAddressErrors, [JSON.stringify(billingAddressErrors)]);
  const memoizedCountryInfo = useMemo(() => countryInfo, []); // country info never changes, so no need to update itc
  const memoizedShippingAddress = useMemo(() => shippingAddress, [JSON.stringify(shippingAddress)]);

  const submitBillingAddress = useCallback(async (billingAddressData) => {
    if (!billingAddressData || !billingAddressData.country_code) return Promise.resolve();

    const appShipping = JSON.stringify(memoizedShippingAddress);
    const localShipping = JSON.stringify({
      ...memoizedBillingAddress,
      ...billingAddressData,
    });

    // Prevent user from submitting shipping address that is already in app state
    if (appShipping === localShipping) {
      return Promise.resolve();
    }

    const countryData = memoizedCountryInfo.find((data) => data.iso_code === billingAddressData.country_code);
    const country = countryData.name;

    if ((countryData.show_province && !billingAddressData.province_code) || (countryData.show_postal_code && !billingAddressData.postal_code)) return Promise.resolve();

    const provinceData = countryData.provinces.find((data) => data.iso_code === billingAddressData.province_code);
    if (!provinceData) {
      dispatch({
        type: 'checkout/billingAddress/setIncomplete',
      });

      return Promise.reject(new Error('Incomplete billing address'));
    }
    const province = provinceData.name;
    const completeAddress = {
      ...billingAddressData,
      country,
      province,
    };

    const validationData = await validateBillingAddress(csrf, apiPath, completeAddress);
    if (validationData.errors) {
      dispatch({
        type: 'checkout/billingAddress/setErrors',
        payload: validationData.errors,
      });
      return Promise.reject(new Error('Invalid billing address'));
    }

    const billingAddressResponse = await updateBillingAddress(csrf, apiPath, completeAddress);
    dispatch({
      type: 'checkout/update',
      payload: billingAddressResponse.data.application_state,
    });

    return dispatch({
      type: 'checkout/billingAddress/set',
      payload: billingAddressResponse.data.address,
    });
  }, [memoizedBillingAddress, memoizedCountryInfo]);

  const setBillingSameAsShipping = useCallback(async (value) => {
    dispatch({
      type: 'checkout/billingAddress/setBillingSameAsShipping',
      payload: value,
    });

    if (value) {
      if (memoizedShippingAddress?.country_code) {
        const billingAddressResponse = await updateBillingAddress(csrf, apiPath, memoizedShippingAddress);
        if (billingAddressResponse?.data?.application_state) {
          dispatch({
            type: 'checkout/update',
            payload: billingAddressResponse.data.application_state,
          });
          return dispatch({
            type: 'checkout/billingAddress/set',
            payload: billingAddressResponse.data.address,
          });
        }
      }
    }

    return Promise.resolve();
  }, [memoizedShippingAddress]);

  return {
    billingAddres: memoizedBillingAddress,
    billingAddressErrors: memoizedBillingAddressErrors,
    countryInfo: memoizedCountryInfo,
    billingSameAsShipping,
    submitBillingAddress,
    setBillingSameAsShipping,
  };
};

export default useBillingAddress;
