import React, {
  useContext, useCallback, useState, useEffect, useRef,
} from 'react';
import {
  Button,
} from '@boldcommerce/stacks-ui';


import CheckoutContext from '../Context';
import useProcessOrder from '../../hooks/useProcessOrder';
import EmptyState from '../empty_state/EmptyState';
import usePayments from '../../hooks/usePayments';
import './Payment.css';
import LoadingState from '../loading_state/LoadingState';


const PaymentMethod = (props) => {
  const {
    apiPath,
    token,
    csrf,
    applicationState,
    shippingLines,
    shippingMethodRequest,
    shippingErrors,
    billingErrors,
    isProcessing,
    setIsProcessing,
  } = useContext(CheckoutContext);
  const {
    processOrder,
  } = useProcessOrder();
  const {
    addPayment,
  } = usePayments();
  const { alternateMethod } = props;

  const { shipping, customer, line_items } = applicationState;
  const [isLoading, setLoading] = useState(false);
  const isValid = !!((csrf && shipping.selected_shipping && customer.email_address && shippingLines.length > 0));
  const handleLoaded = useCallback(() => {
    setLoading(false);
  });
  const iFrameRef = useRef();
  const iFrameWindow = iFrameRef?.current?.contentWindow;

  const paymentActions = (action) => {
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
  };

  useEffect(() => {
    paymentActions('update_order');
  }, [shipping.selected_shipping]);

  useEffect(() => {
    if (isValid && !alternateMethod) {
      setLoading(true);
    }
  }, [isValid]);

  window.addEventListener('message', (event) => {
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
  });

  const iframe = (
    <iframe
      title="payments"
      src={
        `${apiPath}/payments/iframe?token=${token}`
      }
      onLoad={() => handleLoaded()}
      ref={iFrameRef}
    />
  );

  let content = <EmptyState title="To view payment options, complete filling in your address" />;

  if (isLoading && isValid) {
    content = <LoadingState />;
  } else if (isValid) {
    content = null;
  }

  if (!!shippingErrors || !!billingErrors) {
    return (
      <section className="FieldSet FieldSet--PaymentMethod">
        <div className="FieldSet__Header">
          <div className="FieldSet__Heading">Payment methods</div>
        </div>
        <div className="FieldSet__Content">
          <EmptyState title="To view payment options, complete filling in your address" />
        </div>
      </section>
    );
  }

  return (
    <section className="FieldSet FieldSet--PaymentMethod">
      <div className="FieldSet__Header">
        <div className="FieldSet__Heading">Payment methods</div>
      </div>
      <div className="FieldSet__Content">
        {
          content
        }
        <div style={{
          display: isLoading ? 'none' : '',
        }}
        >
          {
            isValid && !shippingErrors && !billingErrors && (alternateMethod ?? iframe)
          }
        </div>
      </div>
      {
        alternateMethod ?? (isValid && !shippingMethodRequest && !shippingErrors && !billingErrors
        && (
          <>
            {/* <Button onClick={() => addPayment()}>Debug: Add Payment</Button> */}
            {/* <Button onClick={() => processOrder(iFrameWindow)}>Complete Order</Button> */}
            <Button onClick={() => paymentActions('authorize_card')}>Complete Order</Button>
          </>
        ))
      }
    </section>
  );
};

export default PaymentMethod;
