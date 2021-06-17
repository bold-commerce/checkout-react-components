/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from '@boldcommerce/stacks-ui';
import { useDiscount } from '../../hooks';
import './Discount.css';

const Discount = ({
  discountApplied, discountCode, discountErrors, applyDiscount,
}) => {
  const [discount, setDiscount] = useState(discountCode);

  return (
    <div className="SummaryBlock Summary__DiscountForm">
      <div className="DiscountForm">
        <Input
          type="text"
          placeholder="Enter discount code"
          value={discount}
          messagetext={discountErrors && discountErrors.discounts}
          messageType={discountErrors && 'alert'}
          onChange={(e) => setDiscount(e.target.value)}
          disabled={discountApplied}
        />
        <Button
          primary={discountApplied || discount.length > 0}
          disabled={discount.length === 0 || discountApplied}
          onClick={() => applyDiscount(discount)}
        >
          Apply
        </Button>
      </div>
      {
        discountErrors && discountErrors.discounts && (
          <div div className="DiscountForm__error">
            {
              discountErrors.discounts
            }
          </div>
        )
      }
    </div>
  );
};

Discount.propTypes = {
  discountApplied: PropTypes.bool,
  discountCode: PropTypes.string,
  discountErrors: PropTypes.object,
  applyDiscount: PropTypes.func,
};

const MemoizedDiscount = React.memo(Discount);

const DiscountContainer = () => {
  const {
    discountApplied, discountCode, discountErrors, applyDiscount,
  } = useDiscount();

  return (
    <MemoizedDiscount
      discountApplied={discountApplied}
      discountCode={discountCode}
      discountErrors={discountErrors}
      applyDiscount={applyDiscount}
    />
  );
};

export default DiscountContainer;
