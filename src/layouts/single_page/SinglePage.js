import React, {
  useContext, useState
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
import Summary from '../../components/summary/Summary';
import './SinglePage.css';

const SinglePage = ({ paymentMethod }) => {
  const { isProcessing } = useProcessOrder();
  const { applicationState } = useContext(CheckoutContext);
  const payments = applicationState?.payments?.length > 0;
  const paymentStatus = applicationState?.payments[0]?.status !== '';
  const [open, setOpen] = useState(false);

  const CheckoutForm = (
    <>
      <EmailField />
      <ShippingAddress />
      <Billing />
      <ShippingMethod />
      { paymentMethod || <PaymentMethod />}
    </>
  );

  return (
    <div className="Checkout">
      {
        (isProcessing && <OrderProcessing />) || (
          <>
            <div className="Checkout__Main">
              {
                payments && paymentStatus ? <OrderProcessed /> : CheckoutForm
              }
            </div>
            <div className="Checkout__Summary">
              <Summary open={open} setOpen={setOpen}/>
            </div>
          </>
        )
      }
    </div>
  );
};

SinglePage.propTypes = {
  paymentMethod: PropTypes.node,
};

export default SinglePage;
