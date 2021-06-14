import { useCallback, useContext, useMemo } from 'react';
import {
  updateBillingAddress, updateShippingAddress, validateShippingAddress,
} from '../api';
import { CheckoutStore } from '../store';
import { generateTaxes, getShippingLines } from './shared';

const useShippingAddress = () => {
  const { state, dispatch } = useContext(CheckoutStore);
  const { csrf, apiPath } = state;
  const shippingAddress = state.applicationState.addresses.shipping;
  const shippingAddressErrors = state.errors.shippingAddress;
  const countryInfo = state.initialData.country_info;
  const { billingSameAsShipping } = state.orderInfo;

  const memoizedShippingAddress = useMemo(() => shippingAddress, [JSON.stringify(shippingAddress)]);
  const memoizedShippingAddressErrors = useMemo(() => shippingAddressErrors, [JSON.stringify(shippingAddressErrors)]);
  const memoizedCountryInfo = useMemo(() => countryInfo, []); // country info never changes, so no need to update it

  const submitShippingAddress = useCallback(async (shippingAddressData) => {
    if (!shippingAddressData || !shippingAddressData.country_code) return Promise.resolve();

    const appShipping = JSON.stringify(memoizedShippingAddress);
    const localShipping = JSON.stringify({
      ...memoizedShippingAddress,
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

    if ((countryData.show_province && !shippingAddressData.province_code) || (countryData.show_postal_code && !shippingAddressData.postal_code)) return Promise.resolve();

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

    const validationData = await validateShippingAddress(csrf, apiPath, completeAddress);
    if (validationData.errors) {
      dispatch({
        type: 'checkout/shippingAddress/setErrors',
        payload: validationData.errors,
      });

      return Promise.reject(new Error('Invalid shipping address'));
    }

    dispatch({
      type: 'checkout/shippingAddress/setting',
    });

    const shippingAddressResponse = await updateShippingAddress(csrf, apiPath, completeAddress);

    dispatch({
      type: 'checkout/shippingAddress/set',
      payload: shippingAddressResponse.data.address,
    });

    await generateTaxes(csrf, apiPath, dispatch);

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
      return dispatch({
        type: 'checkout/update',
        payload: billingAddressResponse.data.application_state,
      });
    }

    return dispatch({
      type: 'checkout/update',
      payload: shippingAddressResponse.data.application_state,
    });
  }, [memoizedShippingAddress, memoizedCountryInfo, billingSameAsShipping, memoizedShippingAddressErrors]);

  return {
    shippingAddress: memoizedShippingAddress,
    countryInfo: memoizedCountryInfo,
    shippingAddressErrors: memoizedShippingAddressErrors,
    submitShippingAddress,
  };
};

export default useShippingAddress;
