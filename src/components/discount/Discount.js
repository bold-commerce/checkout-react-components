import React from 'react';
import { Input, Button } from '@bold-commerce/stacks-ui';
import useDiscount from '../../hooks/useDiscount';

import './Discount.css';

const Discount = () => {
  const {
    discount,
    setDiscount,
    discountApplied,
    errors,
    handleSubmit,
  } = useDiscount();

  return (
    <div className="SummaryBlock Summary__DiscountForm">
      <div className="DiscountForm">
        <Input
          type="text"
          placeholder="Enter discount code"
          value={discount ?? ''}
          messageText={errors && errors[0].message}
          messageType={errors && 'alert'}
          onChange={
            (e) => setDiscount(e.target.value)
          }
          disabled={discountApplied}
        />
        <Button
          primary={discountApplied || discount.length > 0}
          disabled={discount.length === 0 || discountApplied}
          onClick={() => handleSubmit()}
        >
          Apply
        </Button>
      </div>
      {
        errors && errors[0].message && (
          <div div className="DiscountForm__error">
            {
              errors[0].message
            }
          </div>
        )
      }
    </div>
  );
};

export default Discount;
