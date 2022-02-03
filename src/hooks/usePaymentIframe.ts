/* eslint-disable no-unused-expressions */
import {
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { processOrder } from '../api';
import { CheckoutStore } from '../store';
import { CheckoutError, PaymentMethodPayload } from '../types';
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
  paymentIframeOnLoaded: () => void,
  displayErrorMessage: (message: string, subType: string) => Promise<void>,
  clearErrorMessage: () => Promise<void>,
  selectPaymentMethod: (payload: PaymentMethodPayload) => Promise<void>,
  updateLanguage: (language: string) => Promise<void>
} => {
  const { state, dispatch, onError } = useContext(CheckoutStore);
  const [paymentIframeHeight, setPaymentIframeHeight] = useState<number>(0);
  const { token, apiPath } = state;
  const paymentIframeLoadingStatus = state.loadingStatus.paymentIframe;
  const paymentIframeErrors = state.errors.paymentIframe;
  const paymentIframeUrl = `${apiPath}/payments/iframe?token=${token}`;
  const memoizedPaymentIframeErrors = useMemo(() => paymentIframeErrors, [JSON.stringify(paymentIframeErrors)]);

  const dispatchIframeAction = async (actionType: PigiActionType, payload?: any): Promise<void> => new Promise((resolve, reject) => {
    const iframeListener = (e: MessageEvent): void => {
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

  const refreshOrder = (): Promise<void> => dispatchIframeAction(PigiActionType.PigiRefreshOrder);

  const submitOrder = useCallback(async (): Promise<void> => {
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

  const addPayment = useCallback(async (): Promise<void> => {
    try {
      await dispatchIframeAction(PigiActionType.PigiAddPayment);
      await submitOrder();
      return Promise.resolve();
    } catch (e) {
      dispatch({
        type: ActionErrorType.Checkout_PaymentIframe_SetPaymentIframeErrors,
        payload: [{
          field: 'payment',
          message: 'Unprocessable order',
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
  }, [dispatchIframeAction, submitOrder, onError]);

  const updateLanguage = useCallback((language: string): Promise<void> => dispatchIframeAction(PigiActionType.PigiUpdateLanguage, { language }), []);

  const displayErrorMessage = useCallback((message: string, subType: string): Promise<void> => {
    const payload = {
      error: {
        message,
        sub_type: subType,
      },
    };

    return dispatchIframeAction(PigiActionType.PigiDisplayErrorMessage, payload);
  }, [dispatchIframeAction]);

  const clearErrorMessage = useCallback((): Promise<void> => dispatchIframeAction(PigiActionType.PigiClearErrorMessages), []);

  const selectPaymentMethod = useCallback((payload: PaymentMethodPayload): Promise<void> => {
    const payloadData = {
      index: payload.index,
      gatewayName: payload.gatewayName,
    };

    return dispatchIframeAction(PigiActionType.PigiSelectPaymentMethod, payloadData);
  }, []);

  const processPaymentIframe = useCallback(async (): Promise<void> => {
    dispatch({
      type: ActionType.Checkout_PaymentIframe_Authorizing,
    });

    try {
      // TODO: Remove refreshOrder once this is implemented into PIGI
      await refreshOrder();
      await addPayment();
      return Promise.resolve();
    } catch (e) {
      dispatch({
        type: ActionErrorType.Checkout_PaymentIframe_SetPaymentIframeErrors,
        payload: [{
          field: 'payment',
          message: 'Payment iframe does not exist',
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
  }, [onError, refreshOrder, addPayment]);

  const paymentIframeOnLoaded = (): void => {
    dispatch({
      type: ActionType.Checkout_PaymentIframe_Fetched,
    });
  };

  const heightChangeListener = (event: MessageEvent): void => {
    const height = event?.data?.height || event?.data?.payload?.height;

    if (height) {
      setPaymentIframeHeight(height);
    }
  };

  useEffect((): void => {
    dispatch({
      type: ActionType.Checkout_PaymentIframe_Fetching,
    });
  }, []);

  useEffect((): (() => void) => {
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
