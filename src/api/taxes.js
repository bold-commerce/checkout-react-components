import { fetchApi } from '../utils';

const fetchTaxes = async (csrf, apiPath) => {
  const response = await fetchApi(`${apiPath}/taxes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
  });

  return response;
};

export default fetchTaxes;
