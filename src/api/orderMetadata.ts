import { OrderMetaData, FetchResponse } from '../types';
import { fetchApi } from '../utils';

export const deleteOrderMetadata = async (token: string, apiPath: string): Promise<FetchResponse> => {
  const response = await fetchApi(`${apiPath}/meta_data`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const postOrderMetadata = async (token: string, apiPath: string, newOrderMetadata: OrderMetaData): Promise<FetchResponse> => {
  const response = await fetchApi(`${apiPath}/meta_data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(
      newOrderMetadata,
    ),
  });

  return response;
};

export const patchOrderMetadata = async (token: string, apiPath: string, orderMetadata: OrderMetaData): Promise<FetchResponse> => {
  const response = await fetchApi(`${apiPath}/meta_data`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(
      orderMetadata,
    ),
  });

  return response;
};
