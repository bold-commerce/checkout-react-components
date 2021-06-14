export const validateCustomer = async (csrf, apiPath, customer) => {
  const email = encodeURIComponent(customer.email_address);

  const response = await fetch(`${apiPath}/validate_email_address?email_address=${email}`, {
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

export const updateCustomer = async (csrf, apiPath, customer, method) => {
  const response = await fetch(`${apiPath}/customer/guest`, {
    mode: 'cors',
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
    body: JSON.stringify({
      ...customer,
    }),
  });

  return response.json();
};
