import fetchApi from '../utils/fetchApi';

export const validateShippingAddress = async (csrf, apiPath, address) => {
  const response = await fetchApi(`${apiPath}/validate_address?country_code=${address.country_code}&province=${address.province}&postal_code=${address.postal_code}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
  });

  return response;
};

export const updateShippingAddress = async (csrf, apiPath, address) => {
  const response = await fetchApi(`${apiPath}/addresses/shipping`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
    body: JSON.stringify(address),
  });

  return response;
};
