import {
  useEffect, useState, useContext, useCallback,
} from 'react';
import CheckoutContext from '../components/Context';

const useAddress = (addressType) => {
  const {
    apiPath,
    csrf,
    initialData,
    setApplicationState,
    shippingAddress,
    setShippingAddress,
    billingAddress,
    setBillingAddress,
    shippingErrors,
    setShippingErrors,
    billingErrors,
    setBillingErrors,
  } = useContext(CheckoutContext);

  const errors = addressType === 'Shipping' ? shippingErrors : billingErrors;
  const setErrors = addressType === 'Shipping' ? setShippingErrors : setBillingErrors;
  const [isLoading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const addressEndpoint = `${apiPath}/addresses/${addressType === 'Shipping' ? 'shipping' : 'billing'}`;
  const address = addressType === 'Shipping' ? shippingAddress : billingAddress;
  const setAddress = addressType === 'Shipping' ? setShippingAddress : setBillingAddress;

  const unsortedCountries = Object.values(initialData.country_info);
  const countries = unsortedCountries.sort((a, b) => ((a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));

  const { country_info } = initialData;
  const countryData = {};
  country_info.forEach((country) => {
    countryData[country.iso_code] = {
      show_province: country.show_province,
      show_postal_code: country.show_postal_code,
      province_label: country.province_label,
    };
  });


  const validateAddress = useCallback(async () => {
    const selectedCountry = countries.find((country) => country.iso_code === address.country_code);
    const selectedProvince = Object.values(selectedCountry.provinces).find((province) => province.iso_code === address.province_code);
    const errors = {
      first_name: address.first_name.length === 0,
      last_name: address.last_name.length === 0,
      address: address.address_line_1.length === 0,
      city: address.city.length === 0,
      country: address.country_code.length === 0,
      province: address.province_code.length === 0,
      postal_code: false,
      postal_code_error_message: '',
    };


    return fetch(`${apiPath}/validate_address?country_code=${address.country_code}&province=${selectedProvince && selectedProvince.name}&postal_code=${address.postal_code}`, {
      mode: 'cors',
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrf,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (Array.isArray(response.errors)) {
          for (const error of response.errors) {
            if (error.field === 'address.postcode') {
              errors.postal_code = true;
            } else {
              errors[error.field] = true;
            }
            if (error.field === 'postal_code' || error.field === 'address.postcode') {
              errors.postal_code_error_message = error.message;
            }
          }
          return errors;
        }
        return Object.values(errors).some((error) => error != false) ? errors : null;
      });
  }, [address]);

  const submitAddress = useCallback(async () => {
    const selectedCountry = countries.find((country) => country.iso_code === address.country_code);
    const selectedProvince = Object.values(selectedCountry.provinces).find((province) => province.iso_code === address.province_code);
    if (!csrf || (selectedCountry && selectedCountry.provinces.length > 0 && !selectedProvince)) return;

    fetch(addressEndpoint, {
      mode: 'cors',
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrf,
      },
      body: JSON.stringify({
        ...address,
        country: selectedCountry?.name ?? null,
        province: selectedProvince?.name ?? null,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setApplicationState(response.data.application_state);
      });
  }, [address, csrf]);

  const handleSubmit = useCallback(async () => {
    const selectedCountry = countries.find((country) => country.iso_code === address.country_code);
    const selectedProvince = selectedCountry ? Object.values(selectedCountry.provinces).find((province) => province.iso_code === address.province_code) : null;

    const fields = {
      first_name: address.first_name.length === 0,
      last_name: address.last_name.length === 0,
      address: address.address_line_1.length === 0,
      city: address.city.length === 0,
      country: address.country_code.length === 0,
      province: address.province_code.length === 0,
      postal_code: address.postal_code.length === 0,
    };

    // if (fields.some(() => {}))

    if (!csrf || !selectedCountry || (selectedCountry && selectedCountry.provinces.length > 0 && !selectedProvince)) return;
    setLoading(true);
    const validationErrors = await validateAddress(address, apiPath, csrf);
    setErrors(validationErrors);

    if (!validationErrors) {
      await submitAddress();
    }

    setLoading(false);
  }, [address, submitAddress, validateAddress]);

  useEffect(() => {
    const selectedCountry = countries.find((country) => country.iso_code === address.country_code);

    if (selectedCountry) {
      setProvinces(selectedCountry.provinces);

      const isValidProvince = selectedCountry.provinces.findIndex((province) => province.iso_code === address.province_code);

      if (isValidProvince === -1) {
        setAddress((prevState) => ({
          ...prevState,
          province_code: '',
        }));
      }

      if (selectedCountry.provinces.length) {
        submitAddress();
      }
    }
  }, [address.country_code]);

  const updateAddress = (value) => {
    setAddress((prevState) => ({
      ...prevState,
      ...value,
    }));
  };

  return {
    address,
    setAddress: updateAddress,
    errors: errors && Object.values(errors).some((error) => error != false) ? errors : null,
    isLoading,
    countries,
    provinces,
    handleSubmit,
    countryData,
  };
};

export default useAddress;
