import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Price,
} from '@boldcommerce/stacks-ui';
import Discount from '../discount/Discount';
import Breakdown from '../breakdown/Breakdown';
import useBreakdown from '../../hooks/useBreakdown';
import CheckoutContext from '../Context';
import AccordionCollapsed from '../accordian_collapsed/AccordianCollapsed';
import withLineItemsLogic from '../line_items/withLineItemsLogic';
import LineItems from '../line_items/LineItems';
import './SummaryCollapsed.css';

const EnhancedLineItems = withLineItemsLogic(LineItems);

const Summary = ({ open, setOpen }) => {
  const { total, totalItems } = useBreakdown();
  const { orderProcessed } = useContext(CheckoutContext);

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
        <EnhancedLineItems readOnly={orderProcessed} />
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
