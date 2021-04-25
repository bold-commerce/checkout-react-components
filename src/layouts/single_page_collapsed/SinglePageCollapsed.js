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
import SummaryCollapsed from '../../components/summary_collapsed/SummaryCollapsed';
import Branding from '../../components/branding/Branding';
import withCustomerLogic from '../../components/email/withCustomerLogic';
import withShippingMethodLogic from '../../components/shipping_method/withShippingMethodLogic';
import withShippingAddressLogic from '../../components/shipping_address/withShippingAddressLogic';
import withBillingAddressLogic from '../../components/billing_address/withBillingAddressLogic';
import withPaymentLogic from '../../components/payment/withPaymentLogic';
import withOrderProcessedLogic from '../../components/order_processed/withOrderProcessedLogic';
import './SinglePageCollapsed.css';
import withCheckoutButtonLogic from '../../components/checkout_button/withCheckoutButtonLogic';
import CheckoutButton from '../../components/checkout_button/CheckoutButton';

const EnhancedEmail = withCustomerLogic(EmailField);
const EnhancedShippingAddress = withShippingAddressLogic(ShippingAddress);
const EnhancedBillingAddress = withBillingAddressLogic(BillingAddress);
const EnhancedShippingMethod = withShippingMethodLogic(ShippingMethod);
const EnhancedPaymentMethod = withPaymentLogic(PaymentMethod);
const EnhancedOrderProcessed = withOrderProcessedLogic(OrderProcessed);
const EnhancedCheckoutButton = withCheckoutButtonLogic(CheckoutButton);

const SinglePageCollapsed = () => {
  const { isProcessing } = useProcessOrder();
  const { payments } = useContext(CheckoutContext);
  const hasPayments = payments?.length > 0;
  const paymentStatus = payments[0]?.status !== '';
  const [open, setOpen] = useState(false);

  const CheckoutForm = (
    <>
      <Branding brandName="Shop Name" />
      <EnhancedEmail />
      <EnhancedShippingAddress />
      <EnhancedBillingAddress />
      <EnhancedShippingMethod />
      <EnhancedPaymentMethod />
      <EnhancedCheckoutButton />
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
                hasPayments && paymentStatus ? <EnhancedOrderProcessed /> : CheckoutForm
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

export default SinglePageCollapsed;
