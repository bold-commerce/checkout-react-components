/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BillingAddress, CheckoutButton, CheckoutProvider, Customer, OrderProcessed, OrderProcessing, PaymentMethod, ShippingAddress, ShippingLines, SummaryCollapsed, useCheckoutStore, useCustomer, useShippingAddress, useBillingAddress,
} from '@boldcommerce/checkout-react-components';
import { Button } from '@boldcommerce/stacks-ui';
import '@boldcommerce/checkout-react-components/dist/styles.css';
import Step from './Step';

const {
  jwt_token, public_order_id, application_state, initial_data, store_identifier,
} = window._checkoutData;

const CheckoutForm = () => {
  const { state } = useCheckoutStore();
  const { isLoading } = state.loadingStatus;
  const [step, setStep] = useState(0);
  const [customer, setCustomer] = useState();
  const [shippingAddress, setShippingAddress] = useState();
  const [billingAddress, setBillingAddress] = useState();
  const [loading, setLoading] = useState(false);
  const { submitCustomer } = useCustomer();
  const { submitShippingAddress } = useShippingAddress();
  const { submitBillingAddress } = useBillingAddress();

  const submitCustomerInformation = useCallback(async () => {
    setLoading(true);
    try {
      await submitCustomer(customer);
      await submitShippingAddress(shippingAddress);
      await submitBillingAddress(billingAddress);
      setStep((prevStep) => prevStep + 1);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, [customer, shippingAddress, billingAddress, submitCustomer, submitShippingAddress, submitBillingAddress]);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <Step step={0} currentStep={step}>
        <Customer onChange={setCustomer} />
        <ShippingAddress onChange={setShippingAddress} />
        <BillingAddress onChange={setBillingAddress} />
        <Button onClick={submitCustomerInformation} loading={loading}>Next</Button>
      </Step>
      <Step step={1} currentStep={step}>
        <ShippingLines />
        <Button onClick={handlePreviousStep} loading={isLoading}>Previous</Button>
        <Button onClick={handleNextStep} loading={isLoading}>Next</Button>
      </Step>
      <Step step={2} currentStep={step}>
        <PaymentMethod />
        <Button onClick={handlePreviousStep} loading={isLoading}>Previous</Button>
        <CheckoutButton />
      </Step>
    </>
  );
};

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
