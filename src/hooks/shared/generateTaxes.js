import { fetchTaxes } from '../../api';

const generateTaxes = async (csrf, apiPath, dispatch) => {
  const response = await fetchTaxes(csrf, apiPath);
  if (response.data && response.data.application_state) {
    return dispatch({
      type: 'checkout/update',
      payload: response.data.application_state,
    });
  }
  return Promise.resolve();
};

export default generateTaxes;
