/* eslint-disable no-unused-expressions */
import React, {
  useContext,
} from 'react';
import usePaymentIframe from '../../hooks/usePaymentIframe';
import CheckoutContext from '../Context';

const withCheckoutButtonLogic = (Component) => {
  const WithCheckoutButtonLogic = (props) => {
    const {
      csrf,
      customer,
      shippingLines,
      selectedShipping,
      shippingErrors,
      billingErrors,
    } = useContext(CheckoutContext);

    const { authorizePaymentIframeCard } = usePaymentIframe();

    const isValid = !!((csrf && selectedShipping && customer.email_address && shippingLines.length > 0));

    const checkoutButtonEnabled = isValid && !shippingErrors && !billingErrors;

    const updatedProps = {
      ...props,
      disabled: !checkoutButtonEnabled,
      completeOrder: () => authorizePaymentIframeCard(),
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...updatedProps} />;
  };

  return WithCheckoutButtonLogic;
};

export default withCheckoutButtonLogic;
