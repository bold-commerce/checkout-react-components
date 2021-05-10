import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Price,
} from '@boldcommerce/stacks-ui';
import useDiscount from '../../hooks/useDiscount';
import DollarCircleOutline from './DollarCircleOutline';
import useBreakdown from '../../hooks/useBreakdown';
import usePayments from '../../hooks/usePayments';
import './OneClickSummary.css';


const OneClickSummary = ({ open, setOpen, isMobile, setIsMobile, summaryAccordion }) => {
  const { total, totalItems } = useBreakdown();
  const { payments } = usePayments();
  const { discountApplied } = useDiscount();
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


  useEffect(() =>{
    if (!isMobile) {
      setOpen(false);
    }
  },[isMobile]);

  return (
    <>
      {summaryAccordion}
      {isMobile
      && (
          <div className="SummaryBlock Summary__Total" onClick={() => setOpen(!open)}>
              <div className="SummaryBlockLeft">
                  <div className="Summay__Total--Title">Summary</div>
                  <span className="SummaryItem__Label">{totalItems} item(s)</span>
              </div>
              <div className="SummaryItem__Value SummaryBlockRight">
                <div className="SummaryBlockRight__PriceWrapper">
                  <Price amount={total} />
                  { discountApplied && (<div className="SummaryBlockRight__DiscountWrapper"><DollarCircleOutline/> <span className="SummaryItem__Label">&nbsp;Discounts applied</span></div>) }
                </div>
                <div className={open ? "ChevronWrapper--Down" : "ChevronWrapper--Up"}>
                  { open ? (<div className="ChevronDown"></div>) : (<div className="ChevronUp"></div>) }
                </div>
              </div>
          </div>
      )}
    </>
  );
};

OneClickSummary.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default OneClickSummary;