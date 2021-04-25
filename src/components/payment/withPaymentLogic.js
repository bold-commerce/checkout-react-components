/* eslint-disable no-unused-expressions */
import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import usePaymentIframe from '../../hooks/usePaymentIframe';
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
    } = useContext(CheckoutContext);

    const { paymentIframeRef, updatePaymentIframe } = usePaymentIframe();

    const [isLoading, setLoading] = useState(false);
    const isValid = !!((csrf && selectedShipping && customer.email_address && shippingLines.length > 0));
    const handleLoaded = useCallback(() => {
      setLoading(false);
    });

    useEffect(() => {
      if (selectedShipping) {
        updatePaymentIframe();
      }
    }, [selectedShipping]);

    useEffect(() => {
      if (isValid) {
        setLoading(true);
      }
    }, [isValid]);

    const paymentIframe = (
      <iframe
        title="payments"
        src={
          `${apiPath}/payments/iframe?token=${token}`
        }
        onLoad={() => handleLoaded()}
        ref={paymentIframeRef}
      />
    );

    const updatedProps = {
      ...props,
      paymentIframe,
      shippingErrors,
      billingErrors,
      isValid,
      isLoading: shippingMethodRequest || isLoading,
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...updatedProps} />;
  };

  return WithPaymentLogic;
};

export default withPaymentLogic;
