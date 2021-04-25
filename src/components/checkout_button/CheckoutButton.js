import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
} from '@boldcommerce/stacks-ui';

const CheckoutButton = ({ disabled, completeOrder }) => (
  <Button onClick={completeOrder} disabled={disabled}>Complete Order</Button>
);

CheckoutButton.propTypes = {
  disabled: PropTypes.bool,
  completeOrder: PropTypes.func,
};

export default CheckoutButton;
