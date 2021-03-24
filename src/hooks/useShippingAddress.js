import {
  useCallback, useContext, useState,
} from 'react';
import CheckoutContext from '../components/Context';
import {
  getCountryList, postAddress, verifyAddress,
} from '../helpers/address';

const useShippingAddress = () => {
  const {
    apiPath,
    initialData,
    setApplicationState,
    shippingAddress,
    shippingErrors,
    setShippingErrors,
    csrf,
  } = useContext(CheckoutContext);

  const [loadingShippingAddress, setLoadingShippingAddress] = useState(false);
  const addressEndpoint = `${apiPath}/addresses/shipping`;
  // eslint-disable-next-line camelcase
  const { country_info } = initialData;
  const shippingAddressCountries = getCountryList(country_info);

  const validateAddress = useCallback((data, path, token) => verifyAddress(path, shippingAddressCountries, data, token), []);

  const submitAddress = useCallback(async (data, token) => {
    const response = await postAddress(addressEndpoint, shippingAddressCountries, data, token);
    if (response) {
      setApplicationState(response);
    }
  }, []);

  const submitShippingAddress = useCallback(async (data) => {
    const selectedCountry = shippingAddressCountries.find((country) => country.iso_code === data.country_code);
    const selectedProvince = selectedCountry ? Object.values(selectedCountry.provinces).find((province) => province.iso_code === data.province_code) : null;
    if (!csrf || !selectedCountry || (selectedCountry && selectedCountry.provinces.length > 0 && !selectedProvince)) return;
    setLoadingShippingAddress(true);
    const validationErrors = await validateAddress(data, apiPath, csrf);
    setShippingErrors(validationErrors);

    if (!validationErrors) {
      await submitAddress(data, csrf);
    }

    setLoadingShippingAddress(false);
  }, [submitAddress, validateAddress, csrf]);

  return {
    shippingAddress,
    shippingAddressErrors: shippingErrors && Object.values(shippingErrors).some((error) => error !== false) ? shippingErrors : null,
    loadingShippingAddress,
    shippingAddressCountries,
    submitShippingAddress,
  };
};

export default useShippingAddress;
