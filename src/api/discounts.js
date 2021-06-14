export const validateDiscount = async (csrf, apiPath, code) => {
  const response = await fetch(`${apiPath}/validate_discount_code?discount_code=${code}`, {
    mode: 'cors',
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
  });

  return response.json();
};

export const addDiscount = async (csrf, apiPath, code) => {
  const response = await fetch(`${apiPath}/discounts`, {
    mode: 'cors',
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
    body: JSON.stringify({
      code,
    }),
  });
  return response.json();
};

export const removeDiscount = async (csrf, apiPath, code) => {
  const response = await fetch(`${apiPath}/discounts`, {
    mode: 'cors',
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
    body: JSON.stringify({
      code,
    }),
  });
  return response.json();
};
