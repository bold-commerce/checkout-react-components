export const validateBillingAddress = async (csrf, apiPath, address) => {
  const response = await fetch(`${apiPath}/validate_address?country_code=${address.country_code}&province=${address.province}&postal_code=${address.postal_code}`, {
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

export const updateBillingAddress = async (csrf, apiPath, address) => {
  const response = await fetch(`${apiPath}/addresses/billing`, {
    mode: 'cors',
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
    body: JSON.stringify(address),
  });

  return response.json();
};
