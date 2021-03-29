import {
  useCallback, useContext, useState,
} from 'react';
import CheckoutContext from '../components/Context';
import {
  getCountryList, postAddress, verifyAddress,
} from '../helpers/address';

const useBillingAddress = () => {
  const {
    apiPath,
    initialData,
    setApplicationState,
    billingAddress,
    billingErrors,
    setBillingErrors,
    csrf,
  } = useContext(CheckoutContext);

  const [loadingBillingAddress, setLoadingBillingAddress] = useState(false);
  const addressEndpoint = `${apiPath}/addresses/billing`;
  // eslint-disable-next-line camelcase
  const { country_info } = initialData;
  const billingAddressCountries = getCountryList(country_info);

  const validateAddress = useCallback((data, path, token) => verifyAddress(path, billingAddressCountries, data, token), []);

  const submitAddress = useCallback(async (data, token) => {
    const response = await postAddress(addressEndpoint, billingAddressCountries, data, token);
    if (response) {
      setApplicationState(response);
    }
  }, []);

  const submitBillingAddress = useCallback(async (data) => {
    const selectedCountry = billingAddressCountries.find((country) => country.iso_code === data.country_code);
    const selectedProvince = selectedCountry ? Object.values(selectedCountry.provinces).find((province) => province.iso_code === data.province_code) : null;
    if (!csrf || !selectedCountry || (selectedCountry && selectedCountry.provinces.length > 0 && !selectedProvince)) return;
    setLoadingBillingAddress(true);
    const validationErrors = await validateAddress(data, apiPath, csrf);
    setBillingErrors(validationErrors);

    if (!validationErrors) {
      await submitAddress(data, csrf);
    }

    setLoadingBillingAddress(false);
  }, [submitAddress, validateAddress, csrf]);

  return {
    billingAddress,
    billingAddressErrors: billingErrors && Object.values(billingErrors).some((error) => error !== false) ? billingErrors : null,
    loadingBillingAddress,
    billingAddressCountries,
    submitBillingAddress,
  };
};

export default useBillingAddress;
