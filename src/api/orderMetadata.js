import { fetchApi } from '../utils';

export const deleteOrderMetadata = async (csrf, apiPath) => {
  const response = await fetchApi(`${apiPath}/meta_data`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
  });

  return response;
};

export const postOrderMetadata = async (csrf, apiPath, newOrderMetadata) => {
  const response = await fetchApi(`${apiPath}/meta_data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
    body: JSON.stringify(
      newOrderMetadata,
    ),
  });

  return response;
};

export const patchOrderMetadata = async (csrf, apiPath, requestBody) => {
  const response = await fetchApi(`${apiPath}/meta_data`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
    body: JSON.stringify(
      requestBody,
    ),
  });

  return response;
};
