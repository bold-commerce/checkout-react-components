import React, { useState } from 'react';
import { Input, Button } from '@boldcommerce/stacks-ui';
import useDiscount from '../../hooks/useDiscount';

import './Discount.css';

const Discount = () => {
  const {
    discountCode,
    discountApplied,
    discountErrors,
    submitDiscount,
  } = useDiscount();

  const [discount, setDiscount] = useState(discountCode);

  return (
    <div className="SummaryBlock Summary__DiscountForm">
      <div className="DiscountForm">
        <Input
          type="text"
          placeholder="Enter discount code"
          value={discount}
          messagetext={discountErrors && discountErrors[0].message}
          messageType={discountErrors && 'alert'}
          onChange={(e) => setDiscount(e.target.value)}
          disabled={discountApplied}
        />
        <Button
          primary={discountApplied || discount.length > 0}
          disabled={discount.length === 0 || discountApplied}
          onClick={() => submitDiscount(discount)}
        >
          Apply
        </Button>
      </div>
      {
        discountErrors && discountErrors[0].message && (
          <div div className="DiscountForm__error">
            {
              discountErrors[0].message
            }
          </div>
        )
      }
    </div>
  );
};

export default Discount;
