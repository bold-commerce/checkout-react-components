import { fetchApi } from '../utils';

export const validateDiscount = async (csrf, apiPath, code) => {
  const response = await fetchApi(`${apiPath}/validate_discount_code?discount_code=${code}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
  });

  return response;
};

export const addDiscount = async (csrf, apiPath, code) => {
  const response = await fetchApi(`${apiPath}/discounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
    body: JSON.stringify({
      code,
    }),
  });

  return response;
};

export const removeDiscount = async (csrf, apiPath, code) => {
  const response = await fetchApi(`${apiPath}/discounts`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
    body: JSON.stringify({
      code,
    }),
  });

  return response;
};
