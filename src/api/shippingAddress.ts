import { Address } from '../types/Address';
import { fetchApi, FetchResponse } from '../utils';

export const validateShippingAddress = async (token: string, apiPath: string, address: Address): Promise<FetchResponse> => {
  const response = await fetchApi(`${apiPath}/validate_address?country_code=${address.country_code}&province=${address.province}&postal_code=${address.postal_code}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const updateShippingAddress = async (token: string, apiPath: string, address: Address): Promise<FetchResponse> => {
  const response = await fetchApi(`${apiPath}/addresses/shipping`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(address),
  });

  return response;
};