const fetchTaxes = async (csrf, apiPath) => {
  const response = await fetch(`${apiPath}/taxes`, {
    mode: 'cors',
    method: 'POST',
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

export default fetchTaxes;
