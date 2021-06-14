import React from 'react';
import { Button } from '@boldcommerce/stacks-ui';
import PropTypes from 'prop-types';

const ProductQuantitySelector = ({ updateQuantity, qty, lineItemKey }) => (
  <Button
    onClick={
      () => updateQuantity(qty + 1, lineItemKey)
    }
  >
    +
  </Button>
);

ProductQuantitySelector.propTypes = {
  updateQuantity: PropTypes.func,
  qty: PropTypes.number,
  lineItemKey: PropTypes.string,
};

export default ProductQuantitySelector;
