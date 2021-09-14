import fetchApi from '../utils/fetchApi';

export const validateCustomer = async (csrf, apiPath, customer) => {
  const email = encodeURIComponent(customer.email_address);

  const response = await fetchApi(`${apiPath}/validate_email_address?email_address=${email}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
  });

  return response;
};

export const updateCustomer = async (csrf, apiPath, customer, method) => {
  const response = await fetchApi(`${apiPath}/customer/guest`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
    body: JSON.stringify(customer),
  });

  return response;
};
