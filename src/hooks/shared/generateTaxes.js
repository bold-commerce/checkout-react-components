import { fetchTaxes } from '../../api';

const generateTaxes = async (token, apiPath, dispatch) => {
  const response = await fetchTaxes(token, apiPath);
  if (!response.success) {
    if (response.error.errors) {
      dispatch({
        type: 'checkout/taxes/setErrors',
        payload: response.error.errors,
      });
      return Promise.reject(response.error);
    }

    // TODO: Handle server error
    return Promise.reject(response.error);
  }

  if (response.data && response.data.application_state) {
    return dispatch({
      type: 'checkout/update',
      payload: response.data.application_state,
    });
  }
  return Promise.resolve();
};

export default generateTaxes;
