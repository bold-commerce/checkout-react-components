import React from 'react';
import { fetchShippingLines } from '../../api';
import { Action } from '../../types';
import { ActionErrorType, ActionType } from '../../types/enums';
import { handleError } from '../../utils';

const getShippingLines = async (token: string, apiPath: string, dispatch: React.Dispatch<Action>): Promise<void> => {
  dispatch({
    type: ActionType.Checkout_ShippingLines_Fetching,
  });
  const response = await fetchShippingLines(token, apiPath);
  const error = handleError(ActionErrorType.Checkout_ShippingLines_SetErrors, response);
  if (error) {
    dispatch({
      type: error.type,
      payload: error.payload,
    });

    return Promise.reject(error.error);
  }

  if (response.data && response.data.application_state) {
    dispatch({
      type: ActionType.Checkout_ShippingLines_Fetched,
    });
    return dispatch({
      type: ActionType.Checkout_Update,
      payload: response.data.application_state,
    });
  }

  return dispatch({
    type: ActionType.Checkout_ShippingLines_Fetched,
  });
};

export default getShippingLines;
