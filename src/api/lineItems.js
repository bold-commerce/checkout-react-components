export const addLineItem = async (csrf, apiPath, data) => {
  const response = await fetch(`${apiPath}/items`, {
    mode: 'cors',
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const updateLineItem = async (csrf, apiPath, data) => {
  const response = await fetch(`${apiPath}/items`, {
    mode: 'cors',
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const removeLineItem = async (csrf, apiPath, lineItemKey) => {
  const data = {
    quantity: 0,
    line_item_key: lineItemKey,
  };

  const response = await fetch(`${apiPath}/items`, {
    mode: 'cors',
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
