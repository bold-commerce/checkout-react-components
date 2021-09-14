import { fetchApi } from '../utils';

const processOrder = async (csrf, apiPath) => {
  const response = await fetchApi(`${apiPath}/process_order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
  });

  return response;
};

export default processOrder;
