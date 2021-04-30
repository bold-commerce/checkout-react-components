import React, { useContext } from 'react';
import useBillingAddress from '../../hooks/useBillingAddress';
import useCustomer from '../../hooks/useCustomer';
import usePayments from '../../hooks/usePayments';
import useShippingAddress from '../../hooks/useShippingAddress';
import useShippingLines from '../../hooks/useShippingLines';
import CheckoutContext from '../Context';

const withOrderProcessedLogic = (Component) => {
  const WithOrderProcessedLogic = (props) => {
    const { payments } = usePayments();
    const { customer } = useCustomer();
    const { shippingAddress } = useShippingAddress();
    const { billingAddress } = useBillingAddress();
    const { selectedShipping } = useShippingLines();
    const { publicOrderId } = useContext(CheckoutContext);
    const paymentMethod = payments.length === 1 ? payments[0].brand : payments.reduce((prevVal, currVal, idx) => (idx === 0 ? currVal.brand : `${prevVal}, ${currVal.brand}`), '');

    const updatedProps = {
      ...props,
      payments,
      customer,
      shippingAddress,
      billingAddress,
      selectedShipping,
      paymentMethod,
      publicOrderId,
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...updatedProps} />;
  };

  return WithOrderProcessedLogic;
};

export default withOrderProcessedLogic;
