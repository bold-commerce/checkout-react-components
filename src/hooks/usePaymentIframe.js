/* eslint-disable no-unused-expressions */
import {
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { processOrder } from '../api';
import { CheckoutStatus, CheckoutStore } from '../store';
import { OrderError } from '../utils';

const usePaymentIframe = () => {
  const { state, dispatch, onError } = useContext(CheckoutStore);
  const { statusState, dispatchStatus } = useContext(CheckoutStatus);
  const [paymentIframeHeight, setPaymentIframeHeight] = useState(0);
  const { token, apiPath } = state;
  const paymentIframeLoadingStatus = statusState.loadingStatus.paymentIframe;
  const paymentIframeErrors = statusState.errors.paymentIframe;
  const paymentIframeUrl = `${apiPath}/payments/iframe?token=${token}`;
  const memoizedPaymentIframeErrors = useMemo(() => paymentIframeErrors, [JSON.stringify(paymentIframeErrors)]);

  const dispatchIframeAction = async (actionType, payload) => new Promise((resolve, reject) => {
    const iframeListener = (e) => {
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

    const paymentIframe = document.querySelector('[data-bold-pigi-iframe]');

    const payloadData = {
      actionType,
      payload,
    };

    if (paymentIframe) {
      window.addEventListener('message', iframeListener);
        paymentIframe?.contentWindow.postMessage(payloadData, '*');
    } else {
      reject();
    }
  });

  const refreshOrder = () => dispatchIframeAction('PIGI_REFRESH_ORDER');

  const submitOrder = useCallback(async () => {
    dispatchStatus({
      type: 'checkout/order/processing',
    });

    try {
      const response = await processOrder(token, apiPath);

      if (!response.success) {
        dispatchStatus({
          type: 'checkout/order/setErrors',
          payload: [{
            field: 'payment',
            message: response.error.message,
          }],
        });

        if (onError) {
          onError(response.error);
        }
        return Promise.reject(response.error);
      }

      dispatchStatus({
        type: 'checkout/order/processed',
      });

      return dispatch({
        type: 'checkout/update',
        payload: response.data.application_state,
      });
    } catch (e) {
      dispatchStatus({
        type: 'checkout/order/setErrors',
        payload: [{
          field: 'order',
          message: e.message,
        }],
      });

      if (onError) {
        onError(e);
      }

      dispatchStatus({
        type: 'checkout/order/setErrors',
        payload: [{
          field: 'order',
          message: 'An error with your order has occured, please try again',
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
      dispatchStatus({
        type: 'checkout/paymentIframe/setPaymentIframeErrors',
        payload: [{
          field: 'payment',
          message: 'Unprocessable order',
        }],
      });

      if (onError) {
        onError(e);
      }

      dispatchStatus({
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

  const dispayErrorMessage = useCallback((message, subType) => {
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
    dispatchStatus({
      type: 'checkout/paymentIframe/authorizing',
    });

    try {
      // TODO: Remove refreshOrder once this is implemented into PIGI
      await refreshOrder();
      await addPayment();
      return Promise.resolve();
    } catch (e) {
      dispatchStatus({
        type: 'checkout/paymentIframe/setPaymentIframeErrors',
        payload: [{
          field: 'payment',
          message: 'Payment iframe does not exist',
        }],
      });

      if (onError) {
        onError(e);
      }

      dispatchStatus({
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
    dispatchStatus({
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
    dispatchStatus({
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
    dispayErrorMessage,
    clearErrorMessage,
    selectPaymentMethod,
    updateLanguage,
  };
};

export default usePaymentIframe;
