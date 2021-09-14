/* eslint-disable no-unused-expressions */
import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { processOrder } from '../api';
import { CheckoutStore } from '../store';

const usePaymentIframe = () => {
  const { state, dispatch } = useContext(CheckoutStore);
  const [paymentIframeHeight, setPaymentIframeHeight] = useState(0);
  const { csrf, token, apiPath } = state;
  const paymentIframeLoadingStatus = state.loadingStatus.paymentIframe;
  const paymentIframeUrl = `${apiPath}/payments/iframe?token=${token}`;

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

  const submitOrder = async () => {
    dispatch({
      type: 'checkout/order/processing',
    });

    try {
      const response = await processOrder(csrf, apiPath);

      if (!response.success) {
        dispatch({
          type: 'checkout/order/setErrors',
          payload: [{
            field: 'payment',
            message: response.error.message,
          }],
        });

        return Promise.reject(response.error);
      }

      dispatch({
        type: 'checkout/order/processed',
      });

      return dispatch({
        type: 'checkout/update',
        payload: response.data.application_state,
      });
    } catch (e) {
      dispatch({
        type: 'checkout/order/setErrors',
        payload: [{
          field: 'order',
          message: e.message,
        }],
      });

      return Promise.reject(e);
    }
  };

  const addPayment = useCallback(async () => {
    try {
      await dispatchIframeAction('PIGI_ADD_PAYMENT');
      await submitOrder();
      Promise.resolve();
    } catch (e) {
      dispatch({
        type: 'checkout/paymentIframe/setPaymentIframeErrors',
        payload: [{
          field: 'payment',
          message: 'Invalid payment credentials',
        }],
      });
      Promise.reject();
    }
  });

  const updateLanguage = useCallback((language) => dispatchIframeAction('PIGI_UPDATE_LANGUAGE', { language }));

  const dispayErrorMessage = useCallback((message, subType) => {
    const payload = {
      error: {
        message,
        sub_type: subType,
      },
    };

    return dispatchIframeAction('PIGI_DISPLAY_ERROR_MESSAGE', payload);
  });

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
      return Promise.reject(e);
    }
  }, []);

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
    processPaymentIframe,
    paymentIframeLoadingStatus,
    paymentIframeUrl,
    paymentIframeHeight,
    paymentIframeOnLoaded,
    updateLanguage,
    clearErrorMessage,
    dispayErrorMessage,
    selectPaymentMethod,
  };
};

export default usePaymentIframe;
