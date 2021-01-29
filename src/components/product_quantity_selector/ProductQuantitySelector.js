import React from 'react';
import {Button} from '@bold-commerce/stacks-ui';

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
