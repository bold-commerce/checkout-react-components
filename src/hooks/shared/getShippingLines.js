import { fetchShippingLines } from '../../api';

const getShippingLines = async (token, apiPath, dispatch) => {
  dispatch({
    type: 'checkout/shippingLines/fetching',
  });
  const response = await fetchShippingLines(token, apiPath);
  if (!response.success) {
    if (response.error.errors) {
      dispatch({
        type: 'checkout/shippingLines/setErrors',
        payload: response.error.errors,
      });
      return Promise.reject(response.error);
    }

    // TODO: Handle server error
    return Promise.reject(response.error);
  }

  if (response.data && response.data.application_state) {
    dispatch({
      type: 'checkout/shippingLines/fetched',
    });
    return dispatch({
      type: 'checkout/update',
      payload: response.data.application_state,
    });
  }

  return dispatch({
    type: 'checkout/shippingLines/fetched',
  });
};

export default getShippingLines;
