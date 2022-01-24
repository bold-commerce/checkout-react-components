import { useCallback, useContext, useMemo } from 'react';
import { updateBillingAddress } from '../api';
import { CheckoutStore } from '../store';
import { Address } from '../types/Address';
import { CountryInfo } from '../types/CountryInfo';
import { handleError, OrderError, PromiseError } from '../utils';
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

/**
 * @param {string[]} requiredAddressFields
 */
const useBillingAddress = (requiredAddressFields: string[]): {
  data: any; errors?: any; loadingStatus: string; submitBillingAddress: (billingAddressData: any) => Promise<any>;
} => {
  const { state, dispatch, onError } = useContext(CheckoutStore);
  const { token, apiPath } = state;
  const billingAddress: Address = state.applicationState.addresses.billing;
  const billingAddressErrors: Error[] = state.errors.billingAddress;
  const billingAddressLoadingStatus: string = state.loadingStatus.billingAddress;
  const countryInfo: CountryInfo[] = state.initialData.country_info;
  const { billingSameAsShipping } : {billingSameAsShipping: boolean} = state.orderInfo;
  const shippingAddress: Address = state.applicationState?.addresses?.shipping;

  const memoizedBillingAddress = useMemo(() => (billingAddress), [JSON.stringify(billingAddress), billingSameAsShipping]);
  const memoizedBillingAddressErrors = useMemo(() => billingAddressErrors, [JSON.stringify(billingAddressErrors)]);
  const memoizedRequiredAddressFields = useMemo(() => requiredAddressFields, [JSON.stringify(requiredAddressFields)]);
  const memoizedCountryInfo = useMemo(() => countryInfo, []); // country info never changes, so no need to update it
  const memoizedShippingAddress = useMemo(() => shippingAddress, [JSON.stringify(shippingAddress)]);

  const submitBillingAddress = useCallback(async (billingAddressData: Address) => {
    if (billingSameAsShipping) return Promise.resolve();

    if (requiredAddressFields) {
      const requiredAddressFieldErrors = requiredAddressFieldValidation(billingAddressData, memoizedRequiredAddressFields);
      if (requiredAddressFieldErrors) {
        dispatch({
          type: 'checkout/billingAddress/setErrors',
          payload: requiredAddressFieldErrors,
        });
        return Promise.reject(new PromiseError('Required fields missing data', { errors: requiredAddressFieldErrors }));
      }
    }

    if (!billingAddressData || !billingAddressData.country_code) {
      dispatch({
        type: 'checkout/billingAddress/setErrors',
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
      ...billingAddressData,
    });

    // Prevent user from submitting shipping address that is already in app state
    if (appShipping === localShipping) {
      if (memoizedBillingAddressErrors && Object.keys(memoizedBillingAddressErrors).length > 0) {
        return dispatch({
          type: 'checkout/billingAddress/set',
        });
      }
      return Promise.resolve();
    }

    const countryData = memoizedCountryInfo.find((data) => data.iso_code === billingAddressData.country_code);
    const country = countryData?.name;

    if (countryData?.show_province && !billingAddressData.province_code) {
      dispatch({
        type: 'checkout/billingAddress/setErrors',
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
    if (countryData?.show_postal_code && !billingAddressData.postal_code) {
      dispatch({
        type: 'checkout/billingAddress/setErrors',
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

    const provinceData = countryData?.provinces.find((data) => data.iso_code === billingAddressData.province_code);
    if (!provinceData) {
      dispatch({
        type: 'checkout/billingAddress/setIncomplete',
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
      ...billingAddressData,
      country,
      province,
    };

    dispatch({
      type: 'checkout/billingAddress/setting',
    });

    try {
      const response = await updateBillingAddress(token, apiPath, completeAddress);
      const error = handleError('billingAddress', response);
      if (error) {
        if (onError) {
          onError(error.error);
        }

        dispatch({
          type: `checkout/${error.type}/setErrors`,
          payload: error.payload,
        });

        return Promise.reject(error.error);
      }

      dispatch({
        type: 'checkout/update',
        payload: response.data.application_state,
      });

      return dispatch({
        type: 'checkout/billingAddress/set',
        payload: response.data.address,
      });
    } catch (e) {
      if (onError) {
        onError(e);
      }
      dispatch({
        type: 'checkout/order/setErrors',
        payload: [{
          field: 'order',
          message: 'An error with your order has occured, please try again',
        }],
      });
      return Promise.reject(new OrderError());
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
