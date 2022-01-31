/* eslint-disable no-unused-expressions */
import {
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { processOrder } from '../api';
import { CheckoutStore } from '../store';
import { CheckoutError } from '../types';
import { ActionErrorType, ActionType, LoadingState, PigiActionType } from '../types/enums';
import { handleError, OrderError } from '../utils';

const usePaymentIframe = () : {
  data: {
    url: string,
    height: number
  },
  loadingStatus: LoadingState,
  errors: CheckoutError[] | null,
  processPaymentIframe: () => Promise<void>,
  paymentIframeOnLoaded: () => Promise<void>,
  displayErrorMessage: () => Promise<void>,
  clearErrorMessage: () => Promise<void>
} => {
  const { state, dispatch, onError } = useContext(CheckoutStore);
  const [paymentIframeHeight, setPaymentIframeHeight] = useState(0);
  const { token, apiPath } = state;
  const paymentIframeLoadingStatus = state.loadingStatus.paymentIframe;
  const paymentIframeErrors = state.errors.paymentIframe;
  const paymentIframeUrl = `${apiPath}/payments/iframe?token=${token}`;
  const memoizedPaymentIframeErrors = useMemo(() => paymentIframeErrors, [JSON.stringify(paymentIframeErrors)]);

  const dispatchIframeAction = async (actionType: PigiActionType, payload?: any): Promise<void> => new Promise((resolve, reject) => {
    const iframeListener = (e: any): void => {
      if (e?.data?.responseType === actionType) {
        if (e?.data?.payload?.success) {
          window.removeEventListener('message', iframeListener);
          resolve();
        } else {
          window.removeEventListener('message', iframeListener);
          reject();
        }
      }
    };

    const paymentIframe: HTMLIFrameElement | null = document.querySelector('[data-bold-pigi-iframe]');

    const payloadData = {
      actionType,
      payload,
    };

    if (paymentIframe) {
      window.addEventListener('message', iframeListener);
        paymentIframe?.contentWindow?.postMessage(payloadData, '*');
    } else {
      reject();
    }
  });

  const refreshOrder = () => dispatchIframeAction(PigiActionType.PigiRefreshOrder);

  const submitOrder = useCallback(async () => {
    dispatch({
      type: ActionType.Checkout_Order_Processing,
    });

    try {
      const response = await processOrder(token, apiPath);
      const error = handleError(ActionErrorType.Checkout_Order_SetErrors, response);
      if (error) {
        if (onError) {
          onError(error.error);
        }

        dispatch({
          type: error.type,
          payload: error.payload,
        });

        return Promise.reject(error.error);
      }

      dispatch({
        type: ActionType.Checkout_Order_Processed,
      });

      if(response.data?.application_state){
        return dispatch({
          type: ActionType.Checkout_Update,
          payload: response.data.application_state,
        });
      } else {
        return Promise.reject(new OrderError());
      }
    } catch (e) {
      const { message } = e as Error;
      dispatch({
        type: ActionErrorType.Checkout_Order_SetErrors,
        payload: [{
          field: 'order',
          message: message,
        }],
      });

      if (onError) {
        onError(e);
      }

      dispatch({
        type: ActionErrorType.Checkout_Order_SetErrors,
        payload: [{
          field: 'order',
          message: 'An error with your order has occurred, please try again',
        }],
      });

      return Promise.reject(new OrderError());
    }
  }, [onError]);

  const addPayment = useCallback(async () => {
    try {
      await dispatchIframeAction('PIGI_ADD_PAYMENT');
      await submitOrder();
      return Promise.resolve();
    } catch (e) {
      dispatch({
        type: 'checkout/paymentIframe/setPaymentIframeErrors',
        payload: [{
          field: 'payment',
          message: 'Unprocessable order',
        }],
      });

      if (onError) {
        onError(e);
      }

      dispatch({
        type: 'checkout/order/setErrors',
        payload: [{
          field: 'order',
          message: 'An error with your order has occured, please try again',
        }],
      });

      return Promise.reject(new OrderError());
    }
  }, [dispatchIframeAction, submitOrder, onError]);

  const updateLanguage = useCallback((language) => dispatchIframeAction('PIGI_UPDATE_LANGUAGE', { language }));

  const displayErrorMessage = useCallback((message, subType) => {
    const payload = {
      error: {
        message,
        sub_type: subType,
      },
    };

    return dispatchIframeAction('PIGI_DISPLAY_ERROR_MESSAGE', payload);
  }, [dispatchIframeAction]);

  const clearErrorMessage = useCallback(() => dispatchIframeAction('PIGI_CLEAR_ERROR_MESSAGES'));

  const selectPaymentMethod = useCallback((payload) => {
    const payloadData = {
      index: payload.index,
      gatewayName: payload.gatewayName,
    };

    return dispatchIframeAction('PIGI_SELECT_PAYMENT_METHOD', payloadData);
  });

  const processPaymentIframe = useCallback(async () => {
    dispatch({
      type: 'checkout/paymentIframe/authorizing',
    });

    try {
      // TODO: Remove refreshOrder once this is implemented into PIGI
      await refreshOrder();
      await addPayment();
      return Promise.resolve();
    } catch (e) {
      dispatch({
        type: 'checkout/paymentIframe/setPaymentIframeErrors',
        payload: [{
          field: 'payment',
          message: 'Payment iframe does not exist',
        }],
      });

      if (onError) {
        onError(e);
      }

      dispatch({
        type: 'checkout/order/setErrors',
        payload: [{
          field: 'order',
          message: 'An error with your order has occured, please try again',
        }],
      });

      return Promise.reject(new OrderError());
    }
  }, [onError, refreshOrder, addPayment]);

  const paymentIframeOnLoaded = () => {
    dispatch({
      type: 'checkout/paymentIframe/fetched',
    });
  };

  const heightChangeListener = (event) => {
    const height = event?.data?.height || event?.data?.payload?.height;

    if (height) {
      setPaymentIframeHeight(height);
    }
  };

  useEffect(() => {
    dispatch({
      type: 'checkout/paymentIframe/fetching',
    });
  }, []);

  useEffect(() => {
    window.addEventListener('message', heightChangeListener);

    return () => window.removeEventListener('message', heightChangeListener);
  }, []);

  return {
    data: {
      url: paymentIframeUrl,
      height: paymentIframeHeight,
    },
    loadingStatus: paymentIframeLoadingStatus,
    errors: memoizedPaymentIframeErrors,
    processPaymentIframe,
    paymentIframeOnLoaded,
    displayErrorMessage,
    clearErrorMessage,
    selectPaymentMethod,
    updateLanguage,
  };
};

export default usePaymentIframe;
