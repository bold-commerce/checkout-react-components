import { fetchShippingLines } from '../../api';
import { handleError } from '../../utils';

const getShippingLines = async (token, apiPath, dispatch, dispatchStatus) => {
  dispatchStatus({
    type: 'checkout/shippingLines/fetching',
  });
  const response = await fetchShippingLines(token, apiPath);
  const error = handleError('shippingLines', response);
  if (error) {
    dispatchStatus({
      type: `checkout/${error.type}/setErrors`,
      payload: error.payload,
    });

    return Promise.reject(error.error);
  }

  if (response.data && response.data.application_state) {
    dispatchStatus({
      type: 'checkout/shippingLines/fetched',
    });
    return dispatch({
      type: 'checkout/update',
      payload: response.data.application_state,
    });
  }

  return dispatchStatus({
    type: 'checkout/shippingLines/fetched',
  });
};

export default getShippingLines;
