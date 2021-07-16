import { useCallback, useContext, useMemo } from 'react';
import { updateBillingAddress, validateBillingAddress } from '../api';
import { CheckoutStore } from '../store';

const emptyAddress = {
  first_name: '',
  last_name: '',
  address_line_1: '',
  address_line_2: '',
  country: '',
  city: '',
  province: '',
  country_code: '',
  province_code: '',
  postal_code: '',
  business_name: '',
  phone_number: '',
};

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
    if (billingSameAsShipping) return Promise.resolve();
    if (!billingAddressData || !billingAddressData.country_code) {
      dispatch({
        type: 'checkout/billingAddress/setErrors',
        payload: [{
          field: 'country',
          message: 'Country is required',
        }],
      });
      return Promise.reject();
    }

    const appShipping = JSON.stringify({
      ...emptyAddress,
      ...memoizedShippingAddress,
    });
    const localShipping = JSON.stringify({
      ...emptyAddress,
      ...billingAddressData,
    });

    // Prevent user from submitting shipping address that is already in app state
    if (appShipping === localShipping) {
      if (memoizedBillingAddressErrors && Object.keys(memoizedBillingAddressErrors).length > 0) {
        return dispatch({
          type: 'checkout/billingAddress/set'
        });
      }
      return Promise.resolve();
    }

    const countryData = memoizedCountryInfo.find((data) => data.iso_code === billingAddressData.country_code);
    const country = countryData.name;

    if (countryData.show_province && !billingAddressData.province_code) {
      dispatch({
        type: 'checkout/billingAddress/setErrors',
        payload: [{
          field: 'province',
          message: 'Province is required',
        }],
      });
      return Promise.reject();
    }
    if (countryData.show_postal_code && !billingAddressData.postal_code) {
      dispatch({
        type: 'checkout/billingAddress/setErrors',
        payload: [{
          field: 'postal_code',
          message: 'Postal code is required',
        }],
      });
      return Promise.reject();
    }

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

    try {
      const validationData = await validateBillingAddress(csrf, apiPath, completeAddress);
      if (validationData.errors) {
        dispatch({
          type: 'checkout/billingAddress/setErrors',
          payload: validationData.errors,
        });
        return Promise.reject(new Error('Invalid billing address'));
      }
    } catch (e) {
      dispatch({
        type: 'checkout/billingAddress/setErrors',
        payload: [{
          field: 'order',
          message: e.message,
        }],
      });
      return Promise.reject(e);
    }

    try {
      const billingAddressResponse = await updateBillingAddress(csrf, apiPath, completeAddress);
      dispatch({
        type: 'checkout/update',
        payload: billingAddressResponse.data.application_state,
      });

      return dispatch({
        type: 'checkout/billingAddress/set',
        payload: billingAddressResponse.data.address,
      });
    } catch (e) {
      dispatch({
        type: 'checkout/billingAddress/setErrors',
        payload: [{
          field: 'order',
          message: e.message,
        }],
      });
      return Promise.reject(e);
    }
  }, [memoizedBillingAddress, memoizedCountryInfo, billingSameAsShipping, memoizedBillingAddressErrors]);

  const setBillingSameAsShipping = useCallback(async (value) => {
    dispatch({
      type: 'checkout/billingAddress/setBillingSameAsShipping',
      payload: value,
    });

    if (value) {
      if (memoizedShippingAddress?.country_code) {
        try {
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
        } catch (e) {
          dispatch({
            type: 'checkout/billingAddress/setErrors',
            payload: [{
              field: 'order',
              message: e.message,
            }],
          });
          return Promise.reject(e);
        }
      }
    }

    return Promise.resolve();
  }, [memoizedShippingAddress]);

  return {
    billingAddress: memoizedBillingAddress,
    billingAddressErrors: memoizedBillingAddressErrors,
    countryInfo: memoizedCountryInfo,
    billingSameAsShipping,
    submitBillingAddress,
    setBillingSameAsShipping,
  };
};

export default useBillingAddress;
