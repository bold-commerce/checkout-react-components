import React, {
  useContext, useState,
} from 'react';
import CheckoutContext from '../../components/Context';
import useProcessOrder from '../../hooks/useProcessOrder';
import OrderProcessing from '../../components/order_processing/OrderProcessing';
import OrderProcessed from '../../components/order_processed/OrderProcessed';
import EmailField from '../../components/email/Email';
import ShippingAddress from '../../components/shipping_address/ShippingAddress';
import BillingAddress from '../../components/billing_address/BillingAddress';
import ShippingMethod from '../../components/shipping_method/ShippingMethod';
import PaymentMethod from '../../components/payment/Payment';
import Summary from '../../components/summary/Summary';
import withCustomerLogic from '../../components/email/withCustomerLogic';
import withShippingAddressLogic from '../../components/shipping_address/withShippingAddressLogic';
import withBillingAddressLogic from '../../components/billing_address/withBillingAddressLogic';
import withShippingMethodLogic from '../../components/shipping_method/withShippingMethodLogic';
import withPaymentLogic from '../../components/payment/withPaymentLogic';
import withOrderProcessedLogic from '../../components/order_processed/withOrderProcessedLogic';
import './SinglePage.css';

const EnhancedEmail = withCustomerLogic(EmailField);
const EnhancedShippingAddress = withShippingAddressLogic(ShippingAddress);
const EnhancedBillingAddress = withBillingAddressLogic(BillingAddress);
const EnhancedShippingMethod = withShippingMethodLogic(ShippingMethod);
const EnhancedPaymentMethod = withPaymentLogic(PaymentMethod);
const EnhancedOrderProcessed = withOrderProcessedLogic(OrderProcessed);

const SinglePage = () => {
  const { isProcessing } = useProcessOrder();
  const { applicationState } = useContext(CheckoutContext);
  const payments = applicationState?.payments?.length > 0;
  const paymentStatus = applicationState?.payments[0]?.status !== '';
  const [open, setOpen] = useState(false);

  const CheckoutForm = (
    <>
      <EnhancedEmail />
      <EnhancedShippingAddress />
      <EnhancedBillingAddress />
      <EnhancedShippingMethod />
      <EnhancedPaymentMethod />
    </>
  );

  return (
    <div className="Checkout">
      {
        (isProcessing && <OrderProcessing />) || (
          <>
            <div className="Checkout__Main">
              {
                payments && paymentStatus ? <EnhancedOrderProcessed /> : CheckoutForm
              }
            </div>
            <div className="Checkout__Summary">
              <Summary open={open} setOpen={setOpen} />
            </div>
          </>
        )
      }
    </div>
  );
};

export default SinglePage;
