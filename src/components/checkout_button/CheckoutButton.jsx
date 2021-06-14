import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
} from '@boldcommerce/stacks-ui';
import { useCheckoutStore, usePaymentIframe } from '../../hooks';

const CheckoutButton = ({ disabled, onClick, loading }) => (
  <Button onClick={onClick} disabled={disabled} loading={loading}>
    Complete Order
  </Button>
);

CheckoutButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};

const CheckoutButtonContainer = () => {
  const { state } = useCheckoutStore();
  const { orderStatus } = state.orderInfo;
  const checkoutButtonDisabled = state.loadingStatus.isLoading;
  const { processPaymentIframe } = usePaymentIframe();
  const processing = orderStatus === 'processing' || orderStatus === 'authorizing';
  const onClick = processing ? null : processPaymentIframe;

  return <CheckoutButton disabled={checkoutButtonDisabled} onClick={onClick} loading={processing} />;
};

export default CheckoutButtonContainer;
