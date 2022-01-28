import React from 'react';
import { fetchTaxes } from '../../api';
import { Action } from '../../types';
import { ActionType, ActionErrorType } from '../../types/enums';
import { handleError } from '../../utils';

const generateTaxes = async (token: string, apiPath: string, dispatch: React.Dispatch<Action>): Promise<void> => {
  const response = await fetchTaxes(token, apiPath);
  const error = handleError(ActionErrorType.Checkout_Taxes_SetErrors, response);
  if (error) {
    dispatch({
      type: error.type,
      payload: error.payload,
    });

    return Promise.reject(error.error);
  }

  if (response.data && response.data.application_state) {
    return dispatch({
      type: ActionType.Checkout_Update,
      payload: response.data.application_state,
    });
  }
  return Promise.resolve();
};

export default generateTaxes;
