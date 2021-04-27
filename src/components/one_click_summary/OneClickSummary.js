import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Price,
} from '@boldcommerce/stacks-ui';
import Discount from '../discount/Discount';
import useBreakdown from '../../hooks/useBreakdown';
import usePayments from '../../hooks/usePayments';
import './OneClickSummary.css';


const OneClickSummary = ({ open, setOpen, isMobile, setIsMobile, summaryAccordion }) => {
  const { total, totalItems } = useBreakdown();
  const { payments } = usePayments();
  const paymentStatus = payments[0]?.status !== '';
  const orderProcessed = (payments && payments.length && paymentStatus) ?? false;

  useEffect(() => {
    let resize;
    window.addEventListener('resize', resize = () => {
      setIsMobile(window.innerWidth < 900);
    });

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      {summaryAccordion}
      {isMobile
      && (
          <div className="SummaryBlock Summary__Total" onClick={() => setOpen(!open)}>
              <div>
                  <div className="Summay__Total--Title">Summary</div>
                  <span className="SummaryItem__Label">{totalItems} item(s)</span>
              </div>
              <div className="SummaryItem__Value">
                <Price amount={total} />
                { open ? (<div className="oneclick-chevron-down">&#8964;</div>) : (<div className="oneclick-chevron-up">&#8963;</div>) }
              </div>
          </div>
        // <div className="ViewSummaryWrapper" onClick={() => setOpen(!open)}>
        //   <div className={`SummaryHeader ${open ? 'open' : ''}`}>View summary</div>
        //   <div className="SummaryHeader--items">
        //     <div>
        //       {`(${totalItems} ${totalItems > 1 ? 'Items' : 'Item'})`}
        //     </div>
        //     <Price amount={total} />
        //   </div>
        // </div>
      )}
    </>
  );
};

OneClickSummary.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default OneClickSummary;