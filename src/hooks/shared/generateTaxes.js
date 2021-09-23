import { fetchTaxes } from '../../api';

const generateTaxes = async (token, apiPath, dispatch, dispatchStatus) => {
  const response = await fetchTaxes(token, apiPath);
  if (!response.success) {
    if (response.error?.body?.errors) {
      dispatchStatus({
        type: 'checkout/taxes/setErrors',
        payload: response.error.body.errors,
      });
      return Promise.reject(response.error);
    }

    dispatchStatus({
      type: 'checkout/taxes/setErrors',
      payload: [{
        field: 'order',
        message: 'Something went wrong',
      }],
    });

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
