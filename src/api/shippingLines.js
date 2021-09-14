import { fetchApi } from '../utils';

export const setShippingLine = async (csrf, apiPath, index) => {
  const response = await fetchApi(`${apiPath}/shipping_lines`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
    body: JSON.stringify({
      index: index.toString(),
    }),
  });

  return response;
};

export const fetchShippingLines = async (csrf, apiPath) => {
  const response = await fetchApi(`${apiPath}/shipping_lines`, {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
  });

  return response;
};
