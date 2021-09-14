import { fetchApi } from '../utils';

export const validateBillingAddress = async (csrf, apiPath, address) => {
  const response = await fetchApi(`${apiPath}/validate_address?country_code=${address.country_code}&province=${address.province}&postal_code=${address.postal_code}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
  });

  return response;
};

export const updateBillingAddress = async (csrf, apiPath, address) => {
  const response = await fetchApi(`${apiPath}/addresses/billing`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
    body: JSON.stringify(address),
  });

  return response;
};
