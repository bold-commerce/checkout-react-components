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

  const refreshOrder = useCallback(async () => new Promise((resolve, reject) => {
    const iframeListener = (e) => {
      if (e?.data?.responseType === 'PIGI_REFRESH_ORDER') {
        if (e?.data?.payload?.success) {
          window.removeEventListener('message', iframeListener);
          resolve();
        } else {
          window.removeEventListener('message', iframeListener);
          reject();
        }
      }
    };

    window.addEventListener('message', iframeListener);

    const paymentIframe = document.querySelector(`[src="${paymentIframeUrl}"]`);

    if (paymentIframe) {
      // eslint-disable-next-line no-unused-expressions
      paymentIframe?.contentWindow.postMessage({
        actionType: 'PIGI_REFRESH_ORDER',
      }, '*');
    }
  }));

  const processPaymentIframe = useCallback(async () => {
    dispatch({
      type: 'checkout/paymentIframe/authorizing',
    });

    // TODO: Remove this one this is implemented into PIGI
    await refreshOrder();

    const payload = {
      type: 'PAYMENT_GATEWAY_FRAME_PRE_AUTHORIZE_CARD',
    };

    const paymentIframe = document.querySelector(`[src="${paymentIframeUrl}"]`);

    if (paymentIframe) {
      // eslint-disable-next-line no-unused-expressions
      paymentIframe?.contentWindow.postMessage(payload, '*');
      return Promise.resolve();
    }
    dispatch({
      type: 'checkout/paymentIframe/setPaymentIframeErrors',
      payload: [
        {
          fields: 'payment',
          message: 'Payment iframe does not exist',
        },
      ],
    });
    return Promise.reject(new Error('Payment iframe does not exist'));
  }, []);

  const submitOrder = async () => {
    dispatch({
      type: 'checkout/order/processing',
    });

    try {
      const response = await processOrder(csrf, apiPath);      
      
      if (response.errors) {
        dispatch({
          type: 'checkout/order/setErrors',
          payload: response.errors,
        });

        return Promise.reject(new Error('Order failed'));
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

  const pigiListener = (event) => {
    const type = event?.data?.type || event?.data?.responseType;
    const height = event?.data?.height || event?.data?.payload?.height;

    if (type === 'PIGI_ADD_PAYMENT') {
      if (event?.data?.payload?.success === false) {
        dispatch({
          type: 'checkout/paymentIframe/setPaymentIframeErrors',
          payload: [
            {
              field: 'payment',
              message: 'Invalid payment credentials',
            },
          ],
        });
      } else {
        submitOrder();
      }
    }

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
    window.addEventListener('message', pigiListener);

    return () => window.removeEventListener('message', pigiListener);
  }, []);

  const paymentIframeOnLoaded = () => {
    dispatch({
      type: 'checkout/paymentIframe/fetched',
    });
  };

  return {
    processPaymentIframe,
    paymentIframeLoadingStatus,
    paymentIframeUrl,
    paymentIframeHeight,
    paymentIframeOnLoaded,
  };
};

export default usePaymentIframe;
