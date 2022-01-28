import { FetchResponse } from '../types';
import { fetchApi } from '../utils';

const fetchTaxes = async (token: string, apiPath: string): Promise<FetchResponse> => {
  const response = await fetchApi(`${apiPath}/taxes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export default fetchTaxes;
