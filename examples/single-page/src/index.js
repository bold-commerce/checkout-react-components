/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BillingAddress, CheckoutButton, CheckoutProvider, Customer, OrderProcessed, OrderProcessing, PaymentMethod, ShippingAddress, ShippingLines, SummaryCollapsed, useCheckoutStore,
} from '@boldcommerce/checkout-react-components';
import '@boldcommerce/checkout-react-components/dist/styles.css';

const {
  jwt_token, public_order_id, application_state, initial_data, store_identifier,
} = window._checkoutData;

const CheckoutForm = () => (
  <>
    <Customer />
    <ShippingAddress />
    <BillingAddress />
    <ShippingLines />
    <PaymentMethod />
    <CheckoutButton />
  </>
);

const CheckoutSummary = ({ open, setOpen, isProcessing }) => (
  <div className={`
    ${open ? 'Checkout__Summary' : 'Checkout__Summary Checkout__Summary--Collapsed'}
    ${isProcessing ? 'Checkout__Summary--Hidden' : ''}
    `}
  >
    <SummaryCollapsed open={open} setOpen={setOpen} />
  </div>
);

const CheckoutApp = () => {
  const { state } = useCheckoutStore();
  const { orderStatus } = state.orderInfo;
  const isProcessing = orderStatus === 'processing';
  const processed = orderStatus === 'fulfilled';
  const [open, setOpen] = useState(false);

  let content = <CheckoutForm />;
  if (processed) {
    content = <OrderProcessed />;
  } else if (isProcessing) {
    content = <OrderProcessing />;
  }

  return (
    <div className="Checkout--Collapsed">
      <div className={`Checkout__Main ${open ? 'Checkout__Main--Overlay' : ''} ${isProcessing ? 'Checkout__Main--Hidden' : ''}`}>
        { content }
      </div>
      <CheckoutSummary open={open} setOpen={setOpen} isProcessing={isProcessing} />
    </div>
  );
};

const App = () => (
  <CheckoutProvider token={jwt_token} publicOrderId={public_order_id} applicationState={application_state} storeIdentifier={store_identifier} initialData={initial_data}>
    <CheckoutApp />
  </CheckoutProvider>
);

ReactDOM.render(<App />, document.querySelector('#root'));
