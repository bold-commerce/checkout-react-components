import React from 'react';
import {Button} from '@boldcommerce/stacks-ui';

const ProductQuantitySelector = ({updateQuantity, qty, lineItemKey}) => (
  <Button
    onClick={
      () => updateQuantity(qty + 1, lineItemKey)
    }
  >
    +
  </Button>
);

export default ProductQuantitySelector;
