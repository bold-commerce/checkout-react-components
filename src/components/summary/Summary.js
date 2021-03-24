import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Price,
} from '@boldcommerce/stacks-ui';
import Discount from '../discount/Discount';
import Breakdown from '../breakdown/Breakdown';
import useBreakdown from '../../hooks/useBreakdown';
import Accordion from '../accordion/Accordion';
import usePayments from '../../hooks/usePayments';
import LineItems from '../line_items/LineItems';
import withLineItemsLogic from '../line_items/withLineItemsLogic';
import './Summary.css';

const EnhancedLineItems = withLineItemsLogic(LineItems);

const Summary = ({ open, setOpen }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { total, totalItems } = useBreakdown();
  const { payments } = usePayments();
  const paymentStatus = payments[0]?.status !== '';
  const orderProcessed = (payments && payments.length && paymentStatus) ?? false;

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
        <EnhancedLineItems readOnly={orderProcessed} />
        { !orderProcessed && <Discount />}
        <Breakdown />
      </Accordion>
    </>
  );
};

Summary.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default Summary;
