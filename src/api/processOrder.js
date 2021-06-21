const processOrder = async (csrf, apiPath) => {
  const response = await fetch(`${apiPath}/process_order`, {
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

export default processOrder;
