import React, { useState, useEffect, useContext } from 'react';
import {
  Price,
} from '@boldcommerce/stacks-ui';
import Product from '../product/Product';
import Discount from '../discount/Discount';
import Breakdown from '../breakdown/Breakdown';
import useLineItems from '../../hooks/useLineItems';
import useBreakdown from '../../hooks/useBreakdown';
import CheckoutContext from '../Context';
import Accordion from '../accordion/Accordion';


import './Summary.css';

const Summary = ({ open, setOpen }) => {
  const [isMobile, setIsMobile] = useState(false);
  const {
    lineItems,
    updateQuantity,
    removeLineItem,
  } = useLineItems();

  const { total, totalItems } = useBreakdown();
  const { applicationState } = useContext(CheckoutContext);

  const payments = applicationState?.payments?.length > 0;
  const paymentStatus = applicationState?.payments[0]?.status !== '';
  const orderProcessed = (payments && paymentStatus) ?? false;

  useEffect(() => {
    let resize;
    window.addEventListener('resize', resize = () => {
      setIsMobile(window.innerWidth < 1200);
    });

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      {isMobile
      && (
        <div className="ViewSummaryWrapper" onClick={() => setOpen(!open)}>
          <div className={`SummaryHeader ${open ? 'open' : ''}`}>View summary</div>
          <div className="SummaryHeader--items">
            <div>
              {`(${totalItems} ${totalItems > 1 ? 'Items' : 'Item'})`}
            </div>
            <Price amount={total} />
          </div>
        </div>
      )}
      <Accordion open={open || !isMobile} className="accordion__content">

        {lineItems.map((item) => (
          <div className="SummaryBlock CartItem" key={item.product_data.line_item_key}>
            <Product
              title={item.product_data.title}
              img={item.product_data.image}
              qty={item.product_data.quantity}
              itemPrice={item.product_data.price}
              totalPrice={item.product_data.total_price}
              lineItemKey={item.product_data.line_item_key}
              description={item.product_data.description}
              updateQuantity={updateQuantity}
              removeLineItem={removeLineItem}
              readOnly={orderProcessed}
            />
          </div>
        ))}
        { !orderProcessed && <Discount />}
        <Breakdown />
      </Accordion>
    </>
  );
};

export default Summary;
