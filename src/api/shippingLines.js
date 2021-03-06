export const setShippingLine = async (csrf, apiPath, index) => {
  const response = await fetch(`${apiPath}/shipping_lines`, {
    mode: 'cors',
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
    body: JSON.stringify({
      index: index.toString(),
    }),
  });

  try {
    return response.json();
  } catch (e) {
    throw new Error('Something went wrong');
  }
};

export const fetchShippingLines = async (csrf, apiPath) => {
  const response = await fetch(`${apiPath}/shipping_lines`, {
    mode: 'cors',
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
  });

  try {
    return response.json();
  } catch (e) {
    throw new Error('Something went wrong');
  }
};
