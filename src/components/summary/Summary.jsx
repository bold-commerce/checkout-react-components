import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Price,
} from '@boldcommerce/stacks-ui';
import Discount from '../discount/Discount';
import Breakdown from '../breakdown/Breakdown';
import Accordion from '../accordion/Accordion';
import LineItems from '../line_items/LineItems';
import './Summary.css';
import { useBreakdown } from '../../hooks';

const Summary = ({
  total, totalItems, orderStatus, open, setOpen,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const orderProcessed = orderStatus === 'completed';

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
        <LineItems readOnly={orderProcessed} />
        { !orderProcessed && <Discount />}
        <Breakdown />
      </Accordion>
    </>
  );
};

Summary.propTypes = {
  total: PropTypes.number,
  totalItems: PropTypes.number,
  orderStatus: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

const MemoizedSummary = React.memo(Summary);

const SummaryContainer = ({ open, setOpen }) => {
  const { total, totalItems, orderStatus } = useBreakdown();
  const lol = 'jonny';
  return (
    <MemoizedSummary
      open={open}
      setOpen={setOpen}
      total={total}
      totalItems={totalItems}
      orderStatus={orderStatus}
    />
  );
};

SummaryContainer.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default SummaryContainer;
