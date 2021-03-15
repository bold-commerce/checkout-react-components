import React, { useContext } from 'react';
import { Price, Button } from '@boldcommerce/stacks-ui';
import useBreakdown from '../../hooks/useBreakdown';
import useDiscount from '../../hooks/useDiscount';
import useTaxes from '../../hooks/useTaxes';
import CheckoutContext from '../Context';

import './Breakdown.css';

const Breakdown = () => {
  const {
    subTotal,
    shippingTotal,
    discountTotal,
    total,
    taxesIncluded,
    remainingBalance,
  } = useBreakdown();
  const {
    discountApplied,
    discountCode,
    removeDiscount,
  } = useDiscount();
  const { tax } = useTaxes();
  const {
    applicationState,
  } = useContext(CheckoutContext);
  const { payments } = applicationState;
  const paymentMethods = payments.map((payment, index) => (
    <div
      className="Payment__Applied"
      key={
        index
      }
    >
      <div className="Payment__Remove">
        {payment.brand}
        :
        {payment.bin}
      </div>
      <Price amount={
        payment.value
      }
      />
    </div>
  ));
  const paymentsMade = applicationState?.payments?.length > 0;
  const paymentStatus = applicationState?.payments[0]?.status !== '';
  const readOnly = (paymentsMade && paymentStatus) ?? false;
  const totalTax = tax.reduce((acc, curr) => acc + curr.value, 0);



  return (
    <div className="Summary__Breakdown">
      <div className="SummaryBlock">
        <div className="Summary__Subtotal">
          <div className="SummaryItem__Label">Subtotal</div>
          <div className="SummaryItem__Value">
            <Price amount={subTotal} />
          </div>
        </div>
        <div className="Summary__Discount">
          <div className="Summary__Discount--Labels">
            <div className="SummaryItem__Label" data-test={discountTotal}>Discounts</div>
            {
              !discountApplied && (
                <div className="SummaryItem__Value">$0.00</div>
              )
            }
          </div>
          {
            discountApplied && (
              <div className="Discount__Applied">
                <div className="Discount__Remove">
                  <Button
                    disabled={readOnly}
                    secondary
                    onClick={() => {
                      removeDiscount();
                    }}
                  >
                    X
                  </Button>
                  <div>
                    Discount code:
                    {' '}
                    {discountCode}
                  </div>
                </div>
                <div className="Discount__Amount">
                  <Price amount={discountTotal} />
                </div>
              </div>
            )
          }
        </div>
        <div className="Summary__Shipping">
          <div className="SummaryItem__Label">Shipping</div>
          <div className="SummaryItem__Value">
            <Price amount={shippingTotal} />
          </div>
        </div>
        <div className="Summary__Taxes">
          <div className="SummaryItem__Label">
            Taxes
            {
              taxesIncluded && ' (Included)'
            }
          </div>
          <div className="SummaryItem__Value">
            {
              tax.length === 0 ? '$0.00'
                : <Price amount={totalTax} />
            }
          </div>
        </div>
      </div>
      <div className="SummaryBlock Summary__Total">
        <div className="SummaryItem__Label">Total</div>
        <div className="SummaryItem__Value">
          <Price amount={total} />
        </div>
      </div>
      {readOnly &&
        <div className="SummaryBlock Summary__Payments">
          <div className="Summary__Payments--Labels">
            <div className="SummaryItem__Label">Payments</div>
            {!paymentsMade && paymentStatus
              && (
                <div className="SummaryItem__Value">
                  <Price amount={
                    0
                  }
                  />
                </div>
              )}
          </div>
          {
            paymentMethods
          }
        </div>
      }
      {readOnly &&
        <div className="SummaryBlock Summary__Balance">
          <div className="SummaryItem__Label">Remaining Balance</div>
          <div className="SummaryItem__Value">
            <Price amount={
              remainingBalance
            }
            />
          </div>
        </div>
      }
    </div>
  );
};

export default Breakdown;
