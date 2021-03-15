import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Price,
} from '@boldcommerce/stacks-ui';
import Product from '../product/Product';
import Discount from '../discount/Discount';
import Breakdown from '../breakdown/Breakdown';
import useLineItems from '../../hooks/useLineItems';
import useBreakdown from '../../hooks/useBreakdown';
import CheckoutContext from '../Context';
import AccordionCollapsed from '../accordian_collapsed/AccordianCollapsed';
import './SummaryCollapsed.css';

const Summary = ({ open, setOpen }) => {
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

  const closeSummary = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const overlayEl = document.querySelector('.Checkout__Main--Overlay');
    if (overlayEl) {
      overlayEl.addEventListener('click', closeSummary);
    }

    return function cleanup() {
      window.removeEventListener('click', closeSummary);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [open]);

  return (
    <>
      <div className="ViewSummaryWrapper" onClick={() => setOpen(!open)}>
        <div className={`SummaryHeader ${open ? 'open' : ''}`}>View summary</div>
        <div className="SummaryHeader--items">
          <div>
            {`(${totalItems} ${totalItems > 1 ? 'Items' : 'Item'})`}
          </div>
          <Price amount={total} />
        </div>
      </div>
      <AccordionCollapsed open={open} className="accordion__content">

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
      </AccordionCollapsed>
    </>
  );
};

Summary.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default Summary;
