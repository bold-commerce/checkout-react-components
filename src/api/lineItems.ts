import { LineItem, FetchResponse, ApplicationState } from '../types';
import { fetchApi  } from '../utils';

export const addLineItem = async (token: string, apiPath: string, data: LineItem): Promise<FetchResponse<{application_state: ApplicationState, line_item: LineItem}>> => { 
  const response = await fetchApi(`${apiPath}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response;
};

export const updateLineItem = async (token: string, apiPath: string, data: LineItem): Promise<FetchResponse<{application_state: ApplicationState, line_item: LineItem}>> => {
  const response = await fetchApi(`${apiPath}/items`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response;
};

export const removeLineItem = async (token: string, apiPath: string, lineItemKey: string): Promise<FetchResponse<{application_state: ApplicationState}>> => {
  const response = await fetchApi(`${apiPath}/items`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      quantity: 0,
      line_item_key: lineItemKey,
    }),
  });

  return response;
};
