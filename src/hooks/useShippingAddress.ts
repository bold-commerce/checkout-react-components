import { useCallback, useContext, useMemo } from 'react';
import { updateBillingAddress, updateShippingAddress } from '../api';
import { CheckoutStore } from '../store';
import { Address, ApplicationState, CheckoutError, FetchResponse } from '../types';
import { ActionErrorType, ActionType, LoadingState } from '../types/enums';
import { handleError, OrderError, PromiseError } from '../utils';
import { generateTaxes, getShippingLines, requiredAddressFieldValidation } from './shared';

const emptyAddress: Address = {
  id: '',
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
const useShippingAddress = (requiredAddressFields: (keyof Address)[]): {
  data: any,
  errors: CheckoutError[] | null,
  loadingStatus: LoadingState,
  submitShippingAddress: (shippingAddressData: Address) => Promise<void>
} => {
  const { state, dispatch, onError } = useContext(CheckoutStore);
  const { token, apiPath } = state;
  const shippingAddress = state.applicationState.addresses.shipping;
  const shippingAddressLoadingStatus = state.loadingStatus.shippingAddress;
  const shippingAddressErrors = state.errors.shippingAddress;
  const countryInfo = state.initialData.country_info;
  const { billingSameAsShipping } = state.orderInfo;
  const memoizedShippingAddress = useMemo(() => shippingAddress, [JSON.stringify(shippingAddress)]);
  const memoizedRequiredAddressFields = useMemo(() => requiredAddressFields, [JSON.stringify(requiredAddressFields)]);
  const memoizedShippingAddressErrors = useMemo(() => shippingAddressErrors, [JSON.stringify(shippingAddressErrors)]);
  const memoizedCountryInfo = useMemo(() => countryInfo, []); // country info never changes, so no need to update it

  const submitShippingAddress = useCallback(async (shippingAddressData: Address) => {
    if (requiredAddressFields) {
      const requiredAddressFieldErrors = requiredAddressFieldValidation(shippingAddressData, memoizedRequiredAddressFields);
      if (requiredAddressFieldErrors) {
        dispatch({
          type: ActionErrorType.Checkout_ShippingAddress_SetErrors,
          payload: requiredAddressFieldErrors,
        });
        return Promise.reject(new PromiseError('Required fields missing data', { errors: requiredAddressFieldErrors }));
      }
    }
    if (!shippingAddressData || !shippingAddressData.country_code) {
      dispatch({
        type: ActionErrorType.Checkout_ShippingAddress_SetErrors,
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
        return dispatch({
          type: ActionType.Checkout_ShippingAddress_Set,
        });
      }

      return Promise.resolve();
    }

    const countryData = memoizedCountryInfo.find((data) => data.iso_code === shippingAddressData.country_code);
    const country = countryData?.name ?? '';

    if (countryData?.show_province && !shippingAddressData.province_code) {
      dispatch({
        type: ActionErrorType.Checkout_ShippingAddress_SetErrors,
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
    if (countryData?.show_postal_code && !shippingAddressData.postal_code) {
      dispatch({
        type: ActionErrorType.Checkout_ShippingAddress_SetErrors,
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

    const provinceData = countryData?.provinces.find((data) => data.iso_code === shippingAddressData.province_code);
    if (!provinceData) {
      dispatch({
        type: ActionType.Checkout_ShippingAddress_SetIncomplete,
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

    dispatch({
      type: ActionType.Checkout_ShippingAddress_Setting,
    });

    let shippingAddressResponse: FetchResponse<{application_state: ApplicationState, address: Address}>;

    try {
      shippingAddressResponse = await updateShippingAddress(token, apiPath, completeAddress);
      const error = handleError(ActionErrorType.Checkout_ShippingAddress_SetErrors, shippingAddressResponse);
      if (error) {
        if (onError) {
          onError(error.error);
        }

        dispatch({
          type: error.type,
          payload: error.payload,
        });

        return Promise.reject(error.error);
      }

      dispatch({
        type: ActionType.Checkout_ShippingAddress_Set,
        payload: shippingAddressResponse.data?.address,
      });
    } catch (e) {
      if (onError) {
        onError(e);
      }

      dispatch({
        type: ActionErrorType.Checkout_Order_SetErrors,
        payload: [{
          field: 'order',
          message: 'An error with your order has occurred, please try again',
        }],
      });

      return Promise.reject(new OrderError());
    }

    if (shippingAddressData.country_code) {
      await getShippingLines(token, apiPath, dispatch);
    }

    // Set billing address if same as shipping is selected
    if (billingSameAsShipping) {
      const billingAddressResponse = await updateBillingAddress(token, apiPath, completeAddress);
      const error = handleError(ActionErrorType.Checkout_BillingAddress_SetErrors, shippingAddressResponse);
      if (error) {
        if (onError) {
          onError(error.error);
        }

        dispatch({
          type: error.type,
          payload: error.payload,
        });

        return Promise.reject(error.error);
      }

      dispatch({
        type: ActionType.Checkout_BillingAddress_Set,
        payload: billingAddressResponse.data?.address,
      });

      if(billingAddressResponse.data?.application_state){
        dispatch({
          type: ActionType.Checkout_Update,
          payload: billingAddressResponse.data.application_state,
        });
      }

      return generateTaxes(token, apiPath, dispatch);
    }

    if(shippingAddressResponse.data?.application_state){
      dispatch({
        type: ActionType.Checkout_Update,
        payload: shippingAddressResponse.data?.application_state,
      });
    }

    return generateTaxes(token, apiPath, dispatch);
  }, [memoizedShippingAddress, memoizedCountryInfo, memoizedShippingAddressErrors, memoizedRequiredAddressFields, billingSameAsShipping, onError]);

  return {
    data: shippingAddress,
    errors: memoizedShippingAddressErrors,
    loadingStatus: shippingAddressLoadingStatus,
    submitShippingAddress,
  };
};

export default useShippingAddress;
