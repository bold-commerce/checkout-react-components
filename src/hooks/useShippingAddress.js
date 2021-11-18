import { useCallback, useContext, useMemo } from 'react';
import { updateBillingAddress, updateShippingAddress } from '../api';
import { CheckoutStatus, CheckoutStore } from '../store';
import { OrderError, PromiseError } from '../utils';
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

/**
 * @param {string[]} requiredAddressFields
 */
const useShippingAddress = (requiredAddressFields) => {
  const { state, dispatch, onError } = useContext(CheckoutStore);
  const { statusState, dispatchStatus } = useContext(CheckoutStatus);
  const { token, apiPath } = state;
  const shippingAddress = state.applicationState.addresses.shipping;
  const shippingAddressLoadingStatus = statusState.loadingStatus.shippingAddress;
  const shippingAddressErrors = statusState.errors.shippingAddress;
  const countryInfo = state.initialData.country_info;
  const { billingSameAsShipping } = state.orderInfo;
  const memoizedShippingAddress = useMemo(() => shippingAddress, [JSON.stringify(shippingAddress)]);
  const memoizedRequiredAddressFields = useMemo(() => requiredAddressFields, [JSON.stringify(requiredAddressFields)]);
  const memoizedShippingAddressErrors = useMemo(() => shippingAddressErrors, [JSON.stringify(shippingAddressErrors)]);
  const memoizedCountryInfo = useMemo(() => countryInfo, []); // country info never changes, so no need to update it

  const submitShippingAddress = useCallback(async (shippingAddressData) => {
    if (requiredAddressFields) {
      const requiredAddressFieldErrors = requiredAddressFieldValidation(shippingAddressData, memoizedRequiredAddressFields);
      if (requiredAddressFieldErrors) {
        dispatchStatus({
          type: 'checkout/shippingAddress/setErrors',
          payload: requiredAddressFieldErrors,
        });
        return Promise.reject(new PromiseError('Required fields missing data', { errors: requiredAddressFieldErrors }));
      }
    }
    if (!shippingAddressData || !shippingAddressData.country_code) {
      dispatchStatus({
        type: 'checkout/shippingAddress/setErrors',
        payload: [{
          field: 'country',
          message: 'Country is required',
        }],
      });
      return Promise.reject(new PromiseError('Country is required', {
        errors: [
          {
            field: 'country',
            message: 'Country is required',
          },
        ],
      }));
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
        return dispatchStatus({
          type: 'checkout/shippingAddress/set',
        });
      }

      return Promise.resolve();
    }

    const countryData = memoizedCountryInfo.find((data) => data.iso_code === shippingAddressData.country_code);
    const country = countryData.name;

    if (countryData.show_province && !shippingAddressData.province_code) {
      dispatchStatus({
        type: 'checkout/shippingAddress/setErrors',
        payload: [{
          field: 'province',
          message: 'Province is required',
        }],
      });
      return Promise.reject(new PromiseError('Province is required', {
        errors: [
          {
            field: 'province',
            message: 'Province is required',
          },
        ],
      }));
    }
    if (countryData.show_postal_code && !shippingAddressData.postal_code) {
      dispatchStatus({
        type: 'checkout/shippingAddress/setErrors',
        payload: [{
          field: 'postal_code',
          message: 'Postal code is required',
        }],
      });
      return Promise.reject(new PromiseError('Postal code is required', {
        errors: [
          {
            field: 'postal_code',
            message: 'Postal code is required',
          },
        ],
      }));
    }

    const provinceData = countryData.provinces.find((data) => data.iso_code === shippingAddressData.province_code);
    if (!provinceData) {
      dispatchStatus({
        type: 'checkout/shippingAddress/setIncomplete',
      });

      return Promise.reject(new PromiseError('Address is incomplete', {
        errors: [
          {
            field: 'shipping_address',
            message: 'Address is incomplete',
          },
        ],
      }));
    }

    const province = provinceData.name;
    const completeAddress = {
      ...shippingAddressData,
      country,
      province,
    };

    dispatchStatus({
      type: 'checkout/shippingAddress/setting',
    });

    let shippingAddressResponse;

    try {
      shippingAddressResponse = await updateShippingAddress(token, apiPath, completeAddress);
      if (!shippingAddressResponse.success) {
        if (onError) {
          onError(shippingAddressResponse.error);
        }

        if (shippingAddressResponse.error?.body?.errors) {
          dispatchStatus({
            type: 'checkout/shippingAddress/setErrors',
            payload: shippingAddressResponse.error.body.errors,
          });
          return Promise.reject(shippingAddressResponse.error);
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

      dispatchStatus({
        type: 'checkout/shippingAddress/set',
        payload: shippingAddressResponse.data.address,
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

    if (shippingAddressData.country_code) {
      await getShippingLines(token, apiPath, dispatch, dispatchStatus);
    }

    // Set billing address if same as shipping is selected
    if (billingSameAsShipping) {
      const billingAddressResponse = await updateBillingAddress(token, apiPath, completeAddress);
      if (!billingAddressResponse.success) {
        if (onError) {
          onError(billingAddressResponse.error);
        }

        if (billingAddressResponse?.error?.body?.errors) {
          dispatchStatus({
            type: 'checkout/billingAddress/setErrors',
            payload: billingAddressResponse.error.body.errors,
          });
          return Promise.reject(billingAddressResponse.error);
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

      dispatchStatus({
        type: 'checkout/billingAddress/set',
        payload: billingAddressResponse.data.address,
      });

      dispatch({
        type: 'checkout/update',
        payload: billingAddressResponse.data.application_state,
      });

      return generateTaxes(token, apiPath, dispatch, dispatchStatus);
    }

    dispatch({
      type: 'checkout/update',
      payload: shippingAddressResponse.data.application_state,
    });

    return generateTaxes(token, apiPath, dispatch, dispatchStatus);
  }, [memoizedShippingAddress, memoizedCountryInfo, memoizedShippingAddressErrors, memoizedRequiredAddressFields, billingSameAsShipping, onError]);

  return {
    data: shippingAddress,
    errors: memoizedShippingAddressErrors,
    loadingStatus: shippingAddressLoadingStatus,
    submitShippingAddress,
  };
};

export default useShippingAddress;
