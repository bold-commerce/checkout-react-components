import { ApplicationState, Discount, FetchResponse } from '../types';
import { fetchApi} from '../utils';

export const validateDiscount = async (token: string, apiPath: string, code: string): Promise<FetchResponse<undefined>> => {
  const response = await fetchApi(`${apiPath}/validate_discount_code?discount_code=${code}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const addDiscount = async (token: string, apiPath: string, code: string): Promise<FetchResponse<{application_state: ApplicationState, discount: Discount}>> => {
  const response = await fetchApi(`${apiPath}/discounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      code,
    }),
  });

  return response;
};

export const removeDiscount = async (token: string, apiPath: string, code: string): Promise<FetchResponse<{application_state: ApplicationState}>> => {
  const response = await fetchApi(`${apiPath}/discounts`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      code,
    }),
  });

  return response;
};
