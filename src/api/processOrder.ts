import { fetchApi, FetchResponse } from '../utils';

const processOrder = async (token: string, apiPath: string): Promise<FetchResponse> => {
  const response = await fetchApi(`${apiPath}/process_order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export default processOrder;
