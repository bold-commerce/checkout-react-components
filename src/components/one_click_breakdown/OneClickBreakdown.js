import React from 'react';
import { Price, Button } from '@boldcommerce/stacks-ui';
import useBreakdown from '../../hooks/useBreakdown';
import useDiscount from '../../hooks/useDiscount';
import './OneClickBreakdown.css';

const Breakdown = ({ isMobile }) => {
  const {
    subTotal,
    shippingTotal,
    shippingDescription,
    discountTotal,
    discountPercent,
    total,
    taxes,
    payments,
    taxesIncluded,
    taxesTotal,
    paymentsMade,
    paymentStatus,
    remainingBalance,
    totalItems
  } = useBreakdown();

  const {
    discountApplied,
    discountCode,
    removeDiscount,
  } = useDiscount();

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

  const readOnly = (paymentsMade && paymentStatus) ?? false;
  
  return (
    <div className="Summary__Breakdown">
      <div className="SummaryBlock">
        <span className="Summary__Subtotal--Title">Subtotal</span>
        <div className="Summary__Subtotal">
          <div className="SummaryItem__Label">Items ({totalItems})</div>
          <div className="SummaryItem__Value">
            <Price amount={subTotal} />
          </div>
        </div>
        {
            discountApplied && (
              <div className="Discount__Applied">
                <div className="Discount__Remove">
                  <div className="circle-times-close-button"onClick={() => {removeDiscount();}}>&#8855;</div>
                  <div>
                    {discountCode + '-' + discountPercent + '% Off'} 
                  </div>
                </div>
                <div className="Discount__Amount">
                    <Price amount={discountTotal*-1} />
                </div>
              </div>
            )
          }
        { taxesTotal ? (
            <>
                <span className="Summary__Taxes--Title">Taxes</span>
                <div className="Summary__Taxes">
                    <div className="SummaryItem__Value">
                        {
                        taxes.length === 0 ? '$0.00'
                            : <Price amount={taxesTotal} />
                        }
                    </div>
                </div>
            </>
        ): null}
        
        { shippingTotal ? ( 
            <>
                <span className="Summary__Shipping--Title">Shipping</span>
                <div className="Summary__Shipping">
                    <div className="SummaryItem__Label">{shippingDescription}</div>
                    <div className="SummaryItem__Value">
                        <Price amount={shippingTotal} />
                    </div>
                </div>
            </>
        ): null}
       
      </div>
      <div className="SummaryBlock" style={{display: isMobile ? 'none' : 'block'}}>
        <div className="SummaryBlock Summary__Total">
            <div>
                <div className="Summay__Total--Title">Summary</div>
                <span className="SummaryItem__Label">{totalItems} item(s)</span>
            </div>
            <div className="SummaryItem__Value">
            <Price amount={total} />
            </div>
        </div>
      </div>
      {readOnly
        && (
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

export default Breakdown;