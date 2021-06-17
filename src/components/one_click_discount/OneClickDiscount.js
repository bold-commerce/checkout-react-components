import React, { useState } from 'react';
import { Input, Button, Message } from '@boldcommerce/stacks-ui';
import useDiscount from '../../hooks/useDiscount';

import './OneClickDiscount.css';

const OneClickDiscount = ({ 
    orderProcessed
}) => {
  const {
    discountCode,
    discountApplied,
    discountErrors,
    submitDiscount,
  } = useDiscount();

  const [discount, setDiscount] = useState(discountCode);
  const [minimized, setMinimized] = useState(true);

  const toggleCollapseDiscount = () => setMinimized(!minimized);
  
  const applyDiscount = async () => {
    const valid = await submitDiscount(discount);

    if (valid) {
        toggleCollapseDiscount();
    }
  };

  if (minimized) {
    return (
        <>
            <div className="FieldSet DiscountFormContainer--Collapsed" onClick={toggleCollapseDiscount}>
                <span>&#43;</span>
                <div className="SpacingDiv"></div>
                <span className="DiscountForm__Title">Discount code</span>
            </div>
            { 
                discountApplied && (
                <div className="FieldSet">
                    <Message type="success">
                        <p>Discount applied</p>
                    </Message>
                </div>
                )
            }
        </>
    );
  } else if (!orderProcessed && !minimized) {
        return (
            <>
                <div className="FieldSet Summary__DiscountForm">
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
                        onClick={applyDiscount}
                        >
                        Apply
                        </Button>
                    </div>
                </div>
                {
                    discountErrors && discountErrors[0].message && (
                    <div className="FieldSet">
                        <div div className="DiscountForm__error">
                            {
                            <Message type="alert">
                                <p>{ discountErrors[0].message }</p>
                            </Message>
                            }
                        </div>
                    </div>
                    )
                }
            </>
        );
  } else {
        return null;
  }
};

export default OneClickDiscount;
