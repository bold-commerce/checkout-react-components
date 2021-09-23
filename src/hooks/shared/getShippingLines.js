import { fetchShippingLines } from '../../api';

const getShippingLines = async (token, apiPath, dispatch, dispatchStatus) => {
  dispatchStatus({
    type: 'checkout/shippingLines/fetching',
  });
  const response = await fetchShippingLines(token, apiPath);
  if (!response.success) {
    if (response.error?.body?.errors) {
      dispatchStatus({
        type: 'checkout/shippingLines/setErrors',
        payload: response.error.body.errors,
      });
      return Promise.reject(response.error);
    }

    dispatchStatus({
      type: 'checkout/shippingLines/setErrors',
      payload: [{
        field: 'order',
        message: 'Something went wrong',
      }],
    });

    return Promise.reject(response.error);
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
