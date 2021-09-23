import { useCallback, useContext, useMemo } from 'react';
import { updateBillingAddress } from '../api';
import { CheckoutStatus, CheckoutStore } from '../store';
import { requiredAddressFieldValidation } from './shared';

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

const useBillingAddress = (requiredAddressFields) => {
  const { state, dispatch, onError } = useContext(CheckoutStore);
  const { statusState, dispatchStatus } = useContext(CheckoutStatus);
  const { token, apiPath } = state;
  const billingAddress = state.applicationState.addresses.billing;
  const billingAddressErrors = statusState.errors.billingAddress;
  const billingAddressLoadingStatus = statusState.loadingStatus.billingAddress;
  const countryInfo = state.initialData.country_info;
  const { billingSameAsShipping } = state.orderInfo;
  const shippingAddress = state.applicationState?.addresses?.shipping;

  const memoizedBillingAddress = useMemo(() => (billingAddress), [JSON.stringify(billingAddress), billingSameAsShipping]);
  const memoizedBillingAddressErrors = useMemo(() => billingAddressErrors, [JSON.stringify(billingAddressErrors)]);
  const memoizedRequiredAddressFields = useMemo(() => requiredAddressFields, [JSON.stringify(requiredAddressFields)]);
  const memoizedCountryInfo = useMemo(() => countryInfo, []); // country info never changes, so no need to update it
  const memoizedShippingAddress = useMemo(() => shippingAddress, [JSON.stringify(shippingAddress)]);

  const submitBillingAddress = useCallback(async (billingAddressData) => {
    if (billingSameAsShipping) return Promise.resolve();

    if (requiredAddressFields) {
      const requiredAddressFieldErrors = requiredAddressFieldValidation(billingAddressData, memoizedRequiredAddressFields);
      if (requiredAddressFieldErrors) {
        dispatchStatus({
          type: 'checkout/billingAddress/setErrors',
          payload: requiredAddressFieldErrors,
        });
        return Promise.reject();
      }
    }

    if (!billingAddressData || !billingAddressData.country_code) {
      dispatchStatus({
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
        return dispatchStatus({
          type: 'checkout/billingAddress/set',
        });
      }
      return Promise.resolve();
    }

    const countryData = memoizedCountryInfo.find((data) => data.iso_code === billingAddressData.country_code);
    const country = countryData.name;

    if (countryData.show_province && !billingAddressData.province_code) {
      dispatchStatus({
        type: 'checkout/billingAddress/setErrors',
        payload: [{
          field: 'province',
          message: 'Province is required',
        }],
      });
      return Promise.reject();
    }
    if (countryData.show_postal_code && !billingAddressData.postal_code) {
      dispatchStatus({
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
      dispatchStatus({
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

    dispatchStatus({
      type: 'checkout/billingAddress/setting',
    });

    try {
      const response = await updateBillingAddress(token, apiPath, completeAddress);
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
  }, [memoizedBillingAddress, memoizedCountryInfo, billingSameAsShipping, memoizedBillingAddressErrors, memoizedRequiredAddressFields, onError]);

  return {
    data: memoizedBillingAddress,
    errors: memoizedBillingAddressErrors,
    loadingStatus: billingAddressLoadingStatus,
    submitBillingAddress,
  };
};

export default useBillingAddress;
