import React from 'react';
import { Price } from '@boldcommerce/stacks-ui';
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
    taxesIncluded,
    taxesTotal,
    paymentsMade,
    paymentStatus,
    totalItems
  } = useBreakdown();

  const {
    discountApplied,
    discountCode,
    removeDiscount,
  } = useDiscount();

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
                  <div className="circle-times-close-button"onClick={() => {removeDiscount();}}>&#8855;&nbsp;</div>
                  <div>
                    {discountCode} 
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
                { taxes.map( tax => (
                  <div className="Summary__Taxes" key={tax.name}>
                      <div className="SummaryItem__Label">{tax.name}</div>
                      <div className="SummaryItem__Value">
                          {
                            <Price amount={tax.value} />
                          }
                      </div>
                  </div>
                ))}
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
    </div>
  );
};

export default Breakdown;