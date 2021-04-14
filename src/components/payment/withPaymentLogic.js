/* eslint-disable no-unused-expressions */
import React, {
  useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import { debounce } from '../../helpers/debounce';
import useProcessOrder from '../../hooks/useProcessOrder';
import CheckoutContext from '../Context';

const withPaymentLogic = (Component) => {
  const WithPaymentLogic = (props) => {
    const {
      apiPath,
      token,
      csrf,
      customer,
      shippingLines,
      selectedShipping,
      shippingMethodRequest,
      shippingErrors,
      billingErrors,
      setIsProcessing,
    } = useContext(CheckoutContext);

    const {
      processOrder,
    } = useProcessOrder();

    const [isLoading, setLoading] = useState(false);
    const isValid = !!((csrf && selectedShipping && customer.email_address && shippingLines.length > 0));
    const handleLoaded = useCallback(() => {
      setLoading(false);
    });
    const iFrameRef = useRef();
    const iFrameWindow = iFrameRef?.current?.contentWindow;

    const paymentActions = useCallback(debounce((action) => {
      let payload;
      switch (action) {
        case 'update_order':
          payload = {
            type: 'UPDATE_ORDER',
          };
          iFrameWindow?.postMessage(payload, '*');
          break;
        case 'authorize_card':
          payload = {
            type: 'PAYMENT_GATEWAY_FRAME_PRE_AUTHORIZE_CARD',
          };
          iFrameWindow?.postMessage(payload, '*');
          setIsProcessing(true);
          break;
        default:
      }
    }, 1000), [iFrameWindow]);

    useEffect(() => {
      if (selectedShipping) {
        paymentActions('update_order');
      }
    }, [selectedShipping]);

    useEffect(() => {
      if (isValid) {
        setLoading(true);
      }
    }, [isValid]);

    const pigiListener = useCallback((event) => {
      if (event?.data?.responseType === 'PIGI_UPDATE_HEIGHT') {
        event?.data?.payload && (iFrameRef.current.style.height = `${event.data.payload.height}px`);
      }
      if (event?.data?.responseType === 'PIGI_ADD_PAYMENT') {
        if (event?.data?.payload?.success) {
          processOrder(iFrameWindow);
        } else {
          setIsProcessing(false);
          event?.data?.payload && (
            iFrameRef.current.style.height = `${event.data.payload.height}px`
          );
        }
      }
    }, [processOrder, iFrameWindow, iFrameRef, csrf]);

    useEffect(() => {
      window.addEventListener('message', pigiListener);

      return () => window.removeEventListener('message', pigiListener);
    }, [pigiListener]);

    const paymentIframe = (
      <iframe
        title="payments"
        src={
          `${apiPath}/payments/iframe?token=${token}`
        }
        onLoad={() => handleLoaded()}
        ref={iFrameRef}
      />
    );

    const updatedProps = {
      ...props,
      paymentIframe,
      shippingErrors,
      billingErrors,
      isValid,
      isLoading: shippingMethodRequest || isLoading,
      completeOrder: () => paymentActions('authorize_card'),
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...updatedProps} />;
  };

  return WithPaymentLogic;
};

export default withPaymentLogic;
