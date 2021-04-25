import {
  useContext,
  useCallback,
  useEffect,
} from 'react';
import CheckoutContext from '../components/Context';
import { debounce } from '../helpers/debounce';
import useProcessOrder from './useProcessOrder';

const usePaymentIframe = () => {
  const {
    csrf,
    setIsProcessing,
    paymentIframeRef,
  } = useContext(CheckoutContext);

  const {
    processOrder,
  } = useProcessOrder();

  const iFrameWindow = paymentIframeRef?.current?.contentWindow;

  const pigiListener = useCallback((event) => {
    if (event?.data?.responseType === 'PIGI_UPDATE_HEIGHT') {
      event?.data?.payload && (paymentIframeRef.current.style.height = `${event.data.payload.height}px`);
    }
    if (event?.data?.responseType === 'PIGI_ADD_PAYMENT') {
      if (event?.data?.payload?.success) {
        processOrder(iFrameWindow);
      } else {
        setIsProcessing(false);
        event?.data?.payload && (
          paymentIframeRef.current.style.height = `${event.data.payload.height}px`
        );
      }
    }
  }, [processOrder, iFrameWindow, paymentIframeRef, csrf]);

  useEffect(() => {
    window.addEventListener('message', pigiListener);

    return () => window.removeEventListener('message', pigiListener);
  }, [pigiListener]);

  const updatePaymentIframe = useCallback(debounce(() => {
    const payload = {
      type: 'UPDATE_ORDER',
    };
    // eslint-disable-next-line no-unused-expressions
    iFrameWindow?.postMessage(payload, '*');
  }, 1000), [iFrameWindow]);

  const authorizePaymentIframeCard = useCallback(debounce(() => {
    const payload = {
      type: 'PAYMENT_GATEWAY_FRAME_PRE_AUTHORIZE_CARD',
    };
    // eslint-disable-next-line no-unused-expressions
    iFrameWindow?.postMessage(payload, '*');
    setIsProcessing(true);
  }, 1000), [iFrameWindow]);

  return {
    paymentIframeRef,
    updatePaymentIframe,
    authorizePaymentIframeCard,
  };
};

export default usePaymentIframe;
