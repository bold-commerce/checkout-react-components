/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Price, Button } from '@boldcommerce/stacks-ui';
import { useDiscount, useBreakdown } from '../../hooks';
import './Breakdown.css';
import { RedactedCreditCard } from '../redacted_credit_card';

const Breakdown = ({
  subTotal, shippingTotal, discountTotal, total, remainingBalance, taxesTotal, payments, hasPayments, taxesIncluded, taxes, discountApplied, discountCode, removeDiscount,
}) => {
  const paymentMethods = payments.map((payment, index) => (
    <div
      className="Payment__Applied"
      key={
        index
      }
    >
      <div className="Payment__Remove">
        <RedactedCreditCard brand={payment.brand} lineText={payment.lineText} />
      </div>
      <Price amount={
        payment.value
      }
      />
    </div>
  ));

  const readOnly = (hasPayments) ?? false;

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
                    onClick={() => removeDiscount(discountCode)}
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
              taxes.length === 0 ? '$0.00'
                : <Price amount={taxesTotal} />
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
      {readOnly
        && (
          <div className="SummaryBlock Summary__Payments">
            <div className="Summary__Payments--Labels">
              <div className="SummaryItem__Label">Payments</div>
            </div>
            {
              paymentMethods
            }
          </div>
        )}
      {readOnly
        && (
          <div className="SummaryBlock Summary__Balance">
            <div className="SummaryItem__Label">Remaining Balance</div>
            <div className="SummaryItem__Value">
              <Price amount={
                remainingBalance
              }
              />
            </div>
          </div>
        )}
    </div>
  );
};

Breakdown.propTypes = {
  subTotal: PropTypes.number,
  shippingTotal: PropTypes.number,
  discountTotal: PropTypes.number,
  total: PropTypes.number,
  remainingBalance: PropTypes.number,
  taxesTotal: PropTypes.number,
  payments: PropTypes.array,
  hasPayments: PropTypes.bool,
  taxesIncluded: PropTypes.bool,
  taxes: PropTypes.array,
  discountApplied: PropTypes.bool,
  discountCode: PropTypes.string,
  removeDiscount: PropTypes.func,
};

const MemoizedBreakdown = React.memo(Breakdown);

const BreakdownContainer = () => {
  const {
    subTotal, shippingTotal, discountTotal, total, remainingBalance, taxesTotal, payments, hasPayments, taxesIncluded, taxes,
  } = useBreakdown();
  const { discountApplied, discountCode, removeDiscount } = useDiscount();

  return (
    <MemoizedBreakdown
      subTotal={subTotal}
      shippingTotal={shippingTotal}
      discountTotal={discountTotal}
      total={total}
      remainingBalance={remainingBalance}
      taxesTotal={taxesTotal}
      payments={payments}
      hasPayments={hasPayments}
      taxesIncluded={taxesIncluded}
      taxes={taxes}
      discountApplied={discountApplied}
      discountCode={discountCode}
      removeDiscount={removeDiscount}
    />
  );
};

export default BreakdownContainer;
