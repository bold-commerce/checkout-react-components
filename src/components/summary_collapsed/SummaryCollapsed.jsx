import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Price,
} from '@boldcommerce/stacks-ui';
import Discount from '../discount/Discount';
import Breakdown from '../breakdown/Breakdown';
import AccordionCollapsed from '../accordian_collapsed/AccordianCollapsed';
import LineItems from '../line_items/LineItems';
import './SummaryCollapsed.css';
import { useBreakdown } from '../../hooks';

const SummaryCollapsed = ({
  total, totalItems, orderStatus, open, setOpen,
}) => {
  const orderProcessed = orderStatus === 'completed';

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
        <LineItems readOnly={orderProcessed} />
        { !orderProcessed && <Discount />}
        <Breakdown />
      </AccordionCollapsed>
    </>
  );
};

SummaryCollapsed.propTypes = {
  total: PropTypes.number,
  totalItems: PropTypes.number,
  orderStatus: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

const MemoizedSummaryCollapsed = React.memo(SummaryCollapsed);

const SummaryCollapsedContainer = ({ open, setOpen }) => {
  const { total, totalItems, orderStatus } = useBreakdown();

  return (
    <MemoizedSummaryCollapsed
      open={open}
      setOpen={setOpen}
      total={total}
      totalItems={totalItems}
      orderStatus={orderStatus}
    />
  );
};

SummaryCollapsedContainer.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default SummaryCollapsedContainer;
