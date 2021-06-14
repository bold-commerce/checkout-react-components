import { fetchShippingLines } from '../../api';

const getShippingLines = async (csrf, apiPath, dispatch) => {
  dispatch({
    type: 'checkout/shippingLines/fetching',
  });
  const response = await fetchShippingLines(csrf, apiPath);
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
