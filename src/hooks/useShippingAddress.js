import { useCallback, useContext, useMemo } from 'react';
import {
  updateBillingAddress, updateShippingAddress, validateShippingAddress,
} from '../api';
import { CheckoutStore } from '../store';
import { generateTaxes, getShippingLines, requiredAddressFieldValidation } from './shared';

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

const useShippingAddress = (requiredAddressFields) => {
  const { state, dispatch } = useContext(CheckoutStore);
  const { csrf, apiPath } = state;
  const shippingAddress = state.applicationState.addresses.shipping;
  const savedAddresses = state.applicationState.customer.saved_addresses;
  const shippingAddressErrors = state.errors.shippingAddress;
  const countryInfo = state.initialData.country_info;
  const { billingSameAsShipping } = state.orderInfo;

  const memoizedShippingAddress = useMemo(() => shippingAddress, [JSON.stringify(shippingAddress)]);
  const memoizedRequiredAddressFields = useMemo(() => requiredAddressFields, [JSON.stringify(requiredAddressFields)]);
  const memoizedShippingAddressErrors = useMemo(() => shippingAddressErrors, [JSON.stringify(shippingAddressErrors)]);
  const memoizedCountryInfo = useMemo(() => countryInfo, []); // country info never changes, so no need to update it
  const memoizedSavedAddresses = useMemo(() => savedAddresses, [JSON.stringify(savedAddresses)]);

  const submitShippingAddress = useCallback(async (shippingAddressData) => {
    if (requiredAddressFields) {
      const requiredAddressFieldErrors = requiredAddressFieldValidation(shippingAddressData, memoizedRequiredAddressFields);
      if ( requiredAddressFieldErrors ) {
        dispatch({
          type: 'checkout/shippingAddress/setErrors',
          payload: requiredAddressFieldErrors,
        });
        return Promise.reject();
      }
    }
    if (!shippingAddressData || !shippingAddressData.country_code) {
      dispatch({
        type: 'checkout/shippingAddress/setErrors',
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
      ...shippingAddressData,
    });

    // Prevent user from submitting shipping address that is already in app state
    if (appShipping === localShipping) {
      if (memoizedShippingAddressErrors && Object.keys(memoizedShippingAddressErrors).length > 0) {
        return dispatch({
          type: 'checkout/shippingAddress/set',
        });
      }

      return Promise.resolve();
    }

    const countryData = memoizedCountryInfo.find((data) => data.iso_code === shippingAddressData.country_code);
    const country = countryData.name;

    if (countryData.show_province && !shippingAddressData.province_code) {
      dispatch({
        type: 'checkout/shippingAddress/setErrors',
        payload: [{
          field: 'province',
          message: 'Province is required',
        }],
      });
      return Promise.reject();
    }
    if (countryData.show_postal_code && !shippingAddressData.postal_code) {
      dispatch({
        type: 'checkout/shippingAddress/setErrors',
        payload: [{
          field: 'postal_code',
          message: 'Postal code is required',
        }],
      });
      return Promise.reject();
    }

    const provinceData = countryData.provinces.find((data) => data.iso_code === shippingAddressData.province_code);
    if (!provinceData) {
      dispatch({
        type: 'checkout/shippingAddress/setIncomplete',
      });

      return Promise.reject(new Error('Incomplete shipping address'));
    }

    const province = provinceData.name;
    const completeAddress = {
      ...shippingAddressData,
      country,
      province,
    };

    try {
      const validationData = await validateShippingAddress(csrf, apiPath, completeAddress);
      if (validationData.errors) {
        dispatch({
          type: 'checkout/shippingAddress/setErrors',
          payload: validationData.errors,
        });

        return Promise.reject(new Error('Invalid shipping address'));
      }
    } catch (e) {
      dispatch({
        type: 'checkout/shippingAddres/setErrors',
        payload: [{
          field: 'order',
          message: e.message,
        }],
      });

      return Promise.reject(e);
    }

    dispatch({
      type: 'checkout/shippingAddress/setting',
    });

    let shippingAddressResponse;

    try {
      shippingAddressResponse = await updateShippingAddress(csrf, apiPath, completeAddress);

      dispatch({
        type: 'checkout/shippingAddress/set',
        payload: shippingAddressResponse.data.address,
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

    if (shippingAddressData.country_code) {
      await getShippingLines(csrf, apiPath, dispatch);
    }

    // Set billing address if same as shipping is selected
    if (billingSameAsShipping) {
      const billingAddressResponse = await updateBillingAddress(csrf, apiPath, completeAddress);
      dispatch({
        type: 'checkout/billingAddress/set',
        payload: billingAddressResponse.data.address,
      });

      await generateTaxes(csrf, apiPath, dispatch);
      
      return dispatch({
        type: 'checkout/update',
        payload: billingAddressResponse.data.application_state,
      });
    } 

    await generateTaxes(csrf, apiPath, dispatch);

    return dispatch({
      type: 'checkout/update',
      payload: shippingAddressResponse.data.application_state,
    });
  }, [memoizedShippingAddress, memoizedCountryInfo, billingSameAsShipping, memoizedShippingAddressErrors, memoizedRequiredAddressFields]);

  return {
    shippingAddress: memoizedShippingAddress,
    savedAddresses: memoizedSavedAddresses,
    countryInfo: memoizedCountryInfo,
    shippingAddressErrors: memoizedShippingAddressErrors,
    submitShippingAddress,
  };
};

export default useShippingAddress;
