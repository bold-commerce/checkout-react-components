export const getCountryData = (countryInfo) => {
  const countryData = {};
  countryInfo.forEach((country) => {
    countryData[country.iso_code] = {
      show_province: country.show_province,
      show_postal_code: country.show_postal_code,
      province_label: country.province_label,
    };
  });
  return countryData;
};

export const getCountryList = (countryInfo) => {
  const unsortedCountries = Object.values(countryInfo);
  // eslint-disable-next-line no-nested-ternary
  const countries = unsortedCountries.sort((a, b) => ((a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
  return countries;
};

export const verifyAddress = (apiPath, countries, address, csrf) => {
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
        response.errors.forEach((error) => {
          if (error.field === 'address.postcode') {
            errors.postal_code = true;
          } else {
            errors[error.field] = true;
          }
          if (error.field === 'postal_code' || error.field === 'address.postcode') {
            errors.postal_code_error_message = error.message;
          }
        });

        return errors;
      }

      return null;
    });
};

export const postAddress = (addressEndpoint, countries, address, csrf) => {
  const selectedCountry = countries.find((country) => country.iso_code === address.country_code);
  const selectedProvince = Object.values(selectedCountry.provinces).find((province) => province.iso_code === address.province_code);
  if (!csrf || (selectedCountry && selectedCountry.provinces.length > 0 && !selectedProvince)) return null;

  return fetch(addressEndpoint, {
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
    .then((response) => response.data.application_state)
    .catch(() => null);
};
