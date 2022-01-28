import { ApplicationState, FetchResponse } from '../types';
import { fetchApi } from '../utils';

const processOrder = async (token: string, apiPath: string): Promise<FetchResponse<{application_state: ApplicationState}>> => {
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
