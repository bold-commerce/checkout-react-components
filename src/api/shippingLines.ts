import { FetchResponse } from '../types';
import { fetchApi } from '../utils';

export const setShippingLine = async (token: string, apiPath: string, index: number): Promise<FetchResponse> => {
  const response = await fetchApi(`${apiPath}/shipping_lines`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      index: index.toString(),
    }),
  });

  return response;
};

export const fetchShippingLines = async (token: string, apiPath: string): Promise<FetchResponse> => {
  const response = await fetchApi(`${apiPath}/shipping_lines`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
