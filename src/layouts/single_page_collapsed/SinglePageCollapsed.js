import React, {
  useContext, useState,
} from 'react';
import PropTypes from 'prop-types';
import CheckoutContext from '../../components/Context';
import useProcessOrder from '../../hooks/useProcessOrder';
import OrderProcessing from '../../components/order_processing/OrderProcessing';
import OrderProcessed from '../../components/order_processed/OrderProcessed';
import EmailField from '../../components/email/Email';
import ShippingAddress from '../../components/shipping/Shipping';
import Billing from '../../components/billing/Billing';
import ShippingMethod from '../../components/shipping_method/ShippingMethod';
import PaymentMethod from '../../components/payment/Payment';
import SummaryCollapsed from '../../components/summary_collapsed/SummaryCollapsed';
import Branding from '../../components/branding/Branding';
import './SinglePageCollapsed.css';

const SinglePageCollapsed = ({ paymentMethod }) => {
  const { isProcessing } = useProcessOrder();
  const { applicationState } = useContext(CheckoutContext);
  const payments = applicationState?.payments?.length > 0;
  const paymentStatus = applicationState?.payments[0]?.status !== '';
  const [open, setOpen] = useState(false);

  const CheckoutForm = (
    <>
      <Branding brandName="Shop Name" />
      <EmailField />
      <ShippingAddress />
      <Billing />
      <ShippingMethod />
      <PaymentMethod alternateMethod={paymentMethod && paymentMethod} />
    </>
  );

  return (
    <div className="Checkout--Collapsed">
      {
        (isProcessing && <OrderProcessing />)
      }
      {
        (
          <>
            <div className={`Checkout__Main ${open ? 'Checkout__Main--Overlay' : ''} ${isProcessing ? 'Checkout__Main--Hidden' : ''}`}>
              {
                payments && paymentStatus ? <OrderProcessed /> : CheckoutForm
              }
            </div>
            <div className={`
            ${open ? 'Checkout__Summary' : 'Checkout__Summary Checkout__Summary--Collapsed'}
            ${isProcessing ? 'Checkout__Summary--Hidden' : ''}
            `}
            >
              <SummaryCollapsed open={open} setOpen={setOpen} />
            </div>
          </>
        )
      }
    </div>
  );
};

SinglePageCollapsed.propTypes = {
  paymentMethod: PropTypes.node,
};

export default SinglePageCollapsed;
